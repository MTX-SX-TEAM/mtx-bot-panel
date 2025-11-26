import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Send, Trash2, Menu, X } from "lucide-react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [messages, setMessages] = useState<Array<{ text: string; type: "command" | "response" | "system" | "error" }>>([]);
  const [commandInput, setCommandInput] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
      setError("");
      setUsername("");
      setPassword("");
      addMessage("تم تسجيل الدخول بنجاح", "system");
    } else {
      setError("يرجى إدخال اسم المستخدم وكلمة المرور");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMessages([]);
    setCommandInput("");
    setActiveTab("dashboard");
  };

  const addMessage = (text: string, type: "command" | "response" | "system" | "error") => {
    setMessages((prev) => [...prev, { text, type }]);
  };

  const handleSendCommand = () => {
    if (!commandInput.trim()) return;

    addMessage(commandInput, "command");
    const command = commandInput.toLowerCase();

    let response = "";
    if (command === "/help") {
      response = "الأوامر المتاحة:\n/help - عرض المساعدة\n/status - حالة البوت\n/stats - الإحصائيات\n/clear - مسح المحادثة";
    } else if (command === "/status") {
      response = "البوت يعمل بشكل طبيعي ✅";
    } else if (command === "/stats") {
      response = "عدد المستخدمين: 1,234\nعدد الأوامر: 5,678\nوقت التشغيل: 45 يوم";
    } else if (command === "/clear") {
      setMessages([]);
      setCommandInput("");
      return;
    } else {
      response = "أمر غير معروف. اكتب /help للمساعدة";
    }

    setTimeout(() => {
      addMessage(response, "response");
    }, 200);

    setCommandInput("");
  };

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          backgroundImage: "url('/mtx-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        {/* Login Form */}
        <div className="relative z-10 w-full max-w-md">
          <Card className="border-2 border-red-500 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl">
            <div className="p-8">
              {/* Logo */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">
                  MTX
                </h1>
                <p className="text-sm text-blue-300">لوحة التحكم والمحادثة</p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="text-right">
                  <label className="block text-sm text-blue-300 mb-2">اسم المستخدم</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-white focus:border-red-500 focus:outline-none transition"
                    placeholder="أدخل اسم المستخدم"
                  />
                </div>

                <div className="text-right">
                  <label className="block text-sm text-blue-300 mb-2">كلمة المرور</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-white focus:border-red-500 focus:outline-none transition"
                    placeholder="أدخل كلمة المرور"
                  />
                </div>

                {error && <div className="text-red-400 text-sm text-center">{error}</div>}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                >
                  تسجيل الدخول
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="fixed inset-0 w-full h-full object-cover opacity-10 -z-10"
      >
        <source src="/mtx-bg.mp4" type="video/mp4" />
      </video>

      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">MTX SX TEAM Bot</h1>
            <p className="text-sm opacity-90">لوحة التحكم والمحادثة</p>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-red-700 rounded-lg transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="hidden md:flex items-center gap-2 text-white border-white hover:bg-red-700"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-800 p-2 rounded-lg">
          {["dashboard", "commands", "chat", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
              }}
              className={`px-6 py-3 rounded-lg font-bold transition ${
                activeTab === tab
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {tab === "dashboard" && "لوحة التحكم"}
              {tab === "commands" && "الأوامر"}
              {tab === "chat" && "المحادثة"}
              {tab === "settings" && "الإعدادات"}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "المستخدمون", value: "1,234", change: "+12%", color: "from-blue-600 to-blue-700" },
                { label: "الأوامر المنفذة", value: "5,678", change: "+23%", color: "from-green-600 to-green-700" },
                { label: "وقت التشغيل", value: "45 يوم", change: "مستقر", color: "from-purple-600 to-purple-700" },
                { label: "معدل الخطأ", value: "0.2%", change: "-5%", color: "from-orange-600 to-orange-700" },
              ].map((stat, i) => (
                <Card key={i} className={`bg-gradient-to-br ${stat.color} border-0 p-6 hover:scale-105 transition`}>
                  <p className="text-sm opacity-80 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className={`text-xs ${stat.change.includes("-") ? "text-green-300" : "text-blue-300"}`}>
                    {stat.change}
                  </p>
                </Card>
              ))}
            </div>

            {/* Activity Section */}
            <Card className="bg-slate-800 border-slate-700 p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-red-500 pb-3">النشاط الأخير</h2>
              <div className="space-y-3">
                {[
                  "تم تنفيذ الأمر /broadcast بواسطة Admin",
                  "انضم 5 مستخدمين جدد",
                  "تم إصلاح خطأ في نظام الرسائل",
                  "تم تحديث قاعدة البيانات",
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg border-r-4 border-red-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">{activity}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Commands Tab */}
        {activeTab === "commands" && (
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700 p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-red-500 pb-3">الأوامر المتاحة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "/broadcast", desc: "إرسال رسالة جماعية" },
                  { name: "/ban", desc: "حظر مستخدم" },
                  { name: "/unban", desc: "إلغاء حظر مستخدم" },
                  { name: "/mute", desc: "كتم صوت مستخدم" },
                  { name: "/unmute", desc: "إلغاء كتم الصوت" },
                  { name: "/warn", desc: "تحذير مستخدم" },
                ].map((cmd, i) => (
                  <div
                    key={i}
                    className="bg-slate-700 p-4 rounded-lg border-2 border-slate-600 hover:border-red-500 cursor-pointer transition"
                  >
                    <p className="font-bold text-red-400">{cmd.name}</p>
                    <p className="text-sm text-gray-300">{cmd.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === "chat" && (
          <Card className="bg-slate-800 border-slate-700 p-6 flex flex-col h-[600px]">
            <h2 className="text-xl font-bold mb-4 border-b border-red-500 pb-3">المحادثة</h2>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 bg-slate-900 p-4 rounded-lg">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>لا توجد رسائل. اكتب أمرًا للبدء</p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg ${
                      msg.type === "command"
                        ? "bg-blue-900 text-blue-100 text-right"
                        : msg.type === "error"
                          ? "bg-red-900 text-red-100"
                          : msg.type === "system"
                            ? "bg-green-900 text-green-100 text-center"
                            : "bg-slate-700 text-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendCommand()}
                placeholder="اكتب أمرًا... (اكتب /help للمساعدة)"
                className="flex-1 px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
              />
              <Button
                onClick={handleSendCommand}
                className="bg-red-500 hover:bg-red-600 text-white px-6"
              >
                <Send size={18} />
              </Button>
              <Button
                onClick={() => {
                  setMessages([]);
                  addMessage("تم مسح المحادثة", "system");
                }}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-900"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <Card className="bg-slate-800 border-slate-700 p-6">
            <h2 className="text-xl font-bold mb-4 border-b border-red-500 pb-3">الإعدادات</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <span>الإشعارات</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <span>الوضع الداكن</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <span>تسجيل الأنشطة</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              {mobileMenuOpen && (
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white mt-6"
                >
                  <LogOut size={18} className="mr-2" />
                  تسجيل الخروج
                </Button>
              )}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
