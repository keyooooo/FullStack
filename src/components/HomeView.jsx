// 个人主页。这一节把它从"纯展示"改成了"会去后端取数据"。
// 打开页面时先用 site.js 的 home 打底，再用 useEffect 去 GET /api/profile，
// 拿到后端数据后 setData 更新界面。
// 请求失败时（比如后端没跑、跨源被拦）就保持打底数据、把错误打到控制台，页面不至于崩。
// 注意：后端地址从 .env.local 的 VITE_API_BASE_URL 读；没配时退回 localhost:8000。
import { useEffect, useState } from "react";
import Nav from "./Nav.jsx";
import PageHeading from "./PageHeading.jsx";
import AnimatedCardGrid from "./AnimatedCardGrid.jsx";
import { home } from "../data/site.js";

const API = import.meta.env.VITE_API_BASE_URL;

export default function HomeView({ current, onNavigate }) {
  const [data, setData] = useState(home);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(`/api/profile`);
        if (!res.ok) {
          throw new Error(`主页数据加载失败：${res.status}`);
        }
        setData(await res.json());
      } catch (error) {
        console.error(error);
      }
    }

    loadProfile();
  }, []);

  return (
    <AnimatedCardGrid className="dashboard-grid">
      <article className="hero-stage panel-full">
        <Nav current={current} onNavigate={onNavigate} />
        <PageHeading title={data.heroTitle} subtitle={data.heroSubtitle} />
      </article>

      <article className="panel panel-full featured-work-panel card">
        <p className="section-kicker">{data.featuredWork.kicker}</p>
        <p className="featured-title">{data.featuredWork.title}</p>
        <p className="featured-copy">{data.featuredWork.copy}</p>
        <a
          className="featured-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("textlab");
          }}
        >
          <span className="featured-link-label">
            {data.featuredWork.linkLabel}
          </span>
          <span className="arrow">›</span>
        </a>
      </article>

      <article className="panel panel-full identity-panel card">
        <div className="identity-item">
          <p className="section-kicker">座右铭</p>
          <p className="identity-value identity-quote">{data.identity.motto}</p>
        </div>
        <div className="identity-item">
          <p className="section-kicker">正在学习</p>
          <p className="identity-value">{data.identity.learning}</p>
        </div>
      </article>
    </AnimatedCardGrid>
  );
}
