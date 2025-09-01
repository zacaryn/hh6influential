import React from "react";
import "./../styles/App.css";
import "./../styles/Terms.css";
import Seo from '../components/Seo';
import { PRIMARY_DOMAIN } from '../components/seoConfig';
import { BreadcrumbSchema } from '../components/Schema';

function Terms() {
  return (
    <>
      <Seo
        title={`Terms of Service | HH6 Influential`}
        description={`Terms of Service and Cancellation Policy for HH6 Influential.`}
        path="/terms"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${PRIMARY_DOMAIN}/` },
          { name: 'Terms of Service', url: `${PRIMARY_DOMAIN}/terms` }
        ]}
      />
      <div className="page-container">
        <section className="section terms">
          <h1>HH6 Influential – Terms of Service & Cancellation Policy</h1>
          <p className="intro">These Terms govern all projects and services provided by HH6 Influential. Please read them carefully.</p>

          <ol className="terms-list">
            <li>
              <h3>Scope of Work</h3>
              <p>
                Projects are defined by a written proposal outlining features, deliverables, and pricing. Requests outside of the agreed scope will be billed separately. A 30 day post-launch grace period is included for minor updates within scope. After this, updates are billed hourly or under a retainer.
              </p>
            </li>
            <li>
              <h3>Payment Terms</h3>
              <p>
                A 50% deposit is required before work begins. Remaining balances are due upon project completion and prior to launch. Hosting, maintenance, and retainers are billed in advance and non-refundable once active. Unpaid balances over 15 days may result in suspension of services.
              </p>
            </li>
            <li>
              <h3>Hosting & Domains</h3>
              <p>
                Hosting covers server space, SSL, backups, and monitoring. Maintenance packages include updates and light content posting. Domains managed by HH6 are billed annually. Client-managed domains are their responsibility. Migration of a website from HH6 hosting incurs an hourly migration fee.
              </p>
            </li>
            <li>
              <h3>Cancellations & Termination</h3>
              <div className="terms-clauses">
                <p><strong>Project cancellations:</strong> Deposits are non-refundable. Work completed beyond the deposit will be invoiced.</p>
                <p><strong>Ongoing services:</strong> Hosting/retainers may be canceled with 30 days’ notice. Annual hosting fees are non-refundable after service begins.</p>
                <p><strong>Right to suspend/terminate:</strong> HH6 may suspend or terminate services for non-payment, breach of terms, abusive conduct, or unlawful use.</p>
              </div>
            </li>
            <li>
              <h3>Content & Responsibilities</h3>
              <p>
                Clients must provide accurate, timely content. Delays in delivery may delay completion. HH6 is not liable for errors in client-provided content. Once approved, deliverables are final; further revisions will be billed separately. This includes work requested during grace period mentioned in #1, if the client is delayed in provision of content or details outside the window, they will be billed as though they were outside the grace period
              </p>
            </li>
            <li>
              <h3>Intellectual Property</h3>
              <p>
                All HH6 work remains our property until fully paid. Upon payment, ownership transfers to the client, excluding stock assets or proprietary tools. HH6 retains the right to showcase completed work in our portfolio.
              </p>
            </li>
            <li>
              <h3>Limitation of Liability</h3>
              <p>
                HH6 is not responsible for downtime, data loss, or security issues caused by third parties. Liability is limited to the total amount paid by the client for the project or service in question.
              </p>
            </li>
            <li>
              <h3>Policy Updates</h3>
              <p>
                HH6 may update these Terms at any time. Updates apply to new projects or billing periods going forward.
              </p>
            </li>
          </ol>
        </section>
      </div>
    </>
  );
}

export default Terms;


