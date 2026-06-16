export interface SharedProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  category: string;
  priceVal: number;
  ingredients: string;
  usage: string;
  specifications: Record<string, string>;
  benefits: string[];
  gallery: string[];
}

export const sharedProducts: SharedProduct[] = [
  {
    id: "1",
    name: "Sữa Bột Dinh Dưỡng SureGold Cho Người Cao Tuổi",
    description: "Sữa bột cao cấp cung cấp dinh dưỡng toàn diện, hỗ trợ tim mạch và phục hồi sức khỏe cho người lớn tuổi.",
    price: "650.000đ",
    originalPrice: "720.000đ",
    image: "/images/Ve-Yen-Thi-Web.png",
    badge: "Bán chạy",
    category: "Sản phẩm cho người cao tuổi",
    rating: 5,
    reviewCount: 128,
    priceVal: 650000,
    ingredients: "Sữa bột, Protein thực vật, MUFA, PUFA, Choline, Canxi, Vitamin D3, FOS/Inulin.",
    usage: "Pha 4 muỗng gạt ngang với 200ml nước ấm. Uống 2 ly mỗi ngày để bổ sung dưỡng chất.",
    specifications: {
      "Xuất xứ": "Việt Nam",
      "Khối lượng": "850g",
      "Độ tuổi": "Người trên 50 tuổi",
      "Hạn sử dụng": "24 tháng"
    },
    benefits: [
      "Bảo vệ hệ tim mạch, kiểm soát mỡ máu.",
      "Cải thiện trí nhớ, giúp tinh thần minh mẫn.",
      "Phòng ngừa loãng xương, tăng cường độ chắc khỏe của xương khớp."
    ],
    gallery: ["/images/Ve-Yen-Thi-Web.png", "/images/quytrinhsanxuat.jpg"]
  },
  {
    id: "2",
    name: "Yến Chưng Nhân Sâm Thượng Hạng",
    description: "Yến chưng sẵn kết hợp nhân sâm Hàn Quốc giúp đại bổ nguyên khí, phù hợp cho người già suy nhược.",
    price: "850.000đ",
    originalPrice: "990.000đ",
    image: "/images/Nuoc-yen-sao-co-duong.png",
    badge: "Cao cấp",
    category: "Sản phẩm cho người cao tuổi",
    rating: 5,
    reviewCount: 45,
    priceVal: 850000,
    ingredients: "Yến sào thiên nhiên 25%, Nhân sâm Hàn Quốc, Nước tinh khiết, Đường phèn.",
    usage: "Dùng trực tiếp. Lắc đều trước khi uống. Nên dùng vào buổi sáng sớm.",
    specifications: {
      "Quy cách": "Hộp 6 hũ x 70ml",
      "Hạn sử dụng": "12 tháng",
      "Bảo quản": "Nhiệt độ thường hoặc ngăn mát tủ lạnh"
    },
    benefits: [
      "Phục hồi sinh lực nhanh chóng.",
      "Tăng cường hệ miễn dịch.",
      "Giúp ngủ sâu giấc, an thần."
    ],
    gallery: ["/images/Nuoc-yen-sao-co-duong.png", "/images/yensaohero.png"]
  },
  {
    id: "3",
    name: "Siro Yến Dinh Dưỡng Kid Cao Trí",
    description: "Giải pháp dinh dưỡng kích thích trẻ ăn ngon, tăng trưởng chiều cao và phát triển trí não.",
    price: "245.000đ",
    image: "/images/Ve-Yen-Thi-Web.png",
    badge: "Cho bé",
    category: "Sản phẩm cho trẻ em",
    rating: 4,
    reviewCount: 89,
    priceVal: 245000,
    ingredients: "Chiết xuất yến sào, Lysine, Canxi Nano, DHA, Vitamin nhóm B.",
    usage: "Trẻ từ 1-3 tuổi: 10ml/lần, 1 lần/ngày. Trẻ trên 3 tuổi: 10ml/lần, 2 lần/ngày.",
    specifications: {
      "Dung tích": "Chai 120ml",
      "Đối tượng": "Trẻ biếng ăn, còi xương, chậm lớn",
      "Hạn sử dụng": "36 tháng"
    },
    benefits: [
      "Kích thích vị giác, giúp bé ăn ngon miệng.",
      "Bổ sung Canxi Nano giúp phát triển chiều cao vượt trội.",
      "Tăng sức đề kháng tự nhiên cho trẻ."
    ],
    gallery: ["/images/Ve-Yen-Thi-Web.png", "/images/vecongty.jpg"]
  },
  {
    id: "4",
    name: "Kẹo Dẻo Vitamin Tổng Hợp Gummy",
    description: "Kẹo dẻo hương trái cây thơm ngon bổ sung đa vitamin, giúp bé khỏe mạnh mỗi ngày.",
    price: "180.000đ",
    originalPrice: "210.000đ",
    image: "/images/yensao.png",
    category: "Sản phẩm cho trẻ em",
    rating: 5,
    reviewCount: 205,
    priceVal: 180000,
    ingredients: "Vitamin C, Vitamin E, Vitamin B6, B12, Kẽm, Biotin, Hương trái cây tự nhiên.",
    usage: "Dùng 2 viên mỗi ngày. Nhai kỹ trước khi nuốt.",
    specifications: {
      "Quy cách": "Lọ 60 viên",
      "Độ tuổi": "Trẻ trên 3 tuổi",
      "Xuất xứ": "Mỹ"
    },
    benefits: [
      "Bổ sung đầy đủ vitamin thiết yếu cho trẻ.",
      "Tăng cường thị lực và hệ miễn dịch.",
      "Hương vị trái cây dễ ăn, không chứa màu nhân tạo."
    ],
    gallery: ["/images/yensao.png", "/images/quytrinhsanxuat.jpg"]
  },
  {
    id: "5",
    name: "Sữa Tiểu Đường Glucare Gold",
    description: "Dinh dưỡng chuyên biệt dành cho người bị tiểu đường, giúp ổn định đường huyết.",
    price: "550.000đ",
    image: "/images/Ve-Yen-Thi-Web.png",
    badge: "Y tế",
    category: "Sản phẩm chăm sóc sức khoẻ",
    rating: 4,
    reviewCount: 67,
    priceVal: 550000,
    ingredients: "Hệ bột đường tiên tiến Palatinose, Isomalt, MUFA, PUFA, 28 loại vitamin và khoáng chất.",
    usage: "Pha 4 muỗng với 200ml nước ấm. Dùng thay thế bữa ăn phụ hoặc bổ sung cho chế độ ăn hàng ngày.",
    specifications: {
      "Khối lượng": "850g",
      "Chỉ số đường huyết (GI)": "Thấp",
      "Hạn sử dụng": "2 năm"
    },
    benefits: [
      "Kiểm soát đường huyết hiệu quả sau khi ăn.",
      "Tốt cho hệ tim mạch.",
      "Ngăn ngừa các biến chứng của bệnh tiểu đường."
    ],
    gallery: ["/images/Ve-Yen-Thi-Web.png", "/images/vecongty.jpg"]
  },
  {
    id: "6",
    name: "Viên Uống Bổ Khớp Glucosamine 1500mg",
    description: "Hỗ trợ duy trì sự khỏe mạnh của sụn khớp, giảm đau nhức xương khớp hiệu quả.",
    price: "790.000đ",
    originalPrice: "850.000đ",
    image: "/images/yensaohero.png",
    badge: "Hot",
    category: "Sản phẩm chăm sóc sức khoẻ",
    rating: 5,
    reviewCount: 154,
    priceVal: 790000,
    ingredients: "Glucosamine Sulfate 1500mg, Chondroitin, MSM, Hyaluronic Acid.",
    usage: "Uống 2 viên mỗi ngày sau bữa ăn.",
    specifications: {
      "Quy cách": "Hộp 100 viên",
      "Dạng bào chế": "Viên nang cứng",
      "Xuất xứ": "Nhật Bản"
    },
    benefits: [
      "Tái tạo và phục hồi sụn khớp bị tổn thương.",
      "Tăng cường dịch bôi trơn khớp, giúp vận động linh hoạt.",
      "Giảm nhanh các triệu chứng đau do viêm khớp, thoái hóa khớp."
    ],
    gallery: ["/images/yensaohero.png", "/images/quytrinhsanxuat.jpg"]
  },
  {
    id: "7",
    name: "Tổ Yến Tinh Chế Rút Lông Nguyên Tổ",
    description: "Sản phẩm yến sào thiên nhiên nguyên chất 100%, món quà sức khỏe quý giá cho gia đình.",
    price: "3.500.000đ",
    originalPrice: "4.200.000đ",
    image: "/images/yensao.png",
    category: "Sản phẩm thông dụng khác",
    rating: 5,
    reviewCount: 92,
    priceVal: 3500000,
    ingredients: "100% tổ yến thiên nhiên nguyên chất.",
    usage: "Ngâm nở 20 phút. Chưng cách thủy cùng đường phèn và táo đỏ trong 25 phút.",
    specifications: {
      "Khối lượng": "50g",
      "Loại yến": "Tinh chế rút lông khô",
      "Bảo quản": "Nơi khô thoáng, tránh ẩm"
    },
    benefits: [
      "Bồi bổ sức khỏe toàn diện cho mọi lứa tuổi.",
      "Cải thiện hệ hô hấp, làm đẹp da.",
      "Phục hồi nhanh chóng sau bệnh."
    ],
    gallery: ["/images/yensao.png", "/images/yensaohero.png"]
  },
  {
    id: "8",
    name: "Vitamin C Sủi Tăng Đề Kháng (Tuýp 20 viên)",
    description: "Viên sủi bổ sung Vitamin C giúp tăng sức đề kháng, giảm mệt mỏi, hương cam dễ uống.",
    price: "55.000đ",
    image: "/images/Nuoc-yen-sao-co-duong.png",
    category: "Sản phẩm thông dụng khác",
    rating: 4,
    reviewCount: 315,
    priceVal: 55000,
    ingredients: "Vitamin C 1000mg, Kẽm, Đồng, Hương cam tổng hợp.",
    usage: "Hòa tan 1 viên vào 200ml nước. Uống 1 viên mỗi ngày.",
    specifications: {
      "Quy cách": "Tuýp 20 viên",
      "Dạng bào chế": "Viên sủi bọt",
      "Hương vị": "Cam"
    },
    benefits: [
      "Tăng cường sức đề kháng chống lại bệnh cảm cúm thông thường.",
      "Kích thích sản sinh collagen làm đẹp da.",
      "Giúp cơ thể tràn đầy năng lượng, tỉnh táo tức thì."
    ],
    gallery: ["/images/Nuoc-yen-sao-co-duong.png", "/images/vecongty.jpg"]
  },
  {
    id: "9",
    name: "Máy Đo Huyết Áp Điện Tử Bắp Tay",
    description: "Thiết bị y tế theo dõi huyết áp tại nhà chính xác, dễ sử dụng cho mọi người.",
    price: "850.000đ",
    originalPrice: "990.000đ",
    image: "/images/vecongty.jpg",
    badge: "Bảo hành 2 năm",
    category: "Phụ kiện sản phẩm",
    rating: 5,
    reviewCount: 112,
    priceVal: 850000,
    ingredients: "Thiết bị điện tử đạt chuẩn y tế quốc tế CE, FDA.",
    usage: "Quấn vòng bít vào bắp tay, ấn nút Start và chờ kết quả sau 30 giây.",
    specifications: {
      "Thương hiệu": "NutriMed",
      "Loại máy": "Đo bắp tay tự động",
      "Bộ nhớ": "Lưu 60 kết quả đo",
      "Nguồn điện": "4 Pin AA hoặc Adapter"
    },
    benefits: [
      "Theo dõi huyết áp chính xác và tiện lợi ngay tại nhà.",
      "Cảnh báo nhịp tim bất thường và nguy cơ đột quỵ.",
      "Màn hình LCD lớn dễ đọc kết quả cho người cao tuổi."
    ],
    gallery: ["/images/vecongty.jpg", "/images/quytrinhsanxuat.jpg"]
  },
  {
    id: "10",
    name: "Hộp Quà Biếu Cao Cấp Nutriphar Đỏ",
    description: "Vỏ hộp quà tặng bằng da và gỗ cao cấp, thiết kế sang trọng để đựng các sản phẩm yến sào.",
    price: "200.000đ",
    image: "/images/vecongty.jpg",
    category: "Phụ kiện sản phẩm",
    rating: 4,
    reviewCount: 28,
    priceVal: 200000,
    ingredients: "Gỗ MDF chống ẩm, Da PU cao cấp, Lót nhung bên trong.",
    usage: "Sử dụng để đóng gói quà tặng các dịp Lễ, Tết.",
    specifications: {
      "Kích thước": "35x25x10 cm",
      "Màu sắc": "Đỏ đô sang trọng",
      "Phụ kiện đi kèm": "Túi giấy xách tay đồng bộ"
    },
    benefits: [
      "Nâng tầm đẳng cấp món quà tặng.",
      "Bảo quản sản phẩm bên trong an toàn.",
      "Thích hợp làm quà biếu đối tác, doanh nghiệp."
    ],
    gallery: ["/images/vecongty.jpg", "/images/yensaohero.png"]
  }
];
