# Portfolio

Website portfolio một trang, chạy trên GitHub Pages.

## Sửa thông tin

**Chỉ cần sửa file `data.js`.** Không cần đụng tới `index.html`, `style.css`, `script.js`.

Trên GitHub: mở `data.js` → bấm biểu tượng ✏️ (Edit) → sửa → **Commit changes**. Khoảng 1 phút sau web tự cập nhật.

- Chữ 1 ngôn ngữ: `"Xin chào"` — hoặc 2 ngôn ngữ cho nút VI/EN: `{ vi: "Xin chào", en: "Hello" }`
- Thêm mục (dự án, chứng chỉ…): chép một khối `{ ... }`, dán ngay sau, nhớ dấu phẩy `,`
- Để trống `""` hoặc `[]` thì phần đó tự ẩn / hiện khung thay thế

## Thêm ảnh

1. Trên GitHub vào thư mục `assets` → **Add file → Upload files** → kéo ảnh vào → Commit.
2. Trong `data.js` ghi đường dẫn, ví dụ `avatar: "assets/avatar.png"`.

| Ô trong data.js | Ảnh gì | Gợi ý |
|---|---|---|
| `heroImage` | Ảnh nền màn hình đầu | Ảnh ngang, ≥ 1600px |
| `avatar` | Chân dung phần "Về tôi" | PNG đã xoá nền, dọc |
| `contactPhoto` | Ảnh nhỏ ở phần Liên hệ | Ảnh đi sự kiện / thuyết trình |
| `projects[].image` | Ảnh chụp dự án | Tỉ lệ 2:1 |
| `certificates[].image`, `awards[].image` | Ảnh chứng chỉ, giấy khen | |
| `gallery` | Ảnh hoạt động (hiện rải rác) | Ảnh dọc |
