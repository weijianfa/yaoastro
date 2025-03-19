import { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策 | 爻星阁",
  description: "爻星阁网站隐私政策和数据保护声明",
};

export default function PrivacyPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-fortune-red sm:text-4xl md:text-5xl">隐私政策</h1>
          <p className="text-gray-500 md:text-xl">
            最后更新日期：{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">1. 引言</h2>
            <p className="text-gray-600">
              爻星阁（"我们"、"我们的"或"本网站"）尊重您的隐私，并致力于保护您的个人信息。本隐私政策描述了我们如何收集、使用、披露和保护您的信息。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. 我们收集的信息</h2>
            <p className="text-gray-600">
              我们可能收集以下类型的信息：
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>个人识别信息</strong>：包括姓名、电子邮件地址、电话号码、出生日期和时间（用于命理分析）。</li>
              <li><strong>账户信息</strong>：包括您的用户名、密码和账户偏好设置。</li>
              <li><strong>交易信息</strong>：包括您购买的服务、支付方式和账单地址。</li>
              <li><strong>使用数据</strong>：包括您如何使用我们的网站、您访问的页面和您的浏览行为。</li>
              <li><strong>设备信息</strong>：包括您的IP地址、浏览器类型、设备类型和操作系统。</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">3. 我们如何使用您的信息</h2>
            <p className="text-gray-600">
              我们使用您的信息用于以下目的：
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>提供和改进我们的服务</li>
              <li>处理您的交易和管理您的账户</li>
              <li>根据您的出生信息提供命理分析</li>
              <li>发送服务通知和更新</li>
              <li>回应您的询问和请求</li>
              <li>进行研究和分析，以改进用户体验</li>
              <li>保护我们的网站和用户免受欺诈和滥用</li>
              <li>遵守法律义务</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. 信息共享和披露</h2>
            <p className="text-gray-600">
              我们不会出售或出租您的个人信息给第三方。我们可能在以下情况下共享您的信息：
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>服务提供商</strong>：我们可能与帮助我们运营网站和提供服务的第三方服务提供商共享信息。</li>
              <li><strong>法律要求</strong>：如果法律要求或为了保护我们的权利，我们可能会披露您的信息。</li>
              <li><strong>业务转让</strong>：如果我们参与合并、收购或资产出售，您的信息可能会被转让。</li>
              <li><strong>征得同意</strong>：在您同意的情况下，我们可能会共享您的信息。</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">5. 数据安全</h2>
            <p className="text-gray-600">
              我们采取合理的安全措施来保护您的个人信息免受未经授权的访问、使用或披露。然而，没有任何互联网传输或电子存储方法是100%安全的。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">6. 您的权利</h2>
            <p className="text-gray-600">
              根据适用的数据保护法律，您可能拥有以下权利：
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>访问您的个人信息</li>
              <li>更正不准确的信息</li>
              <li>删除您的个人信息</li>
              <li>限制或反对处理您的信息</li>
              <li>数据可携带性</li>
              <li>撤回同意</li>
            </ul>
            <p className="text-gray-600">
              要行使这些权利，请通过下面提供的联系方式与我们联系。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">7. Cookie和类似技术</h2>
            <p className="text-gray-600">
              我们使用cookie和类似技术来收集和存储有关您如何使用我们网站的信息。您可以通过浏览器设置控制cookie的使用。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">8. 儿童隐私</h2>
            <p className="text-gray-600">
              我们的服务不面向16岁以下的儿童。我们不会故意收集16岁以下儿童的个人信息。如果您发现我们可能收集了16岁以下儿童的信息，请立即联系我们。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">9. 隐私政策的变更</h2>
            <p className="text-gray-600">
              我们可能会不时更新本隐私政策。我们将通过在此页面上发布新的隐私政策来通知您任何变更。建议您定期查看本隐私政策以了解任何变更。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">10. 联系我们</h2>
            <p className="text-gray-600">
              如果您对本隐私政策有任何疑问或顾虑，请通过以下方式联系我们：
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