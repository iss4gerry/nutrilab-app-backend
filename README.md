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
Create Profile           : `POST /profile`\
User Total Nutrition     : `GET /profile/nutrition/:userId`\
User Progress Nutrition  : `GET /profile/nutrition/progress/:userId`\

**- Food Route** \
Food Nutrition Text Tracker      : `POST /food/nutrition`\

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

**- Food Nutrition Text Route**
```
userId              (string, required)
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

**Get Profile  -> GET /profile/:userId**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "id": "55eb2d39-22ac-465e-a633-4efb2b2701cf",
    "userId": "20aefb60-905b-443e-9189-e74eb5c246ca",
    "gender": "male",
    "dateOfBirth": "2003-12-20",
    "allergies": "Tidak Punya",
    "weight": 57,
    "height": 172,
    "createdAt": "2024-07-07T03:12:47.691Z",
    "updatedAt": "2024-07-07T03:12:47.691Z",
    "user": {
      "name": "mayu",
      "email": "mayu@gmail.com"
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


**Get Progress Nutrition -> GET /profile/nutrition/progress/:userId**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "totalCalories": 0,
    "totalCarbohydrate": 0,
    "totalProtein": 0,
    "totalFat": 0,
    "totalSugar": 0
  }
}
```

**Nutrition Text Tracker -> POST /food/nutrition**
```JSON
{
  "status": 200,
  "message": "Success",
  "data": {
    "foodInfo": {
      "foodName": "Nasi Padang",
      "foodInformation": "Nasi Padang adalah hidangan khas Minangkabau, Sumatera Barat, yang terkenal dengan cita rasa rempah dan beragam lauk pauknya.",
      "calorie": "300",
      "sugar": "10",
      "carbohydrate": "40",
      "fat": "15",
      "protein": "20"
    },
    "progressNutrition": {
      "totalCalories": 1200,
      "totalCarbohydrate": 180,
      "totalProtein": 85,
      "totalFat": 70,
      "totalSugar": 40
    }
  }
}
```

**Get History -> GET /history/:userId**
```json
{
  "status": 200,
  "message": "Success",
  "data": [
    {
      "id": "17a0b27f-f545-45a0-ba78-03f013fa1310",
      "userId": "20aefb60-905b-443e-9189-e74eb5c246ca",
      "foodName": "Nasi Padang",
      "foodInformation": "Nasi Padang adalah hidangan khas Sumatera Barat yang terdiri dari nasi putih dan berbagai lauk pauk, seperti rendang, ayam goreng, ikan bakar, dan sayur-sayuran.",
      "totalCalorie": 350,
      "totalCarbohydrate": 50,
      "totalSugar": 10,
      "totalFat": 20,
      "totalProtein": 25,
      "date": "2024-07-08T04:16:50.683Z"
    }
  ]
}
```


