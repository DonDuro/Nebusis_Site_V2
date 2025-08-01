import { Card, CardContent } from "@/components/ui/card";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-nebusis-primary to-gray-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nebusis<span className="text-yellow-400">®</span> Terms of Use
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            Version 2 - Effective Date: January 31, 2025
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Welcome to Nebusis®. These Terms of Use ("Terms") govern your access to and use of all websites, platforms, applications, products, and services provided by Nebusis Cloud Services, LLC ("Nebusis", "we", "us", or "our"), including but not limited to Nebusis® ComplianceOne, the Nebusis® Business Suite, and all affiliated applications.
                </p>
                
                <p className="text-lg text-gray-700 mb-12 leading-relaxed">
                  By accessing or using any Nebusis service, you agree to be bound by these Terms. If you do not agree, you must not access or use our services.
                </p>

                <div className="space-y-12">
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
                    <p className="text-gray-700 mb-4">By using any Nebusis service, you confirm that:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>You are at least 18 years old or have legal capacity in your jurisdiction.</li>
                      <li>You are authorized to bind the organization you represent.</li>
                      <li>You agree to comply with all applicable laws and these Terms.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Scope of Services</h2>
                    <p className="text-gray-700 mb-4">Nebusis provides access to a suite of cloud-based enterprise applications, including:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Nebusis® ComplianceOne (primary compliance and ISO automation platform)</li>
                      <li>Nebusis® ControlCore</li>
                      <li>Nebusis® CyberWatch</li>
                      <li>Nebusis® Engage</li>
                      <li>Nebusis® LegalFlow</li>
                      <li>Nebusis® SmartBooks</li>
                      <li>Nebusis® ZappFormZ</li>
                      <li>Nebusis® Greenhouse Wizard</li>
                      <li>Nebusis® ISO Management System Wizards</li>
                    </ul>
                    <p className="text-gray-700 mt-4">Access may be provided via web portals, APIs, integrations, mobile interfaces, or licensed distribution channels.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">3. License and Access</h2>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">3.1 License Grant</h3>
                    <p className="text-gray-700 mb-6">Subject to these Terms, Nebusis grants you a non-exclusive, non-transferable, and revocable license to access and use its services solely for your internal business purposes.</p>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">3.2 Restrictions</h3>
                    <p className="text-gray-700 mb-4">You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Reverse engineer, decompile, or disassemble any part of the software.</li>
                      <li>Resell, rent, or sublicense the platform without written authorization.</li>
                      <li>Use the services to compete with Nebusis or for illegal purposes.</li>
                      <li>Attempt unauthorized access to other systems or data.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">4. User Responsibilities</h2>
                    <p className="text-gray-700 mb-4">You agree to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Keep credentials secure and confidential.</li>
                      <li>Ensure that data submitted to Nebusis is accurate and lawful.</li>
                      <li>Use the services in compliance with all applicable laws and regulations.</li>
                      <li>Report suspected security breaches or policy violations promptly.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Intellectual Property</h2>
                    <p className="text-gray-700 mb-4">All software, interfaces, branding, and proprietary content are owned by Nebusis Cloud Services, LLC or its licensors. This includes all components of the Nebusis® Business Suite, such as:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                      <li>Nebusis® ComplianceOne</li>
                      <li>Nebusis® Management System Wizards</li>
                      <li>Nebusis® dashboards, templates, and automation engines</li>
                    </ul>
                    <p className="text-gray-700 mb-4">You may not copy, modify, create derivative works from, or exploit any part of the services without express written consent.</p>
                    <p className="text-gray-700">Feedback or suggestions you provide may be used by Nebusis freely and without obligation.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Third-Party Tools and Integrations</h2>
                    <p className="text-gray-700">Nebusis services may include integrations with third-party tools (e.g., AWS, Microsoft Azure, payment gateways). Use of such tools is governed by their respective terms. Nebusis is not responsible for third-party services, even if accessed via our platform.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Subscription Terms and Termination</h2>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">7.1 Subscription and Fees</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                      <li>Use of the platform may require a paid subscription. Payment terms, renewal conditions, and pricing will be defined in your commercial agreement.</li>
                      <li>Fees are non-refundable unless otherwise stated.</li>
                      <li>Late payments may incur penalties or service suspension.</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">7.2 Termination</h3>
                    <p className="text-gray-700 mb-4">We reserve the right to suspend or terminate access if:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                      <li>You breach these Terms.</li>
                      <li>You fail to pay applicable fees.</li>
                      <li>Continued use poses risk to security, performance, or compliance.</li>
                    </ul>
                    <p className="text-gray-700">Termination does not affect accrued rights or obligations. Upon termination, your access will be revoked, and your data may be deleted in accordance with our retention policy.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Confidentiality</h2>
                    <p className="text-gray-700 mb-4">All non-public information exchanged between you and Nebusis is considered confidential. Both parties agree not to disclose such information without written consent, except as required by law or regulation.</p>
                    <p className="text-gray-700">This obligation survives termination of your use of the services.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Data Ownership and Usage</h2>
                    <p className="text-gray-700 mb-4">You retain all rights to the data you input or upload ("Customer Data"). By using the services, you grant Nebusis a limited license to use Customer Data solely to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                      <li>Deliver contracted services</li>
                      <li>Comply with legal obligations</li>
                      <li>Improve system performance using aggregated, de-identified data</li>
                    </ul>
                    <p className="text-gray-700">Nebusis does not sell or disclose personal data to unauthorized third parties.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Availability and Modifications</h2>
                    <p className="text-gray-700 mb-4">We strive for high availability but cannot guarantee uninterrupted service. We may perform scheduled maintenance or implement updates at our discretion.</p>
                    <p className="text-gray-700">Service features may evolve, change, or be deprecated over time. Your continued use indicates acceptance of such changes.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Disclaimers</h2>
                    <p className="text-gray-700 mb-4">Nebusis services are provided "as is" and "as available", with no warranties of any kind. We do not guarantee:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                      <li>That the services will be error-free or always available.</li>
                      <li>That they will meet every user's specific needs.</li>
                      <li>That all data will be preserved or retrievable.</li>
                    </ul>
                    <p className="text-gray-700">You assume full responsibility for using the platform in accordance with your organization's requirements.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Limitation of Liability</h2>
                    <p className="text-gray-700 mb-4">To the fullest extent permitted by law:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                      <li>Nebusis is not liable for indirect, incidental, or consequential damages.</li>
                      <li>Our total liability shall not exceed the fees paid by you during the 12 months preceding the claim.</li>
                    </ul>
                    <p className="text-gray-700">These limitations apply regardless of the legal theory of liability.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">13. Indemnification</h2>
                    <p className="text-gray-700 mb-4">You agree to defend, indemnify, and hold harmless Nebusis, its officers, affiliates, employees, and agents from and against any third-party claims, damages, or liabilities arising from:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Your breach of these Terms</li>
                      <li>Your violation of applicable laws</li>
                      <li>Your misuse of the services</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">14. Governing Law and Dispute Resolution</h2>
                    <p className="text-gray-700 mb-4">These Terms are governed by the laws of the State of Florida, USA, without regard to conflict-of-law principles.</p>
                    <p className="text-gray-700 mb-4">Any dispute shall be resolved through:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                      <li>Good-faith negotiations</li>
                      <li>If unresolved, binding arbitration in Florida</li>
                      <li>Litigation only if arbitration is deemed unenforceable or waived</li>
                    </ul>
                    <p className="text-gray-700">Each party shall bear its own legal costs unless otherwise awarded by the arbitrator.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">15. Changes to These Terms</h2>
                    <p className="text-gray-700">We may update these Terms from time to time. Updates will be posted on our website with the effective date indicated. Continued use of Nebusis services constitutes your agreement to the revised Terms.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">16. Contact</h2>
                    <p className="text-gray-700">For any questions or legal inquiries related to these Terms, please use the Contact section at www.nebusis.com.</p>
                  </section>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}