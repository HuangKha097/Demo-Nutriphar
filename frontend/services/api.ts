import { sharedProducts, SharedProduct } from "@/data/products";

export interface Product extends SharedProduct {}

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
}

export interface CoreValue {
  iconName: string;
  title: string;
  description: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Certification {
  title: string;
  subtitle: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  bio: string;
}

export interface AboutData {
  coreValues: CoreValue[];
  timelineEvents: TimelineEvent[];
  certifications: Certification[];
  teamMembers: TeamMember[];
}

// Global API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const USE_MOCK = true; // Set to false to hit the live API endpoints

// 1. Products API Service
export async function getProducts(params?: {
  category?: string;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number | null;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: Product[]; total: number }> {
  if (!USE_MOCK && API_BASE_URL) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append("category", params.category);
    if (params?.query) queryParams.append("query", params.query);
    if (params?.minPrice !== undefined) queryParams.append("minPrice", String(params.minPrice));
    if (params?.maxPrice !== undefined) queryParams.append("maxPrice", String(params.maxPrice));
    if (params?.rating) queryParams.append("rating", String(params.rating));
    if (params?.sort) queryParams.append("sort", params.sort);
    if (params?.page) queryParams.append("page", String(params.page));
    if (params?.limit) queryParams.append("limit", String(params.limit));

    const response = await fetch(`${API_BASE_URL}/products?${queryParams.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  }

  // Simulated API response delay for realistic loader states
  await new Promise((resolve) => setTimeout(resolve, 300));

  let result = [...sharedProducts];

  if (params?.query) {
    const q = params.query.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  if (params?.category && params.category !== "Tất cả") {
    result = result.filter((p) => p.category === params.category);
  }

  if (params?.minPrice !== undefined) {
    result = result.filter((p) => p.priceVal >= params.minPrice!);
  }

  if (params?.maxPrice !== undefined) {
    result = result.filter((p) => p.priceVal <= params.maxPrice!);
  }

  if (params?.rating !== undefined && params.rating !== null) {
    result = result.filter((p) => p.rating >= params.rating!);
  }

  if (params?.sort) {
    if (params.sort === "price-asc") {
      result.sort((a, b) => a.priceVal - b.priceVal);
    } else if (params.sort === "price-desc") {
      result.sort((a, b) => b.priceVal - a.priceVal);
    } else if (params.sort === "reviews") {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }

  const total = result.length;
  const page = params?.page || 1;
  const limit = params?.limit || 6;
  const startIndex = (page - 1) * limit;
  const products = result.slice(startIndex, startIndex + limit);

  return { products, total };
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!USE_MOCK && API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Failed to fetch product details");
    return response.json();
  }

  await new Promise((resolve) => setTimeout(resolve, 150));
  const product = sharedProducts.find((p) => p.id === id);
  return product || null;
}

// 2. News API Service
export async function getNewsArticles(): Promise<NewsArticle[]> {
  if (!USE_MOCK && API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/news`);
    if (!response.ok) throw new Error("Failed to fetch news articles");
    return response.json();
  }

  await new Promise((resolve) => setTimeout(resolve, 200));
  return [
    {
      id: 1,
      title: "Yến Sào Nutriphar Đạt Chứng Nhận Chất Lượng ISO 22000:2018",
      excerpt:
        "Công ty Cổ phần Dược phẩm Nutriphar vinh dự đạt chứng nhận ISO 22000:2018 về hệ thống quản lý an toàn thực phẩm, khẳng định cam kết chất lượng vượt trội.",
      image: "/images/quytrinhsanxuat.jpg",
      date: "15/05/2025",
      slug: "#",
    },
    {
      id: 2,
      title: "Khám Phá Quy Trình Sản Xuất Yến Sào Sạch Tại Nha Trang",
      excerpt:
        "Tham quan quy trình sản xuất yến sào từ khâu thu hoạch, làm sạch đến đóng gói tại nhà máy hiện đại của Nutriphar tại Nha Trang - Khánh Hòa.",
      image: "/images/vecongty.jpg",
      date: "28/04/2025",
      slug: "#",
    },
    {
      id: 3,
      title: "Lợi Ích Của Yến Sào Đối Với Sức Khỏe Phụ Nữ Mang Thai",
      excerpt:
        "Nghiên cứu khoa học cho thấy yến sào giàu glycoprotein, axit amin và khoáng chất thiết yếu, hỗ trợ sức khỏe toàn diện cho mẹ bầu và thai nhi.",
      image: "/images/khanhhoa-sea.jpg",
      date: "10/04/2025",
      slug: "#",
    },
  ];
}

// 3. About API Service
export async function getAboutData(): Promise<AboutData> {
  if (!USE_MOCK && API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/about`);
    if (!response.ok) throw new Error("Failed to fetch about data");
    return response.json();
  }

  await new Promise((resolve) => setTimeout(resolve, 200));
  return {
    coreValues: [
      {
        iconName: "Sparkles",
        title: "Chất Lượng Thượng Hạng",
        description: "Cam kết 100% yến thật tự nhiên khai thác trực tiếp từ vùng yến đảo Khánh Hòa, bảo toàn trọn vẹn 18 loại axit amin và khoáng chất quý giá.",
      },
      {
        iconName: "ShieldCheck",
        title: "Uy Tín Vững Bền",
        description: "Trung thực trong nguồn gốc và chất lượng. Quy trình sản xuất nghiêm ngặt nói không với chất bảo quan, phụ gia hay chất độn hóa học.",
      },
      {
        iconName: "Heart",
        title: "Tận Tâm Chăm Sóc",
        description: "Coi khách hàng như người thân, không ngừng nghiên cứu công thức cải tiến để tối ưu hóa sự hấp thụ dinh dưỡng cho từng lứa tuổi.",
      },
      {
        iconName: "Target",
        title: "Đột Phá Nghiên Cứu",
        description: "Kết hợp tinh hoa y học truyền thống cùng công nghệ sản xuất hiện đại và quy trình kiểm định khắt khe đạt chuẩn y tế GMP.",
      },
    ],
    timelineEvents: [
      {
        year: "2018",
        title: "Khởi Đầu Đầy Khát Vọng",
        description: "Thành lập Công ty Cổ phần Dược phẩm Nutriphar, tập trung đầu tư xây dựng chuỗi nhà yến đạt tiêu chuẩn kiểm soát vi khí hậu khép kín.",
      },
      {
        year: "2020",
        title: "Chuẩn Hóa Quốc Tế",
        description: "Nhà máy sản xuất chính thức đi vào hoạt động công suất cao, xuất sắc đạt chứng nhận an toàn thực phẩm ISO 22000 & HACCP quốc tế.",
      },
      {
        year: "2022",
        title: "Vươn Tầm Quốc Gia",
        description: "Ra mắt dòng sản phẩm yến chưng sẵn cao cấp kết hợp dược liệu quý, vinh dự lọt Top các thương hiệu yến sào được tin dùng hàng đầu.",
      },
      {
        year: "2025",
        title: "Đổi Mới & Xuất Khẩu",
        description: "Ứng dụng thành công công nghệ sấy thăng hoa giữ trọn hoạt tính sinh học, chính thức xuất khẩu sản phẩm sang thị trường Đông Nam Á.",
      },
    ],
    certifications: [
      {
        title: "Đạt Chuẩn GMP",
        subtitle: "Thực hành sản xuất tốt",
        description: "Hệ thống nhà máy vận hành đồng bộ theo tiêu chuẩn y tế quốc tế khắt khe.",
      },
      {
        title: "Chứng Chỉ ISO 22000",
        subtitle: "An toàn thực phẩm toàn cầu",
        description: "Hệ thống quản lý chất lượng đạt tiêu chuẩn châu Âu nghiêm ngặt.",
      },
      {
        title: "Tiêu Chuẩn HACCP",
        subtitle: "Kiểm soát mối nguy sinh học",
        description: "Cam kết ngăn ngừa mọi rủi ro vệ sinh trong suốt dây chuyền chế biến.",
      },
      {
        title: "Cam Kết 100% Yến Thật",
        subtitle: "Bảo hiểm chất lượng",
        description: "Cam kết bồi hoàn giá trị nếu phát hiện pha trộn tạp chất hoặc chất độn.",
      },
    ],
    teamMembers: [
      {
        name: "Dược Sĩ Nguyễn Văn A",
        role: "Trưởng phòng Nghiên cứu & Phát triển (R&D)",
        experience: "15+ năm kinh nghiệm nghiên cứu thảo dược",
        bio: "Mỗi công thức yến sào kết hợp dược liệu đều được tôi và đội ngũ tối ưu hóa tỷ lệ sinh học để cơ thể hấp thu tối đa dinh dưỡng quý báu.",
      },
      {
        name: "Bà Trần Thị B",
        role: "Sáng lập viên & Tổng Giám đốc (CEO)",
        experience: "Người mang khát vọng nâng tầm yến sào Việt",
        bio: "Nutriphar không chỉ bán sản phẩm chăm sóc sức khỏe, chúng tôi trao gửi giải pháp sức khỏe bền vững đi từ cái Tâm và uy tín hàng đầu.",
      },
      {
        name: "Dược Sĩ Lê Hoàng C",
        role: "Giám đốc Kiểm soát Chất lượng (QA/QC)",
        experience: "Thành viên ban kiểm định chất lượng y tế",
        bio: "Từng lô sản phẩm xuất xưởng đều phải vượt qua 3 tầng kiểm định vi sinh lý hóa khắt khe để đảm bảo sự an tâm tuyệt đối cho khách hàng.",
      },
    ],
  };
}

// 4. Authentication API Service
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export async function loginWithCredentials(email: string, password: string): Promise<AuthResponse> {
  if (!USE_MOCK && API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || "Đăng nhập thất bại");
    }
    return response.json();
  }

  // Simulated mock authentication
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  if (email === "admin@nutriphar.vn" && password === "admin123") {
    return {
      user: {
        id: "1",
        name: "Admin Nutriphar",
        email: "admin@nutriphar.vn",
      },
      token: "mock-jwt-token-12345",
    };
  }
  
  // Accept any valid-looking input for demo purposes, but simulate real validation
  if (!email.includes("@")) {
    throw new Error("Địa chỉ email không hợp lệ");
  }
  if (password.length < 6) {
    throw new Error("Mật khẩu phải chứa ít nhất 6 ký tự");
  }
  
  return {
    user: {
      id: String(Math.floor(Math.random() * 1000) + 10),
      name: email.split("@")[0],
      email: email,
    },
    token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
  };
}

export async function registerWithCredentials(name: string, email: string, password: string): Promise<AuthResponse> {
  if (!USE_MOCK && API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || "Đăng ký thất bại");
    }
    return response.json();
  }

  // Simulated mock registration
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!email.includes("@")) {
    throw new Error("Địa chỉ email không hợp lệ");
  }
  if (password.length < 6) {
    throw new Error("Mật khẩu phải chứa ít nhất 6 ký tự");
  }

  return {
    user: {
      id: String(Math.floor(Math.random() * 1000) + 10),
      name,
      email,
    },
    token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
  };
}

export async function loginWithGoogle(): Promise<AuthResponse> {
  if (!USE_MOCK && API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (!response.ok) throw new Error("Google login failed");
    return response.json();
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    user: {
      id: "google-101",
      name: "Google User",
      email: "google.user@gmail.com",
    },
    token: "mock-google-token-54321",
  };
}

