/* =====================================================================
   THÔNG TIN CỦA BẠN – CHỈ CẦN SỬA FILE NÀY
   ---------------------------------------------------------------------
   • Mỗi chữ có thể viết 1 ngôn ngữ:      "Xin chào"
     hoặc 2 ngôn ngữ (cho nút VI/EN):     { vi: "Xin chào", en: "Hello" }
   • Ảnh: bỏ file vào thư mục assets/ rồi ghi đường dẫn, vd "assets/avatar.jpg".
     Để trống "" nếu chưa có ảnh – web sẽ tự hiển thị khung thay thế.
   • Muốn thêm mục: chép nguyên một khối { ... }, dán ngay sau, nhớ dấu phẩy.
   • Muốn ẩn mục: xoá khối đó (hoặc để mảng rỗng []).
   ===================================================================== */

const PORTFOLIO = {

  /* ---------- Thông tin chung ---------- */
  name: "Nguyễn Bá Cường",
  shortName: "Cường",                    // hiện ở logo / chân trang
  role: { vi: "Sinh viên IT & Chuyển đổi số", en: "IT & Digital Transformation Student" },

  // Ảnh nền màn hình đầu (ảnh phong cảnh / ảnh bạn, khổ ngang). Trống = cảnh núi đêm có sẵn.
  heroImage: "assets/hero-cliff.webp",
  // Ảnh tiền cảnh đã tách bầu trời (WebP/PNG trong suốt). Có ảnh này thì phần trời
  // sẽ là bầu trời đêm navy với cực quang và sao băng (ưu tiên hơn heroImage).
  heroForeground: "assets/hero-fg.webp",
  // Ảnh chân dung ở phần "Về tôi" (nên là ảnh đã xoá nền, dạng .png). Trống = chữ viết tắt.
  avatar: "assets/avatar.webp",
  // Ảnh hiện ra khi rê chuột / chạm vào chân dung (vd: ảnh Spider-Man của bạn).
  // Nên cùng khung hình với ảnh chân dung để khớp mặt. Trống = tắt hiệu ứng.
  avatarAlt: "assets/avatar-spider.webp",
  // Ảnh nhỏ ở khung "Tìm tôi tại" (ảnh lúc đi sự kiện, thuyết trình...).
  contactPhoto: "",

  about: {
    vi: "[Điền 2–3 câu giới thiệu về bạn: bạn học gì, quan tâm điều gì, mục tiêu nghề nghiệp là gì.]",
    en: "[Write 2–3 sentences about yourself: what you study, what you care about, your career goals.]"
  },

  cvLink: "",          // link CV (Google Drive / PDF). Trống = ẩn nút "Xem CV"

  /* ---------- Học vấn ---------- */
  education: [
    {
      org: { vi: "Đại học Kinh tế Quốc dân", en: "National Economics University" },
      logo: "",                              // vd "assets/neu.png"
      time: "20xx – nay",
      title: { vi: "Công nghệ thông tin & Chuyển đổi số", en: "IT & Digital Transformation" },
      place: { vi: "Hà Nội", en: "Hanoi" },
      tag: { vi: "Đại học", en: "Undergraduate" }
    },
    {
      org: "[Tên trường THPT]",
      logo: "",
      time: "20xx – 20xx",
      title: "[Chuyên ban / thành tích]",
      place: "[Tỉnh/Thành phố]",
      tag: "THPT"
    }
  ],

  /* ---------- Kinh nghiệm / Hoạt động ---------- */
  experience: [
    {
      org: "NEU",
      logo: "",
      time: "20xx",
      title: { vi: "Dự án EdTech tại NEU", en: "EdTech Project at NEU" },
      place: { vi: "Hà Nội", en: "Hanoi" },
      tag: { vi: "Dự án", en: "Project" }
    },
    {
      org: "[Tên CLB / công ty]",
      logo: "",
      time: "20xx",
      title: "[Vai trò của bạn]",
      place: "[Địa điểm]",
      tag: "[Loại: CLB / Thực tập / Tình nguyện]"
    }
  ],

  /* ---------- Dự án ---------- */
  projects: [
    {
      title: { vi: "Dự án EdTech tại NEU", en: "EdTech Project at NEU" },
      image: "",                              // ảnh chụp màn hình dự án
      desc: {
        vi: "[Mô tả ngắn 1–2 câu về dự án.]",
        en: "[Short 1–2 sentence description.]"
      },
      details: {
        vi: "[Mô tả chi tiết: bối cảnh, bạn đã làm gì, kết quả đạt được.]",
        en: "[Details: context, what you did, results.]"
      },
      tags: ["EdTech", "SmartPLS", "Research"],
      demo: ""                                // link demo / bài báo. Trống = ẩn nút
    },
    {
      title: "[Tên dự án 2]",
      image: "",
      desc: "[Mô tả ngắn]",
      details: "[Mô tả chi tiết]",
      tags: ["[Công cụ]"],
      demo: ""
    }
  ],

  /* ---------- Chứng chỉ ---------- */
  certificates: [
    { title: "[Tên chứng chỉ]", issuer: "[Đơn vị cấp]", time: "20xx", image: "", link: "" }
  ],

  /* ---------- Giải thưởng ---------- */
  awards: [
    { title: "[Tên giải thưởng]", issuer: "[Cuộc thi / đơn vị]", time: "20xx", image: "", link: "" }
  ],

  /* ---------- Ảnh hoạt động (hiện rải rác, nghiêng nghiêng) ---------- */
  // Thêm đường dẫn ảnh, vd: ["assets/g1.jpg", "assets/g2.jpg"]. Trống = ẩn phần này.
  gallery: ["assets/trip-castle.webp", "assets/trip-lake.webp", "assets/trip-sunset.webp", "assets/trip-lake-rock.webp"],

  /* ---------- Liên hệ ---------- */
  contact: {
    email: "cuongngba.work@gmail.com",
    linkedin: "https://www.linkedin.com/in/cuongngba-work",
    github: "",       // vd "https://github.com/ten-ban"
    facebook: "",
    instagram: "",
    tiktok: ""
  }
};
