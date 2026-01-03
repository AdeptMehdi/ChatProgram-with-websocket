<div align="center">

# 🌌 Midnight Glass Chat | سامانه چت میدنایت گلس

An advanced, high-performance real-time chat platform featuring **Midnight Apple Style** design, high contrast aesthetics, and optimized Persian typography. Built with **Astro** and **Socket.io**.

یک پلتفرم چت پیشرفته و بسیار سریع با زبان طراحی **Midnight Apple Style**، تضاد رنگی بالا و تایپوگرافی فارسی بهینه. توسعه یافته با **Astro** و **Socket.io**.

</div>

---

## 🇬� English Description

### 🏗 System Architecture
**1. Service-Oriented Programming (SOP)**
The project utilizes a service-oriented architecture to handle business logic. All core operations are managed in isolated services (`UserService`, `RoomService`, etc.) to ensure system stability and scalability.

**2. Performance Optimization**
- **Static Glass**: Replaced heavy background animations with static light blobs to minimize CPU/GPU usage.
- **Optimized Blur**: Using optimized glass filters for smooth rendering across all browsers.

### 💎 UI/UX Features
- **Midnight Glassmorphism**: 
    - Pure black background (`#000000`) combined with glowing glass elements.
    - High contrast for better readability and a luxurious look.
    - Inline centered lobby header with light effects.
- **Typography & Localization**:
    - Utilizing standard **Vazir** font for Persian text.
    - Full **RTL** support with localized date/time formatting.
- **Smart Messaging System**:
    - **iMessage**-style design with clear distinction between self and other messages.
    - System alerts with custom **Midnight Apple Swal** styling.
- **Professional Responsiveness**:
    - Mobile-First design with a drawer sidebar for mobile devices.

### 🛠 Tech Stack
- **Astro**: Island architecture for ultra-fast loading speeds.
- **Socket.io**: Stable real-time communication.
- **SweetAlert2**: Notification management with Midnight theme.
- **Vazir Font**: Optimized Persian font for the web.

---

## 🇮🇷 توضیحات فارسی

### 🏗 معماری سیستم
**۱. متدولوژی برنامه‌نویسی سرویس‌گرا (SOP)**
این پروژه از معماری سرویس‌گرا برای مدیریت منطق تجاری استفاده می‌کند. تمام عملیات‌های هسته در سرویس‌های ایزوله (`UserService`, `RoomService` و غیره) مدیریت می‌شوند تا پایداری و مقیاس‌پذیری سیستم تضمین شود.

**۲. بهینه‌سازی پرفورمنس**
- **شیشه استاتیک (Static Glass)**: حذف انیمیشن‌های سنگین پس‌زمینه و جایگزینی با بلوب‌های نوری استاتیک برای کاهش مصرف CPU/GPU.
- **تاری بهینه (Optimized Blur)**: استفاده از فیلترهای شیشه‌ای بهینه شده برای رندرینگ روان در تمامی مرورگرها.

### 💎 ویژگی‌های برجسته رابط کاربری (UI/UX)
- **طراحی Midnight Glassmorphism**: 
    - ترکیب رنگ سیاه مطلق (`#000000`) با المان‌های شیشه‌ای درخشان.
    - تضاد رنگی بالا برای خوانایی بهتر و ظاهر لوکس.
    - هدر لابی مرکز‌چین شده با نمایش **Inline** و افکت‌های نوری.
- **تایپوگرافی و بومی‌سازی**:
    - استفاده از فونت استاندارد **وزیر (Vazir)**.
    - پشتیبانی کامل از **RTL** و تاریخ/زمان فارسی.
- **سیستم پیام‌رسانی هوشمند**:
    - طراحی مشابه **iMessage** با تفکیک دقیق پیام‌های خودی و دیگران.
    - هشدارهای سیستمی با استایل اختصاصی **Midnight Apple Swal**.
- **ریسپانسیو حرفه‌ای**:
    - طراحی Mobile-First با سایدبار کشویی (Drawer) در حالت موبایل.

### 🛠 تکنولوژی‌های مورد استفاده
- **Astro**: فریم‌ورک جزیره‌ای برای سرعت بارگذاری فوق‌العاده.
- **Socket.io**: ارتباطات بی‌درنگ و پایدار.
- **SweetAlert2**: مدیریت اعلان‌ها با تم Midnight.
- **Vazir Font**: فونت فارسی بهینه شده برای وب.

---

## 📂 Project Structure | ساختار پروژه

```text
.
├── public/
│   └── css/
│       └── style.css       # Midnight Glass styles & visual variables
├── src/
│   ├── components/
│   │   └── Chat.astro      # Main UI & Client logic (Midnight Theme)
│   ├── layouts/
│   │   └── Layout.astro    # Base layout & Font management
│   └── server/
│       ├── socket.js       # Network handling
│       └── services/       # Business logic (SOP)
└── README.md
```

---

## 🚀 Quick Start | راه اندازی سریع

1. **Install Dependencies | نصب وابستگی‌ها:**
```bash
npm install
```

2. **Run concurrently | اجرای همزمان (در دو ترمینال):**
```bash
# Terminal 1
npm run server:dev

# Terminal 2
npm run dev
```

3. **View | مشاهده:** `http://localhost:4321`

---

## 📜 License | لایسنس
This project is licensed under the MIT License.
این پروژه تحت لایسنس MIT منتشر شده است.

---
<div align="center">
<b>Developed with ❤️ for a better User Experience</b>
<br>
<b>توسعه یافته با ❤️ برای تجربه کاربری بهتر</b>
</div>
