# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  password_digest :string           not null
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  birth_date      :date             not null
#  phone_number    :string(10)
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  # NOTE: within validations - can interpolate "%{model}" "%{attribute}" "%{value}"
  validates :email, 
    uniqueness: true, 
    length: { in: 5..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, :last_name, :birth_date, presence: true
  validates :phone_number, 
    uniqueness: true,
    length: { is: 10 },
    format: { with: /\A\d{10}\z/ },
    allow_nil: true
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  validate :birth_date, :validate_age

  before_validation :ensure_session_token

  has_one_attached :photo

  # TESTING: 
  # attributes = {email: 'phone@demo.io', first_name: 'Demo', last_name: 'Lition', birth_date: Time.new(1993,3,8), password: 'password', phone_number: '5551239999'}
  # User.create(attributes).tap(&:valid?).errors.messages

  def self.find_by_credentials(credential, password)
    type = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :phone_number
    user = User.find_by("#{type}": credential) #String interpolation requires double quotes
    # user = User.find_by(type => credential) #Alternative syntax
    return user if(user && user.authenticate(password))
    nil
  end

  def reset_session_token!
    self.update!(session_token: User.generate_unique_session_token)
    self.session_token
  end

  private

  def validate_age
    if birth_date > 18.years.ago
      errors.add(:birth_date, 'Must be 18 or over to register - birthdate will not be displayed publicly.')
    end
    if birth_date < 120.years.ago
      errors.add(:birth_date, 'Easter egg: as of 2023, airbnb only allows ages up to 120 years old!')
    end
  end

  def self.generate_unique_session_token
    while true
      session_token = SecureRandom.urlsafe_base64
      return session_token unless User.find_by(session_token: session_token)
    end
  end

  def ensure_session_token
    self.session_token ||= User.generate_unique_session_token
  end

end
