# appointment-manager
An appointment manager API to experiment with:

  - Typescript
  - TypeORM
  - DDD methodologies
  - JEST
  - Caching with Redis
  - Dependency Injection with TSyringe

# Features

## Password Recovery

**Functional Requisits**

- User should be able recover password with his email
- User should recieve instructions how to recover pass by email
- User should be able to reset his password

**Non Functional Requisits**

- Use Mailtrap to test mails in dev enviroment 
- Use Amazon SES to send mails in production
- Mails should be sent as background job

**Bussiness Rules**

- The link to reset password should expire in 2h
- The user needs to check the new password when reseting 

## Profile Update

**Functional Requisits**

- User should be able to update profil details(name, email, avatar, password)

**Non Functional Requisits**

**Bussiness Rules**

- User cant change email to a already taken email
- To update password userneeds to check old password
- To update password userneeds to confirm new password

## Provider Appointments 

**Functional Requisits**

- Provider should be list their schedule appoitments of by day 
- Provider should get a notification on a appoitment
- Provider should be able to see notifications

**Non Functional Requisits**

- Appointments should be stored in cached
- Provider notifications should be stored in mongoDB 
- Provider notifications should be realtime with Socket.io

**Bussiness Rules**

- Notification should have read status

## Scheduling appointment

**Functional Requisits**

- The user should be able to list all the available providers
- The user should be able to list the free days by month of specific provider
- The user should be able to  list the free shedules of a specific day of a specific provider
- The user should be able to make an appointment

**Non Functional Requisits**

- Providers list should be cached to be lighter on performance

**Bussiness Rules**

- Each appointment will last 1h
- Appointments should be available between (8AM to 18PM -> First 8AM : Last 17PM)
- The user cant make a already filled time slot
- The user cant make an appoitment of a previuous date
- The user cant make appointments with himself 

