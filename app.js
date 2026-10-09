import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// ==========================================
// CẤU HÌNH SUPABASE (BẠN CẦN THAY THẾ KEY CỦA BẠN VÀO ĐÂY)
// ==========================================
const SUPABASE_URL = 'https://ewparduxazltoxfeggkn.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_RxcMRa-4r-M193AR_Ub56w_2BEjD1kM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ==========================================
// CÁC HÀM TƯƠNG TÁC VỚI DATABASE
// ==========================================

export async function getRequests() {
    const { data, error } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Lỗi lấy dữ liệu:', error);
        return [];
    }
    
    // Đổi tên trường created_at thành date để khớp với UI hiện tại
    return data.map(item => ({
        ...item,
        date: item.created_at.split('T')[0]
    }));
}

export async function generateId() {
    // Lấy số lượng request hiện tại để sinh ID (cách đơn giản cho Prototype)
    const { count, error } = await supabase
        .from('requests')
        .select('*', { count: 'exact', head: true });
    
    const currentNum = (count || 0) + 1;
    return `HR-2026-${String(currentNum).padStart(5, '0')}`;
}

export async function createRequest(requestData) {
    const id = await generateId();
    
    const newReq = {
        id: id,
        category: requestData.category,
        subcategory: requestData.subcategory,
        title: requestData.title,
        priority: requestData.priority,
        status: 'Submitted',
        requester: 'Current Employee'
    };

    const { data, error } = await supabase
        .from('requests')
        .insert([newReq]);

    if (error) {
        console.error('Lỗi tạo yêu cầu:', error);
        alert('Có lỗi xảy ra khi lưu vào Supabase!');
        return null;
    }
    return newReq;
}

export async function updateRequestStatus(id, newStatus) {
    const { data, error } = await supabase
        .from('requests')
        .update({ status: newStatus })
        .eq('id', id);

    if (error) {
        console.error('Lỗi cập nhật trạng thái:', error);
        alert('Có lỗi xảy ra khi cập nhật!');
    }
}
