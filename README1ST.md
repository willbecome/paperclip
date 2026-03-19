# Hướng Dẫn Cài Đặt Proxy API Adapter & Pixel Workspace (Đọc Trước Khi Bắt Đầu)

Chào mừng bạn đến với bản cập nhật mới nhất của Paperclip! Bản update này mang đến khả năng kết nối đa mô hình linh hoạt qua **Proxy API Adapter** và không gian làm việc ảo sinh động **Pixel Workspace**.

## 1. Các thành phần mới

*   **Proxy API Adapter:** Một "cổng kết nối" duy nhất giúp bạn gọi đến OpenAI, Claude (Anthropic), Gemini (Google) và cả Ollama chạy nội bộ.
*   **Pixel Workspace:** Giao diện đồ họa trên Dashboard, hiển thị các Agent dưới dạng nhân vật Pixel đang làm việc theo thời gian thực.
*   **Pixel Agents Logging:** Tự động ghi log định dạng JSONL để tích hợp với các ứng dụng theo dõi Agent bên ngoài.

---

## 2. Hướng dẫn cài đặt nhanh

### Bước 1: Chuẩn bị API Key
Tùy vào mô hình bạn muốn dùng, hãy lấy API Key tương ứng:
- **OpenAI:** [platform.openai.com](https://platform.openai.com/)
- **Claude:** [console.anthropic.com](https://console.anthropic.com/)
- **Gemini:** [aistudio.google.com](https://aistudio.google.com/)
- **Ollama:** Không cần key (chỉ cần chạy Ollama trên máy của bạn).

### Bước 2: Thêm Agent mới trong Paperclip
1. Truy cập vào Dashboard của Paperclip (mặc định là `http://localhost:3100`).
2. Nhấn nút **Hire Agent**.
3. Trong mục **Adapter**, chọn **Proxy API**.

### Bước 3: Cấu hình Adapter
Điền các thông tin sau dựa trên nhà cung cấp bạn chọn:

| Nhà cung cấp | Provider | Model Name (Ví dụ) | Ghi chú |
| :--- | :--- | :--- | :--- |
| **OpenAI** | `openai` | `gpt-4o`, `gpt-3.5-turbo` | Nhập API Key của bạn. |
| **Anthropic** | `anthropic` | `claude-3-5-sonnet-20241022` | Nhập API Key của bạn. |
| **Google** | `gemini` | `gemini-1.5-pro` | Nhập API Key của bạn. |
| **Ollama** | `ollama` | `llama3`, `mistral` | Chạy lệnh `ollama serve` trước. |

**Mẹo cho Ollama:** Nếu bạn dùng Ollama, Paperclip sẽ tự động kết nối qua địa chỉ mặc định `http://localhost:11434/v1`. Bạn có thể thay đổi địa chỉ này trong mục **Base URL** nếu cần.

---

## 3. Theo dõi Agent làm việc (Pixel Workspace)

Ngay sau khi Agent được tạo và bắt đầu nhận nhiệm vụ, bạn sẽ thấy nhân vật pixel của nó xuất hiện trên Dashboard:
- **🟡 Đang gõ (Yellow):** Agent đang suy nghĩ hoặc phản hồi nội dung.
- **🔵 Đang nghỉ (Blue):** Agent đã hoàn thành việc và đang chờ nhiệm vụ mới (Zzz).
- **🔴 Lỗi (Red):** Đã có lỗi xảy ra trong quá trình gọi API.

---

## 4. Xử lý lỗi thường gặp

- **Lỗi kết nối Ollama:** Hãy đảm bảo bạn đã chạy Ollama và mô hình (ví dụ: `ollama run llama3`) đã được tải về máy.
- **Lỗi API Key:** Kiểm tra lại xem bạn có copy thừa khoảng trắng nào ở hai đầu mã key hay không.
- **Agent không hiện trên Dashboard:** Agent chỉ xuất hiện khi có sự thay đổi trạng thái đầu tiên. Hãy thử nhấn **Wake** để đánh thức Agent.

---
**Chúc bạn có những trải nghiệm tuyệt vời với đội ngũ Agent ảo của mình!** 🚀
