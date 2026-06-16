import { sharedProducts, SharedProduct } from "@/data/products";

export interface Product extends SharedProduct {
  categoryId?: string | null;
}

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
  category?: string;
  content?: string;
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
  image?: string;
}

export interface Certification {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  bio: string;
  image?: string;
}

export interface AboutData {
  coreValues: CoreValue[];
  timelineEvents: TimelineEvent[];
  certifications: Certification[];
  teamMembers: TeamMember[];
}

// Global API configuration
// Helper for client-side storage persistence
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  const val = localStorage.getItem(key);
  if (!val) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    let parsed = JSON.parse(val);

    // Auto-migrate old localStorage data if it's an array of objects
    if (Array.isArray(parsed) && Array.isArray(defaultValue)) {
      let changed = false;

      // Append any default items that are missing from the parsed list
      const parsedIds = new Set(parsed.map((item: any) => item && item.id).filter((id: any) => id !== undefined));
      const missingItems = defaultValue.filter((d: any) => d && d.id !== undefined && !parsedIds.has(d.id));
      if (missingItems.length > 0) {
        parsed = [...parsed, ...missingItems];
        changed = true;
      }

      const updated = parsed.map((item: any) => {
        if (item && typeof item === "object" && item.id !== undefined) {
          const defaultItem = (defaultValue as any[]).find((d: any) => d && d.id === item.id);
          if (defaultItem) {
            let itemChanged = false;
            const newItem = { ...item };
            for (const k of Object.keys(defaultItem)) {
              if (newItem[k] === undefined || newItem[k] === null || newItem[k] === "" || newItem[k] === "#") {
                newItem[k] = defaultItem[k];
                itemChanged = true;
              }
            }
            if (itemChanged) {
              changed = true;
              return newItem;
            }
          }
        }
        return item;
      });
      if (changed) {
        localStorage.setItem(key, JSON.stringify(updated));
        return updated as unknown as T;
      }
    }

    return parsed;
  } catch {
    return defaultValue;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Global API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const USE_MOCK = true; // Set to false to hit the live API endpoints

// Default Category Definitions
export const DEFAULT_CATEGORIES = [
  { id: "cat-1", name: "Sản phẩm cho người cao tuổi", image: "/images/yensao.png" },
  { id: "cat-2", name: "Sản phẩm cho trẻ em", image: "/images/Nuoc-yen-sao-co-duong.png" },
  { id: "cat-3", name: "Sản phẩm chăm sóc sức khoẻ", image: "/images/Ve-Yen-Thi-Web.png" },
  { id: "cat-4", name: "Sản phẩm thông dụng khác", image: "/images/vecongty.jpg" },
  { id: "cat-5", name: "Phụ kiện sản phẩm", image: "/images/quytrinhsanxuat.jpg" }
];

// Helper to map category names to categoryIds
const getCategoryIdByName = (name: string): string | null => {
  const match = DEFAULT_CATEGORIES.find(c => c.name.toLowerCase() === name.toLowerCase());
  return match ? match.id : null;
};

// Default Products mapped with categoryId
export const INITIAL_PRODUCTS = sharedProducts.map(p => ({
  ...p,
  categoryId: (p as any).categoryId || getCategoryIdByName(p.category) || "cat-1",
  price: p.price,
  priceVal: (p as any).priceVal
}));

// Default News Articles
export const DEFAULT_NEWS = [
  {
    id: 1,
    title: "Yến Sào Nutriphar Đạt Chứng Nhận Chất Lượng ISO 22000:2018",
    excerpt: "Công ty Cổ phần Dược phẩm Nutriphar vinh dự đạt chứng nhận ISO 22000:2018 về hệ thống quản lý an toàn thực phẩm, khẳng định cam kết chất lượng vượt trội.",
    image: "/images/quytrinhsanxuat.jpg",
    date: "15/05/2025",
    slug: "/news/iso-22000-2018",
    category: "Sự kiện & Doanh nghiệp",
    content: "<p>Công ty Cổ phần Dược phẩm Nutriphar tự hào thông báo đã chính thức đạt chứng nhận chất lượng ISO 22000:2018 về hệ thống quản lý an toàn thực phẩm. Đây là cột mốc quan trọng khẳng định cam kết chất lượng vượt trội của Nutriphar đối với sức khỏe người tiêu dùng.</p><h4>Quy trình kiểm định nghiêm ngặt</h4><p>Để đạt được chứng nhận này, toàn bộ dây chuyền sản xuất của Nutriphar đã trải qua quá trình đánh giá độc lập vô cùng khắt khe từ tổ chức kiểm định quốc tế. Các yếu tố từ nguyên liệu yến thô đảo Khánh Hòa đầu vào, môi trường tinh chế khép kín vô trùng, đến khâu đóng gói hoàn thiện đều tuân thủ nghiêm ngặt tiêu chuẩn y tế quốc tế.</p><h4>Cam kết từ Nutriphar</h4><p>Chúng tôi cam kết luôn giữ vững và liên tục cải tiến hệ thống quản lý chất lượng để mang tới cho khách hàng những sản phẩm yến sào thượng hạng, bảo toàn trọn vẹn dưỡng chất thiên nhiên và an toàn tuyệt đối cho cả gia đình bạn.</p>"
  },
  {
    id: 2,
    title: "Khám Phá Quy Trình Sản Xuất Yến Sào Sạch Tại Nha Trang",
    excerpt: "Tham quan quy trình sản xuất yến sào từ khâu thu hoạch, làm sạch đến đóng gói tại nhà máy hiện đại của Nutriphar tại Nha Trang - Khánh Hòa.",
    image: "/images/vecongty.jpg",
    date: "28/04/2025",
    slug: "/news/quy-trinh-san-xuat-sach",
    category: "Sự kiện & Doanh nghiệp",
    content: "<p>Hành trình khám phá nhà máy sản xuất yến sào sạch của Nutriphar tại Nha Trang - Khánh Hòa mang đến cái nhìn chân thực về quy trình sản xuất yến chưng sẵn đạt chuẩn y tế GMP.</p><h4>Từ nhà yến thiên nhiên đến nhà máy tinh chế</h4><p>Nutriphar sở hữu chuỗi nhà yến kiểm soát vi khí hậu khép kín trực tiếp tại vùng biển Khánh Hòa. Tổ yến sau khi thu hoạch được vận chuyển ngay về nhà máy Nha Trang, tại đây đội ngũ kỹ thuật viên lành nghề tiến hành nhặt lông thủ công tỉ mỉ bằng nước tinh khiết mà không sử dụng bất kỳ hóa chất tẩy rửa nào.</p><h4>Ứng dụng công nghệ chưng cất tự động</h4><p>Sau khâu làm sạch, yến được đưa vào hệ thống chưng cất tự động kiểm soát nhiệt độ và áp suất chính xác, giúp giữ lại nguyên vẹn 18 loại axit amin cùng các hoạt chất sinh học quý giá, đáp ứng tiêu chuẩn xuất khẩu nghiêm ngặt sang thị trường Đông Nam Á.</p>"
  },
  {
    id: 3,
    title: "Lợi Ích Của Yến Sào Đối Với Sức Khỏe Phụ Nữ Mang Thai",
    excerpt: "Nghiên cứu khoa học cho thấy yến sào giàu glycoprotein, axit amin và khoáng chất thiết yếu, hỗ trợ sức khỏe toàn diện cho mẹ bầu và thai nhi.",
    image: "/images/khanhhoa-sea.jpg",
    date: "10/04/2025",
    slug: "/news/loi-ich-cua-yen-sao-cho-me-bau",
    category: "Khoa học & Sức khỏe",
    content: "<p>Yến sào từ lâu đã được coi là nguồn dinh dưỡng vàng cho phụ nữ mang thai. Các nghiên cứu khoa học hiện đại đã chứng minh những lợi ích sức khỏe vượt trội mà yến sào mang lại cho cả mẹ bầu và thai nhi.</p><h4>Bổ sung Glycoprotein và Axit Amin thiết yếu</h4><p>Yến sào chứa tới hơn 50% protein cùng nhiều loại axit amin thiết yếu như Aspartic acid, Proline hỗ trợ quá trình tái tạo tế bào cơ thể mạnh mẽ. Đặc biệt, hoạt chất Epidermal Growth Factor (EGF) hỗ trợ kích thích tăng trưởng biểu bì tế bào, giúp làn da mẹ bầu duy trì độ đàn hồi tốt và giảm thiểu rạn da hiệu quả.</p><h4>Hỗ trợ sự phát triển não bộ của thai nhi</h4><p>Hàm lượng Axit Sialic dồi dào trong tổ yến đóng vai trò cực kỳ quan trọng trong việc hình thành và phát triển các liên kết thần kinh, nâng cao hệ miễn dịch và hỗ trợ hoàn thiện não bộ cho thai nhi ngay từ trong bụng mẹ.</p>"
  },
  {
    id: 4,
    title: "5 Cách Phân Biệt Yến Sào Thật Giả Chính Xác Nhất",
    excerpt: "Mẹo nhỏ giúp người tiêu dùng thông minh nhận biết tổ yến nguyên chất so với tổ yến giả, yến độn hóa chất độc hại trên thị trường.",
    image: "/images/vecongty.jpg",
    date: "05/04/2025",
    slug: "/news/cach-phan-biet-yen-sao-that-gia",
    category: "Khoa học & Sức khỏe",
    content: "<p>Phân biệt yến thật yến giả luôn là mối quan tâm hàng đầu của người tiêu dùng...</p>"
  },
  {
    id: 5,
    title: "Nutriphar Khai Trương Showroom Trưng Bày Sản Phẩm Mới Tại Hà Nội",
    excerpt: "Sự kiện đánh dấu bước phát triển vượt bậc của Nutriphar trong hành trình đưa yến sào thượng hạng đến gần hơn với khách hàng thủ đô.",
    image: "/images/quytrinhsanxuat.jpg",
    date: "22/03/2025",
    slug: "/news/khai-truong-showroom-ha-noi",
    category: "Sự kiện & Doanh nghiệp",
    content: "<p>Nhằm đáp ứng nhu cầu sử dụng các sản phẩm yến chưng sẵn ngày càng tăng cao của cư dân thủ đô...</p>"
  },
  {
    id: 6,
    title: "Yến Sào Dinh Dưỡng - Món Quà Sức Khỏe Cho Người Cao Tuổi",
    excerpt: "Tại sao yến sào lại được xem là thần dược giúp tăng cường trí lực, làm chậm quá trình lão hóa và bồi bổ xương khớp cho người già.",
    image: "/images/vecongty.jpg",
    date: "15/03/2025",
    slug: "/news/yen-sao-cho-nguoi-cao-tuoi",
    category: "Khoa học & Sức khỏe",
    content: "<p>Người cao tuổi thường có hệ miễn dịch suy giảm, do đó bổ sung yến sào thường xuyên sẽ mang lại nhiều tác động tích cực...</p>"
  },
  {
    id: 7,
    title: "Chương Trình Khuyến Mãi 'Sức Khỏe Vàng - Ngập Tràn Yêu Thương'",
    excerpt: "Đón hè rực rỡ cùng vô vàn ưu đãi hấp dẫn từ Nutriphar: Giảm ngay 15% tất cả các dòng sản phẩm yến hũ chưng sẵn và combo quà tặng.",
    image: "/images/khanhhoa-sea.jpg",
    date: "01/03/2025",
    slug: "/news/chuong-trinh-khuyen-mai-he",
    category: "Sản phẩm",
    content: "<p>Để cảm ơn quý khách hàng đã đồng hành cùng thương hiệu yến sào DRSANNESTPRO trong suốt thời gian qua...</p>"
  }
];

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

  // Load products dynamically from localStorage
  const storedProducts = getLocalStorage<Product[]>("nutriphar_products_v4", INITIAL_PRODUCTS as any);
  const storedCategories = getLocalStorage<any[]>("nutriphar_categories_v3", DEFAULT_CATEGORIES);

  let result = [...storedProducts];

  if (params?.query) {
    const q = params.query.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  if (params?.category && params.category !== "Tất cả") {
    // Check if category name matches
    result = result.filter((p) => {
      // Find category name by categoryId
      const cat = storedCategories.find(c => c.id === p.categoryId);
      const catName = cat ? cat.name : p.category;
      return catName === params.category;
    });
  }

  if (params?.minPrice !== undefined) {
    result = result.filter((p) => (p.priceVal ?? p.price ?? 0) >= params.minPrice!);
  }

  if (params?.maxPrice !== undefined) {
    result = result.filter((p) => (p.priceVal ?? p.price ?? 0) <= params.maxPrice!);
  }

  if (params?.rating !== undefined && params.rating !== null) {
    result = result.filter((p) => (p.rating ?? 5) >= params.rating!);
  }

  if (params?.sort) {
    if (params.sort === "price-asc") {
      result.sort((a, b) => (a.priceVal ?? (a.price as any)) - (b.priceVal ?? (b.price as any)));
    } else if (params.sort === "price-desc") {
      result.sort((a, b) => (b.priceVal ?? (b.price as any)) - (a.priceVal ?? (a.price as any)));
    } else if (params.sort === "reviews") {
      result.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    }
  }

  const total = result.length;
  const page = params?.page || 1;
  const limit = params?.limit || 6;
  const startIndex = (page - 1) * limit;
  const products = result.slice(startIndex, startIndex + limit);

  // Sync category string name on return for storefront compatibility
  const productsWithCategoryName = products.map(p => {
    const cat = storedCategories.find(c => c.id === p.categoryId);
    return {
      ...p,
      category: cat ? cat.name : p.category
    };
  });

  return { products: productsWithCategoryName as any, total };
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!USE_MOCK && API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Failed to fetch product details");
    return response.json();
  }

  await new Promise((resolve) => setTimeout(resolve, 150));
  const storedProducts = getLocalStorage<Product[]>("nutriphar_products_v4", INITIAL_PRODUCTS as any);
  const product = storedProducts.find((p) => p.id === id);
  return product || null;
}

