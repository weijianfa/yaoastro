import { Metadata } from "next";

export const metadata: Metadata = {
  title: "使用条款 | 爻星阁",
  description: "爻星阁网站使用条款和服务协议",
};

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-fortune-red sm:text-4xl md:text-5xl">使用条款</h1>
          <p className="text-gray-500 md:text-xl">
            最后更新日期：{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">1. 接受条款</h2>
            <p className="text-gray-600">
              欢迎使用爻星阁网站。通过访问或使用我们的网站，您同意受这些条款和条件的约束。如果您不同意这些条款的任何部分，请不要使用我们的网站。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. 服务描述</h2>
            <p className="text-gray-600">
              爻星阁提供各种命理服务，包括但不限于八字命理、塔罗牌占卜、AI面相手相分析、心理测试和祈福许愿等。我们的服务仅供参考和娱乐目的，不应被视为专业建议。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">3. 用户账户</h2>
            <p className="text-gray-600">
              某些功能可能需要您创建账户。您负责维护您账户的保密性，并对与您账户相关的所有活动负责。您同意立即通知我们任何未经授权使用您账户的情况。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. 用户行为</h2>
            <p className="text-gray-600">
              您同意不会使用我们的服务进行任何非法或未经授权的目的。您不得以任何可能损害、禁用、过度负担或损害我们服务的方式使用我们的服务。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">5. 知识产权</h2>
            <p className="text-gray-600">
              网站上的所有内容，包括但不限于文本、图形、徽标、图标、图像、音频剪辑、数字下载和软件，均为爻星阁或其内容提供商的财产，受国际版权法保护。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">6. 免责声明</h2>
            <p className="text-gray-600">
              我们的服务按"原样"提供。我们不作任何明示或暗示的保证。我们不保证我们的网站将始终安全、无错误或及时可用。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">7. 条款变更</h2>
            <p className="text-gray-600">
              我们可能会不时更新这些条款。我们将通过在此页面上发布新条款来通知您任何变更。建议您定期查看这些条款以了解任何变更。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">8. 联系我们</h2>
            <p className="text-gray-600">
              如果您对这些条款有任何疑问，请通过以下方式联系我们：
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>电子邮件：contact@joy-fortune.com</li>
              <li>电话：400-123-4567</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 