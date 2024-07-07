# Food Tracker Using Express, Gemini API, Prisma, MYSQL

## Install Depedencies

    npm install

### ADD .env File

    DATABASE_URL = "YOUR URL"
    JWT_SECRET = YOUR_SECRET_KEY

## Run the app

    npm run dev

## API End Point

**- AUTH Route** \
User Register: `POST /auth/register`\
User Login: `POST /auth/login`\

**- Profile Route** \
Create Profile        : `POST /profile`\
User Total Nutrition  : `GET /profile/nutrition`\

**- Food Route** \
Food Tracker      : `POST /food/nutrition`\

## Input in Each Route
**-Login Route**
```
email             (unique, email format, required)
password          (string, required)
```

**- Register Route**
```
name              (string, required)
email             (unique, email format, required)
password          (string, required)
```

**- Profile Route**
```
userId            String        @unique
gender            String
dateOfBirth       String       (year/month/date)
allergies         String?       
weight            Float
height            Float
```

**- Food Nutrition Route**
```
foodName            (string, required)
```

## Sucessfull Response API
**Register User -> POST /auth/register**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "id": "7fd96354-da07-4420-8272-4f9a3df5f425",
    "name": "gerry",
    "email": "gerry",
    "password": "$2a$08$c7ohbZar4gRBTARnr1e5guy/flMP9H1Yc6HANNu3q4Y5/Zvg5IC2.",
    "role": "user",
    "createdAt": "2024-06-14T04:46:25.371Z",
    "updatedAt": "2024-06-14T04:46:25.371Z",
    "isEmailVerified": false
  }
}
```

**Login User -> POST /auth/login**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "id": "7fd96354-da07-4420-8272-4f9a3df5f425",
    "name": "gerry",
    "email": "gerry",
    "password": "$2a$08$c7ohbZar4gRBTARnr1e5guy/flMP9H1Yc6HANNu3q4Y5/Zvg5IC2.",
    "role": "user",
    "createdAt": "2024-06-14T04:46:25.371Z",
    "updatedAt": "2024-06-14T04:46:25.371Z",
    "isEmailVerified": false
  }
}
```

**Create Profile -> POST /profile/**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "profile": {
      "id": "bbea0edc-0831-485e-8592-37099e9959ad",
      "userId": "5fb3aa47-f976-4781-9c95-a6e65e8d9194",
      "gender": "male",
      "dateOfBirth": "2003-12-20",
      "allergies": "Tidak Punya",
      "weight": 57,
      "height": 172,
      "createdAt": "2024-07-07T04:13:33.490Z",
      "updatedAt": "2024-07-07T04:13:33.490Z"
    },
    "dailyNutrition": {
      "id": "6d5c96c4-4d10-4577-aad8-00bd18646e17",
      "userId": "5fb3aa47-f976-4781-9c95-a6e65e8d9194",
      "dailyCalorie": 1575.766,
      "dailyCarbohydrate": 236.3649,
      "dailySugar": 50,
      "dailyFat": 315.1532,
      "dailyProtein": 45.6,
      "createdAt": "2024-07-07T04:13:34.551Z",
      "updatedAt": "2024-07-07T04:13:34.551Z"
    }
  }
}
```

**Get Total Nutrition -> GET /profile/nutrition/:userId**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "dailyCalorie": 1575.766,
    "dailyProtein": 45.6,
    "dailyFat": 315.1532,
    "dailyCarbohydrate": 236.3649,
    "dailySugar": 50
  }
}
```

**Food Tracker -> POST /food/nutrition**
```JSON
{
  "status": 200,
  "message": "Success",
  "data": {
    "foodName": "Omurice",
    "foodInformation": "Omurice adalah hidangan Jepang yang terdiri dari nasi goreng yang dibalut dengan telur dadar tipis. Nasi goreng biasanya dibuat dengan kecap, saus, dan bumbu lainnya, dan sering kali diisi dengan daging atau sayuran. Telur dadar biasanya dibuat tipis dan lembut, dan disajikan di atas nasi goreng. Omurice merupakan makanan yang populer di Jepang dan di seluruh dunia, dan sering disajikan sebagai hidangan utama atau hidangan pembuka.",
    "calorie": "500",
    "sugar": "20",
    "carbohydrate": "80",
    "fat": "20",
    "protein": "25"
  }
}
```


