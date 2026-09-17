import { useRoute } from "./router/useRoute.js";
import HomeView from "./components/HomeView.jsx";
import TextLabView from "./components/TextLabView.jsx";

// 路由表：把"网址里的路径"和"要显示的页面"对应起来。
// 4.3 把"在哪一页"记在内存里；这一版交给 useRoute，写到地址栏里——刷新不丢、能前进后退。
const ROUTES = {
  home: { path: "/", view: HomeView },
  textlab: { path: "/text-lab", view: TextLabView },
};

export default function App() {
  const { path, navigate } = useRoute();

  // 从地址栏的 path 反推出当前是哪个页面（键）；不认识的 path 一律回首页。
  const current = Object.keys(ROUTES).find((key) => ROUTES[key].path === path) || "home";
  const Page = ROUTES[current].view;

  // Nav 传进来的是 "home"/"textlab" 这种键，这里换成真正的网址路径再跳转。
  const go = (key) => navigate(ROUTES[key].path);

  return (
    <div className="app-shell">
      <div className="page-shell">
        <main className="page-content">
          <Page current={current} onNavigate={go} />
        </main>
      </div>
    </div>
  );
}
