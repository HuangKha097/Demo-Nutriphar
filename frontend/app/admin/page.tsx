'use client';

import { Package, Newspaper, Users, TrendingUp, ArrowUpRight, Activity } from 'lucide-react';
import { useProducts } from '@/hooks/use-products-query';
import { useNews } from '@/hooks/use-news-query';
import { useUsers } from '@/hooks/use-users-query';

export default function Dashboard() {
  const { data: productsData } = useProducts({ limit: 1 });
  const { data: newsData } = useNews({ limit: 1 });
  const { data: usersData } = useUsers({ limit: 1 });

  const totalProducts = productsData?.total ?? 8;
  const totalNews = newsData?.total ?? 3;
  const totalUsers = usersData?.total ?? 3;

  return (
    <div className="space-y-10 text-foreground py-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#D4AF37] font-body">Nutriphar CMS</span>
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#1A2F6B] font-display">Tổng quan hệ thống</h2>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng sản phẩm"
          value={totalProducts}
          icon={Package}
          iconBg="bg-[#1A2F6B]"
          change="+2 sản phẩm mới"
        />
        <StatCard
          title="Bài viết tin tức"
          value={totalNews}
          icon={Newspaper}
          iconBg="bg-[#D4AF37]"
          change="Cập nhật hàng tuần"
        />
        <StatCard
          title="Người dùng"
          value={totalUsers}
          icon={Users}
          iconBg="bg-[#8C6A00]"
          change="3 tài khoản quản trị"
        />
        <StatCard
          title="Truy cập hôm nay"
          value="1,234"
          icon={TrendingUp}
          iconBg="bg-[#A4161A]"
          change="+15% so với hôm qua"
        />
      </div>

      {/* Main Grid: Graph and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-stretch">
        {/* Sales Statistics Chart */}
        <div className="lg:col-span-6 bg-[#E5E5E5]/25 border border-[#E5E5E5]/40 p-2 rounded-[2rem] shadow-xs hover:shadow-sm transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]/60 mb-6">
                <div className="space-y-1">
                  <h3 className="font-display font-semibold text-[18px] text-[#1A2F6B]">Thống kê doanh thu</h3>
                  <p className="text-[12px] text-muted-foreground font-body">Chu kỳ hiệu suất 7 ngày qua</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% tuần này
                  </span>
                </div>
              </div>

              <div className="h-60 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-gradient-premium" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1A2F6B" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#1A2F6B" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="35" y1="30" x2="480" y2="30" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="35" y1="75" x2="480" y2="75" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="35" y1="120" x2="480" y2="120" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="35" y1="165" x2="480" y2="165" stroke="#E2E8F0" strokeWidth="1.5" />
                  
                  {/* Area under the curve */}
                  <path
                    d="M 35 165 L 35 120 Q 75 90 105 110 T 180 70 T 255 100 T 330 50 T 405 60 T 480 40 L 480 165 Z"
                    fill="url(#chart-gradient-premium)"
                  />
                  
                  {/* Line path */}
                  <path
                    d="M 35 120 Q 75 90 105 110 T 180 70 T 255 100 T 330 50 T 405 60 T 480 40"
                    fill="none"
                    stroke="#1A2F6B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  
                  {/* Dots on peak values */}
                  <circle cx="180" cy="70" r="5" fill="#D4AF37" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="330" cy="50" r="5" fill="#D4AF37" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="480" cy="40" r="5" fill="#D4AF37" stroke="#ffffff" strokeWidth="2" />
                  
                  {/* X Axis Labels */}
                  <text x="35" y="188" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Mulish">T2</text>
                  <text x="105" y="188" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Mulish">T3</text>
                  <text x="180" y="188" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Mulish">T4</text>
                  <text x="255" y="188" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Mulish">T5</text>
                  <text x="330" y="188" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Mulish">T6</text>
                  <text x="405" y="188" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Mulish">T7</text>
                  <text x="480" y="188" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Mulish">CN</text>
  
                  {/* Y Axis Labels */}
                  <text x="25" y="34" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="end" fontFamily="Mulish">100Tr</text>
                  <text x="25" y="79" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="end" fontFamily="Mulish">50Tr</text>
                  <text x="25" y="124" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="end" fontFamily="Mulish">10Tr</text>
                  <text x="25" y="169" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="end" fontFamily="Mulish">0</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-4 bg-[#E5E5E5]/25 border border-[#E5E5E5]/40 p-2 rounded-[2rem] shadow-xs hover:shadow-sm transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]/60 mb-6">
                <div className="space-y-1 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="font-display font-semibold text-[18px] text-[#1A2F6B]">Nhật ký hệ thống</h3>
                </div>
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider font-body">Mới nhất</span>
              </div>
              <ul className="space-y-5">
                <ActivityItem
                  color="bg-emerald-500"
                  user="admin@nutriphar.vn"
                  action="đăng nhập hệ thống quản trị"
                  time="5 phút trước"
                />
                <ActivityItem
                  color="bg-[#1A2F6B]"
                  user="Sâm Xắt Lát"
                  action="được cập nhật đường dẫn hình ảnh"
                  time="12 phút trước"
                />
                <ActivityItem
                  color="bg-[#D4AF37]"
                  user="Yến Sào Nutriphar"
                  action="đạt chứng nhận ISO 22000"
                  time="1 giờ trước"
                />
                <ActivityItem
                  color="bg-[#A4161A]"
                  user="Quản trị viên"
                  action="xóa một bình luận trùng lặp"
                  time="3 giờ trước"
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  iconBg,
  change,
}: {
  title: string;
  value: string | number;
  icon: any;
  iconBg: string;
  change: string;
}) {
  return (
    <div className="bg-[#E5E5E5]/25 border border-[#E5E5E5]/40 p-2 rounded-[2rem] shadow-2xs hover:shadow-md transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 group">
      <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-muted-foreground font-body">{title}</span>
          <div className={`w-9 h-9 rounded-full ${iconBg} text-white flex items-center justify-center shadow-xs transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="text-3xl font-semibold tracking-tight text-[#1A2F6B] font-display">{value}</div>
          <div className="text-[12px] text-muted-foreground font-body leading-none">{change}</div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ color, user, action, time }: { color: string; user: string; action: string; time: string }) {
  return (
    <li className="flex items-start gap-3.5 group">
      <div className={`w-2.5 h-2.5 rounded-full ${color} mt-1.5 shrink-0 group-hover:scale-125 transition-transform duration-300`} />
      <div className="flex flex-col gap-0.5">
        <span className="text-[13px] leading-relaxed text-[#4A4A4A] font-body">
          <strong className="text-primary font-medium">{user}</strong> {action}
        </span>
        <span className="text-[11px] text-gray-400 font-body">{time}</span>
      </div>
    </li>
  );
}
