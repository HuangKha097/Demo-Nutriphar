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
    name: "Yến Sào Khánh Hòa Thượng Hạng (100g)",
    description: "Tổ yến thiên nhiên nguyên tổ làm sạch cao cấp, khai thác tại vùng biển Khánh Hòa. Giàu dinh dưỡng, bồi bổ sức khỏe toàn diện.",
    price: "4.500.000đ",
    originalPrice: "5.200.000đ",
    image: "/images/yensao.png",
    badge: "Bán chạy",
    category: "Sản phẩm thông dụng khác",
    rating: 5,
    reviewCount: 48,
    priceVal: 4500000,
    ingredients: "100% Tổ yến thiên nhiên nguyên chất vùng biển đảo Khánh Hòa đã được làm sạch lông và tạp chất bằng phương pháp thủ công tỉ mỉ, giữ nguyên vẹn giá trị dinh dưỡng cao nhất.",
    usage: "Ngâm tổ yến vào nước ấm khoảng 20-30 phút cho nở đều. Vớt ra để ráo rồi chưng cách thủy cùng đường phèn, hạt sen, táo đỏ hoặc kỷ tử trong khoảng 25-30 phút ở lửa nhỏ. Dùng tốt nhất vào buổi sáng trước khi ăn hoặc buổi tối trước khi đi ngủ 30 phút.",
    specifications: {
      "Xuất xứ": "Khánh Hòa, Việt Nam",
      "Khối lượng tịnh": "100g",
      "Hạn sử dụng": "24 tháng kể từ ngày sản xuất",
      "Bảo quản": "Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp",
      "Tiêu chuẩn": "ISO 22000:2018, HACCP"
    },
    benefits: [
      "Bồi bổ sức khỏe, tăng cường hệ thống miễn dịch tự nhiên.",
      "Kích thích tiêu hóa, giúp ăn ngon miệng và hấp thu dinh dưỡng tốt hơn.",
      "Làm đẹp da, ngăn ngừa lão hóa nhờ chứa hàm lượng lớn collagen tự nhiên.",
      "Hỗ trợ phục hồi thể trạng nhanh chóng cho người bệnh và phụ nữ sau sinh."
    ],
    gallery: ["/images/yensao.png", "/images/yensaohero.png", "/images/vecongty.jpg"]
  },
  {
    id: "2",
    name: "Nước Yến Sào Đường Phèn Hũ Chưng Sẵn (70ml)",
    description: "Yến chưng đường phèn thanh mát tinh khiết. Hàm lượng yến thật 20%, giúp ăn ngon ngủ ngon, thích hợp sử dụng hàng ngày.",
    price: "299.000đ",
    originalPrice: "350.000đ",
    image: "/images/Nuoc-yen-sao-co-duong.png",
    badge: "Hot",
    category: "Sản phẩm thông dụng khác",
    rating: 5,
    reviewCount: 124,
    priceVal: 299000,
    ingredients: "Yến sào tươi nguyên chất (20%), nước tinh khiết, đường phèn Quảng Ngãi tự nhiên, chất ổn định dùng cho thực phẩm.",
    usage: "Lắc nhẹ trước khi uống. Ngon hơn khi uống lạnh. Nên dùng 1-2 hũ mỗi ngày vào buổi sáng khi bụng đói hoặc buổi tối trước khi đi ngủ để cơ thể hấp thu tối đa dưỡng chất.",
    specifications: {
      "Xuất xứ": "Nha Trang, Khánh Hòa",
      "Thể tích thực": "70ml/hũ (Hộp 6 hũ)",
      "Hạn sử dụng": "18 tháng kể từ ngày sản xuất",
      "Quy cách đóng gói": "Hộp quà tặng cao cấp 6 hũ",
      "Chứng nhận": "Đạt chuẩn an toàn thực phẩm quốc tế"
    },
    benefits: [
      "Bổ sung năng lượng tức thì, xua tan mệt mỏi.",
      "Thanh nhiệt cơ thể, cải thiện chất lượng giấc ngủ sâu và ngon hơn.",
      "Dưỡng nhan, cung cấp độ ẩm giúp làn da luôn căng bóng mịn màng.",
      "Tiện lợi sử dụng ngay mọi lúc mọi nơi mà không cần chế biến."
    ],
    gallery: ["/images/Nuoc-yen-sao-co-duong.png", "/images/yensaohero.png", "/images/quytrinhsanxuat.jpg"]
  },
  {
    id: "3",
    name: "Yến Chưng Nhân Sâm Cao Cấp (Hộp 6 Hũ)",
    description: "Sự kết hợp hoàn hảo giữa tổ yến thiên nhiên tinh khiết và nhân sâm Hàn Quốc thượng hạng giúp tăng cường sinh lực.",
    price: "580.000đ",
    originalPrice: "680.000đ",
    image: "/images/Nuoc-yen-sao-co-duong.png",
    badge: "Mới",
    category: "Sản phẩm cho người cao tuổi",
    rating: 4,
    reviewCount: 36,
    priceVal: 580000,
    ingredients: "Yến sào tươi đảo yến (20%), Nhân sâm Hàn Quốc 6 năm tuổi lát mỏng (5%), đường phèn thanh khiết, nước tinh khiết.",
    usage: "Dùng trực tiếp ngay sau khi mở nắp. Lắc đều trước khi sử dụng. Thích hợp cho người lớn tuổi, người cần phục hồi sức khỏe, người làm việc trí óc căng thẳng.",
    specifications: {
      "Xuất xứ": "Khánh Hòa, Việt Nam",
      "Quy cách": "Hộp 6 hũ x 70ml",
      "Hạn sử dụng": "12 tháng kể từ ngày sản xuất",
      "Thành phần chính": "Yến sào tươi + Nhân sâm Hàn Quốc",
      "Bảo quản": "Nhiệt độ thường hoặc ngăn mát tủ lạnh"
    },
    benefits: [
      "Đại bổ nguyên khí, tăng cường thể lực và trí lực.",
      "Cải thiện tuần hoàn máu, hỗ trợ sức khỏe tim mạch ổn định.",
      "Tăng sức đề kháng mạnh mẽ, đẩy lùi suy nhược cơ thể.",
      "Giảm stress, tăng cường khả năng tập trung và trí nhớ tốt hơn."
    ],
    gallery: ["/images/Nuoc-yen-sao-co-duong.png", "/images/vecongty.jpg", "/images/quytrinhsanxuat.jpg"]
  },
  {
    id: "4",
    name: "Yến Chưng Đông Trùng Hạ Thảo (Hộp 6 Hũ)",
    description: "Yến sào kết hợp đông trùng hạ thảo bổ khí huyết, bồi bổ sức đề kháng cho người lớn tuổi hoặc người mới ốm dậy.",
    price: "599.000đ",
    image: "/images/Nuoc-yen-sao-co-duong.png",
    category: "Sản phẩm cho người cao tuổi",
    rating: 5,
    reviewCount: 52,
    priceVal: 599000,
    ingredients: "Yến sào tươi thiên nhiên Khánh Hòa (20%), Đông trùng hạ thảo sinh khối khô (2%), nước tinh khiết, đường phèn thanh ngọt nhẹ.",
    usage: "Lắc nhẹ hũ trước khi uống. Nên uống trước bữa ăn 30 phút hoặc trước khi đi ngủ. Có thể dùng ấm bằng cách ngâm hũ vào nước ấm trước khi sử dụng.",
    specifications: {
      "Thương hiệu": "Nutriphar",
      "Thể tích": "70ml x 6 hũ",
      "Hạn dùng": "18 tháng",
      "Đông trùng hạ thảo": "Đạt hàm lượng Cordycepin cao chuẩn hóa",
      "Công nghệ": "Tiệt trùng chưng khép kín tiên tiến"
    },
    benefits: [
      "Bổ phổi, ích thận, hỗ trợ cải thiện hệ hô hấp.",
      "Kháng viêm tự nhiên, phòng ngừa các tác nhân gây bệnh từ môi trường.",
      "Chống oxy hóa mạnh mẽ, làm chậm các dấu hiệu lão hóa cơ thể.",
      "Bồi bổ sức khỏe sâu cho người suy nhược cơ thể hoặc mới trải qua phẫu thuật."
    ],
    gallery: ["/images/Nuoc-yen-sao-co-duong.png", "/images/vecongty.jpg", "/images/quytrinhsanxuat.jpg"]
  },
  {
    id: "5",
    name: "Nước Yến Dinh Dưỡng Kid Sào Cho Bé",
    description: "Nước yến dinh dưỡng cho trẻ nhỏ, bổ sung Canxi và Lysine kích thích tiêu hóa ăn ngon, hỗ trợ tăng chiều cao.",
    price: "249.000đ",
    originalPrice: "299.000đ",
    image: "/images/Nuoc-yen-sao-co-duong.png",
    badge: "Cho Bé",
    category: "Sản phẩm cho trẻ em",
    rating: 5,
    reviewCount: 89,
    priceVal: 249000,
    ingredients: "Nước yến sào (15%), Canxi lactate, L-Lysine giúp tăng cường hấp thu dưỡng chất, đường phèn tự nhiên vừa đủ cho khẩu vị của bé.",
    usage: "Cho bé uống trực tiếp 1 hũ mỗi ngày. Phù hợp cho trẻ từ 1 tuổi trở lên, đặc biệt là trẻ biếng ăn, còi xương, chậm lớn hoặc suy dinh dưỡng.",
    specifications: {
      "Độ tuổi sử dụng": "Trẻ em từ 1 tuổi trở lên",
      "Dung tích hũ": "70ml (Hộp quà gồm 6 hũ)",
      "Bổ sung vi chất": "Canxi + L-Lysine giúp tăng trưởng",
      "Hạn dùng": "18 tháng kể từ NSX",
      "Tiêu chuẩn sản xuất": "Nhà máy đạt chuẩn GMP dược phẩm"
    },
    benefits: [
      "Bổ sung Canxi giúp phát triển hệ xương khớp và tăng chiều cao tối ưu.",
      "Lysine kích thích vị giác của trẻ, cải thiện rõ rệt chứng biếng ăn.",
      "Tăng cường đề kháng, hạn chế các bệnh vặt về đường hô hấp ở trẻ nhỏ.",
      "Bổ sung các axit amin thiết yếu cho não bộ hoạt động linh hoạt, nhạy bén."
    ],
    gallery: ["/images/Nuoc-yen-sao-co-duong.png", "/images/vecongty.jpg", "/images/quytrinhsanxuat.jpg"]
  },
  {
    id: "6",
    name: "Hộp Quà Yến Sào Premium Luxury",
    description: "Bộ quà tặng cao cấp gồm yến nguyên tổ và nước yến chưng sẵn thảo dược. Thiết kế sang trọng quý phái, món quà ý nghĩa trao gửi sức khỏe.",
    price: "2.800.000đ",
    originalPrice: "3.200.000đ",
    image: "/images/yensao.png",
    badge: "Quà Tặng",
    category: "Sản phẩm thông dụng khác",
    rating: 5,
    reviewCount: 22,
    priceVal: 2800000,
    ingredients: "Combo quà tặng đặc biệt bao gồm: 50g Tổ yến sào Khánh Hòa làm sạch thượng hạng + 6 hũ nước yến tươi chưng sẵn nhân sâm/đông trùng hạ thảo + 1 bộ nhíp làm sạch chuyên dụng.",
    usage: "Thích hợp làm quà biếu đối tác doanh nghiệp, khách hàng VIP hoặc ông bà cha mẹ trong các dịp lễ Tết, sự kiện trọng đại. Hướng dẫn sử dụng chi tiết đính kèm trong hộp.",
    specifications: {
      "Chất liệu hộp": "Hộp gỗ bọc da cao cấp kèm túi giấy sang trọng",
      "Thành phần bộ quà": "Tổ yến khô + Nước yến chưng sẵn thượng hạng",
      "Đối tượng tặng": "Người thân, cấp trên, đối tác quan trọng",
      "Kích thước hộp": "35cm x 28cm x 10cm",
      "Hạn sử dụng": "Xem chi tiết trên từng sản phẩm bên trong"
    },
    benefits: [
      "Bộ quà tặng đẳng cấp nâng tầm mối quan hệ và uy tín người tặng.",
      "Sự kết hợp đa dạng sản phẩm yến đáp ứng mọi nhu cầu bồi bổ sức khỏe.",
      "Đóng gói vô cùng tinh xảo, bắt mắt, mang thông điệp thịnh vượng và trường thọ.",
      "Cam kết chất lượng yến đảo thật 100% đầy đủ giấy kiểm định an toàn."
    ],
    gallery: ["/images/yensao.png", "/images/yensaohero.png", "/images/Nuoc-yen-sao-co-duong.png"]
  },
  {
    id: "7",
    name: "Yến Hũ Chưng Sẵn Không Đường (70ml)",
    description: "Yến sào nguyên chất tinh khiết 100%, không đường tốt cho người tiểu đường, cao huyết áp hoặc người ăn kiêng.",
    price: "289.000đ",
    image: "/images/Nuoc-yen-sao-co-duong.png",
    category: "Sản phẩm người chăm sóc sức khoẻ (kiêng đường, xương khớp...)",
    rating: 4,
    reviewCount: 15,
    priceVal: 289000,
    ingredients: "Yến sào tươi nguyên sợi (20%), nước tinh khiết tiệt trùng, cỏ ngọt tự nhiên stevia tạo độ ngọt nhẹ dịu mà không chứa calo đường.",
    usage: "Dùng lạnh ngon nhất. Uống trực tiếp hàng ngày từ 1-2 hũ. Rất tốt cho người ăn kiêng keto, low-carb, bệnh nhân tiểu đường hoặc người béo phì.",
    specifications: {
      "Hàm lượng yến": "20% yến sào sợi tươi thật",
      "Chất tạo ngọt": "Cỏ ngọt Stevia (Không đường mía)",
      "Dung tích": "70ml/hũ",
      "Bảo quản": "Ngăn mát tủ lạnh sau khi mở nắp",
      "Hạn dùng": "18 tháng từ ngày sản xuất"
    },
    benefits: [
      "Cung cấp 18 loại axit amin quý giá mà hoàn toàn không làm tăng đường huyết.",
      "Kiểm soát cân nặng và lượng cholesterol có hại hiệu quả.",
      "Bổ sung dinh dưỡng tối ưu cho người già có bệnh lý nền tim mạch.",
      "Hương vị cỏ ngọt tự nhiên thanh tao, dễ uống, không gắt họng."
    ],
    gallery: ["/images/Nuoc-yen-sao-co-duong.png", "/images/vecongty.jpg", "/images/quytrinhsanxuat.jpg"]
  },
  {
    id: "8",
    name: "Yến Sào Khánh Hòa Loại 2 (50g)",
    description: "Tổ yến đảo thiên nhiên Khánh Hòa nguyên tổ sơ chế sạch sẽ, thơm ngon giàu dưỡng chất với mức giá tiếp cận.",
    price: "2.100.000đ",
    originalPrice: "2.400.000đ",
    image: "/images/yensao.png",
    category: "Sản phẩm thông dụng khác",
    rating: 4,
    reviewCount: 19,
    priceVal: 2100000,
    ingredients: "100% Tổ yến đảo Khánh Hòa tự nhiên dạng tổ vừa hoặc tổ góc bể nhẹ, được làm sạch tạp chất thủ công đạt chuẩn vệ sinh thực phẩm quốc gia.",
    usage: "Ngâm nở trong nước sạch khoảng 20 phút. Vớt ra chưng cùng đường phèn thanh mát và vài lát gừng tươi giảm tính hàn. Chưng trong vòng 20-25 phút là sử dụng được ngay.",
    specifications: {
      "Trọng lượng sản phẩm": "50g",
      "Hình dáng tổ": "Tổ yến góc hoặc tổ yến cỡ vừa",
      "Nguồn gốc": "Khai thác trực tiếp các hang yến đảo Khánh Hòa",
      "Hạn dùng": "2 năm ở nhiệt độ mát thoáng",
      "Quy trình sơ chế": "Làm sạch thủ công khép kín hoàn toàn"
    },
    benefits: [
      "Cung cấp lượng dinh dưỡng dồi dào tương tự loại thượng hạng với mức giá tối ưu hơn.",
      "Phù hợp cho nhu cầu bồi bổ đều đặn hàng tuần cho cả gia đình.",
      "Giúp tăng trí lực ở trẻ em trong mùa thi cử và nâng cao đề kháng người già.",
      "Sợi yến sau chưng giữ được độ dai mềm đặc trưng, mùi thơm tự nhiên tanh nhẹ."
    ],
    gallery: ["/images/yensao.png", "/images/yensaohero.png", "/images/vecongty.jpg"]
  }
];
