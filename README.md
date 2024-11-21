
# CRM Backend Project (ExpressJs, MongoDB)

Hệ thống quản lý khách hàng và sản phẩm đơn giản (CRM) sử dụng Express.js và MongoDB. Hệ thống tích hợp AdminBro để quản lý dữ liệu qua giao diện web.
- Tích hợp API RESTful để quản lý dữ liệu.
- Giao diện quản trị dễ sử dụng thông qua AdminBro.
- Xác thực người dùng và phân quyền.

## 1. Hướng dẫn cài đặt

### Yêu cầu:
- Node.js >= 14
- MongoDB

### Cài đặt:
1. Clone repo về máy:
   ```bash
   git clone https://github.com/hvson2003/CRM-system
   cd CRM-system
   ```

2. Cài đặt các thư viện:
   ```bash
   npm install
   ```

3. Cấu hình môi trường:
   Vào MongoDB Compass và tạo database có tên là crm
   Tạo file `.env` trong thư mục gốc và cấu hình:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/crm
   JWT_SECRET=yourSecretKey
   ```

4. Chạy ứng dụng:
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại `http://localhost:3000`.

---

## 2. Các Endpoint API

### Quản lý khách hàng
- **GET /api/customers** - Lấy danh sách khách hàng
- **GET /api/customers/:id** - Lấy thông tin khách hàng theo ID
- **POST /api/customers** - Thêm khách hàng mới
- **PUT /api/customers/:id** - Cập nhật thông tin khách hàng
- **DELETE /api/customers/:id** - Xóa khách hàng

### Quản lý sản phẩm
- **GET /api/products** - Lấy danh sách sản phẩm
- **GET /api/products/:id** - Lấy thông tin sản phẩm theo ID
- **POST /api/products** - Thêm sản phẩm mới
- **PUT /api/products/:id** - Cập nhật thông tin sản phẩm
- **DELETE /api/products/:id** - Xóa sản phẩm


Để dễ dàng kiểm tra các endpoint của API, tôi đã tạo một file Postman chứa các yêu cầu API cho dự án này.

---

## 3. Cách truy cập AdminBro

Truy cập giao diện quản trị AdminBro tại đường dẫn:
```
http://localhost:3000/admin
```

### Thông tin đăng nhập:
- **Email**: `admin@gmail.com`
- **Mật khẩu**: `123456`
