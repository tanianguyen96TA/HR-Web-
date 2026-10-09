-- Bảng lưu trữ yêu cầu HR
CREATE TABLE requests (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    title TEXT NOT NULL,
    priority TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Submitted',
    requester TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert dữ liệu mẫu
INSERT INTO requests (id, category, subcategory, title, priority, status, requester)
VALUES 
    ('HR-2026-00001', 'Leave & Attendance', 'Nghỉ phép', 'Xin nghỉ phép ngày 15/10', 'Medium', 'Submitted', 'Nguyen Van A'),
    ('HR-2026-00002', 'Documents & Certificates', 'Xác nhận lương', 'Giấy xác nhận lương T9', 'High', 'InProgress', 'Tran Thi B');
