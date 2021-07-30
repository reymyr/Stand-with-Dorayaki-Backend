# Stand-with-Dorayaki-Backend

Backend for Stand with Dorayaki App.

## Specification
Stand with Dorayaki Backend is a store management app backend developed using MongoDB and NodeJs. This app will communicate with the frontend, the source code is located in [this](https://github.com/reymyr/Stand-with-Dorayaki-Frontend) repository.

## How To Use
1. Install Docker
2. Clone this repository and navigate to the cloned folder
    ```bash
    git clone https://github.com/reymyr/Stand-with-Dorayaki-Backend.git
    ```
3. Create a .env file from .env.example and edit accordingly
4. Run the app with docker
   ```bash
   docker-compose up
   ```
5. The API can then be accessed by going to http://localhost:5000/
6. The list of available endpoints are specified the next section

## Endpoints
In this section, the endpoints are divided into two groups, Dorayaki and Store
### Dorayaki
- Get all dorayaki
  - Get all dorayaki in the database
  - Endpoint: `/api/dorayaki`
  - Method: GET
- Get dorayaki by id
  - Get dorayaki information based on id
  - Endpoint: `/api/dorayaki/:id`
  - Method: GET
- Add dorayaki
  - Add new dorayaki to the database
  - Endpoint: `/api/dorayaki/add`
  - Method: POST
  - Body example:
    ```json
    {
      "rasa": "Coklat",
      "deskripsi": "Dorayaki rasa coklat",
      "gambar": "data:image/jpeg;base64,..."
    }
    ```
- Edit dorayaki
  - Edit an existing dorayaki
  - Endpoint: `/api/dorayaki/:id`
  - Method: PUT
  - Body example:
    ```json
    {
      "rasa": "Cokelat",
      "deskripsi": "Dorayaki rasa coklat",
      "gambar": "data:image/jpeg;base64,..."
    }
    ```
- Delete dorayaki
  - Remove a dorayaki from the database
  - Endpoint: `/api/dorayaki/:id`
  - Method: DELETE
### Store
- Get all store
  - Get all toko in the database
  - Endpoint: `/api/toko`
  - Method: GET
- Get store by id
  - Get toko information based on id
  - Endpoint: `/api/toko/:id`
  - Method: GET
- Add store
  - Add new store to the database
  - Endpoint: `/api/toko/add`
  - Method: POST
  - Body example:
    ```json
    {
      "nama": "Toko A",
      "jalan": "Jalan A",
      "kecamatan": "Kecamatan A",
      "provinsi": "Provinsi A",
      "stok": []
    }
    ```
- Edit store
  - Edit an existing store
  - Endpoint: `/api/toko/:id`
  - Method: PUT
  - Body example:
    ```json
    {
      "nama": "Toko A",
      "jalan": "Jalan B",
      "kecamatan": "Kecamatan A",
      "provinsi": "Provinsi A",
      "stok": []
    }
    ```
- Add or remove stock
  - Add or remove dorayaki from stock
  - Endpoint: `/api/toko/:id/stok`
  - Method: PATCH
  - Body example:
    ```json
    {
      "stok": [
        {"dorayaki":"61005520e6f3ad245c910d67", "jumlah":3}
      ]
    }
    ```
- Transferring stock
  - Transfer dorayaki from one store to another
  - Endpoint: `/api/toko/transfer`
  - Method: PATCH
  - Body example:
    ```json
    {
      "asal":"60e4a4008edb1a0f940eac8e",
      "tujuan":"60e4a4138edb1a0f940eac92",
      "stok":[
        {"dorayakiId":"60e4a39e8edb1a0f940eac8a", "jumlah":2}
      ]
    }
    ```
- Delete store
  - Remove a store from the database
  - Endpoint: `/api/toko/:id`
  - Method: DELETE
## Author
- Reyhan Emyr Arrosyid - 13519167