export async function getNewsArticles(): Promise<any[]> {
  if (!USE_MOCK && API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/news`);
    if (!response.ok) throw new Error("Failed to fetch news articles");
    return response.json();
  }

  await new Promise((resolve) => setTimeout(resolve, 200));
  const storedNews = getLocalStorage<any[]>("nutriphar_news", DEFAULT_NEWS);
  return storedNews;
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  if (!USE_MOCK && API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/news/${slug}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Failed to fetch news article detail");
    return response.json();
  }

  await new Promise((resolve) => setTimeout(resolve, 100));
  const articles = await getNewsArticles();
  return articles.find((art) => art.slug.endsWith(slug)) || null;
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
        image: "/images/herobackground1.jpg",
      },
      {
        year: "2020",
        title: "Chuẩn Hóa Quốc Tế",
        description: "Nhà máy sản xuất chính thức đi vào hoạt động công suất cao, xuất sắc đạt chứng nhận an toàn thực phẩm ISO 22000 & HACCP quốc tế.",
        image: "/images/quytrinhsanxuat.jpg",
      },
      {
        year: "2022",
        title: "Vươn Tầm Quốc Gia",
        description: "Ra mắt dòng sản phẩm yến chưng sẵn cao cấp kết hợp dược liệu quý, vinh dự lọt Top các thương hiệu yến sào được tin dùng hàng đầu.",
        image: "/images/vecongty.jpg",
      },
      {
        year: "2025",
        title: "Đổi Mới & Xuất Khẩu",
        description: "Ứng dụng thành công công nghệ sấy thăng hoa giữ trọn hoạt tính sinh học, chính thức xuất khẩu sản phẩm sang thị trường Đông Nam Á.",
        image: "/images/khanhhoa-sea.jpg",
      },
    ],
    certifications: [
      {
        title: "Đạt Chuẩn GMP",
        subtitle: "Thực hành sản xuất tốt",
        description: "Hệ thống nhà máy vận hành đồng bộ theo tiêu chuẩn y tế quốc tế khắt khe.",
        image: "/images/cert_gmp.png",
      },
      {
        title: "Chứng Chỉ ISO 22000",
        subtitle: "An toàn thực phẩm toàn cầu",
        description: "Hệ thống quản lý chất lượng đạt tiêu chuẩn châu Âu nghiêm ngặt.",
        image: "/images/cert_iso.png",
      },
      {
        title: "Tiêu Chuẩn HACCP",
        subtitle: "Kiểm soát mối nguy sinh học",
        description: "Cam kết ngăn ngừa mọi rủi ro vệ sinh trong suốt dây chuyền chế biến.",
        image: "/images/cert_haccp.png",
      },
      {
        title: "Cam Kết 100% Yến Thật",
        subtitle: "Bảo hiểm chất lượng",
        description: "Cam kết bồi hoàn giá trị nếu phát hiện pha trộn tạp chất hoặc chất độn.",
        image: "/images/cert_pure.png",
      },
    ],
    teamMembers: [
      {
        name: "Dược Sĩ Nguyễn Văn A",
        role: "Trưởng phòng Nghiên cứu & Phát triển (R&D)",
        experience: "15+ năm kinh nghiệm nghiên cứu thảo dược",
        bio: "Mỗi công thức yến sào kết hợp dược liệu đều được tôi và đội ngũ tối ưu hóa tỷ lệ sinh học để cơ thể hấp thu tối đa dinh dưỡng quý báu.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
      },
      {
        name: "Bà Trần Thị B",
        role: "Sáng lập viên & Tổng Giám đốc (CEO)",
        experience: "Người mang khát vọng nâng tầm yến sào Việt",
        bio: "Nutriphar không chỉ bán sản phẩm chăm sóc sức khỏe, chúng tôi trao gửi giải pháp sức khỏe bền vững đi từ cái Tâm và uy tín hàng đầu.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      },
      {
        name: "Dược Sĩ Lê Hoàng C",
        role: "Giám đốc Kiểm soát Chất lượng (QA/QC)",
        experience: "Thành viên ban kiểm định chất lượng y tế",
        bio: "Từng lô sản phẩm xuất xưởng đều phải vượt qua 3 tầng kiểm định vi sinh lý hóa khắt khe để đảm bảo sự an tâm tuyệt đối cho khách hàng.",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
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
  const { loginSchema } = await import("./user.service");
  loginSchema.parse({ email, password });

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
  const { loginSchema } = await import("./user.service");
  loginSchema.parse({ email, password });

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
