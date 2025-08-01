import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Layout components
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ChatWidget from "@/components/chat/chat-widget";

// Pages
import Home from "@/pages/home";
import BusinessSuite from "@/pages/business-suite";
import AppDetail from "@/pages/app-detail";
import SectorSuites from "@/pages/sector-suites";
import SuiteDetail from "@/pages/suite-detail";
import BodegaMonsterDetail from "@/pages/bodegamonster-detail";
import OtherServices from "@/pages/other-services";
import DigitalTransformation from "@/pages/digital-transformation";
import Certifications from "@/pages/certifications";
import CertificationDetail from "@/pages/certification-detail";
import Demos from "@/pages/demos";
import VideoGallery from "@/pages/video-gallery";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import Pricing from "@/pages/pricing-directory";
import Checkout from "@/pages/checkout";
import PaymentSuccess from "@/pages/payment-success";
import ServiceProposal from "@/pages/service-proposal";
import Admin from "@/pages/admin";
import AdminDashboard from "@/pages/admin-dashboard";
import CustomerPortal from "@/pages/customer-portal";
import CustomerPortalMultiTenant from "@/pages/customer-portal-multi-tenant";
import PartnerPortal from "@/pages/partner-portal";
import InvestorPortal from "@/pages/investor-portal";
import CollaboratorPortal from "@/pages/employee-portal-complete";
import EmployeePortal from "@/pages/employee-portal";
import PeopleCorePortal from "@/pages/peoplecore-portal";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/Login";

import FAQ from "@/pages/faq";
import About from "@/pages/about";
import JoinUs from "@/pages/join-us";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfUse from "@/pages/terms-of-use";
import ISOCompliance from "@/pages/iso-compliance";
import NotFound from "@/pages/not-found";

// Components
import { PortalGuard } from "@/components/PortalGuard";

function Router() {
  const [location] = useLocation();
  
  // Check if current route is a portal route (should not show main website layout)
  const isPortalRoute = location.startsWith('/portal') || location.startsWith('/manage') || location.startsWith('/customer-portal') || location.startsWith('/partner') || location.startsWith('/investor') || location.startsWith('/employee') || location.startsWith('/collaborator') || location.startsWith('/peoplecore') || location.startsWith('/admin') || location.startsWith('/login') || location.startsWith('/dashboard');
  
  if (isPortalRoute) {
    return (
      <div className="min-h-screen">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/admin" component={() => (
            <PortalGuard portalName="admin">
              <AdminDashboard />
            </PortalGuard>
          )} />
          <Route path="/portal" component={() => (
            <PortalGuard portalName="customer">
              <CustomerPortalMultiTenant />
            </PortalGuard>
          )} />
          <Route path="/portal-simple" component={() => (
            <PortalGuard portalName="customer">
              <CustomerPortal />
            </PortalGuard>
          )} />
          <Route path="/customer-portal-multi-tenant" component={() => (
            <PortalGuard portalName="customer">
              <CustomerPortalMultiTenant />
            </PortalGuard>
          )} />
          <Route path="/partner" component={() => (
            <PortalGuard portalName="partner">
              <PartnerPortal />
            </PortalGuard>
          )} />
          <Route path="/investor" component={() => (
            <PortalGuard portalName="investor">
              <InvestorPortal />
            </PortalGuard>
          )} />
          <Route path="/employee" component={() => (
            <PortalGuard portalName="employee">
              <CollaboratorPortal />
            </PortalGuard>
          )} />
          <Route path="/collaborator" component={() => (
            <PortalGuard portalName="collaborator">
              <EmployeePortal />
            </PortalGuard>
          )} />
          <Route path="/peoplecore" component={PeopleCorePortal} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/manage" component={() => (
            <PortalGuard portalName="admin">
              <AdminDashboard />
            </PortalGuard>
          )} />
        </Switch>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/business-suite" component={BusinessSuite} />
          <Route path="/business-suite/:slug" component={AppDetail} />
          <Route path="/sector-suites" component={SectorSuites} />
          <Route path="/sector-suites/bodegamonster" component={BodegaMonsterDetail} />
          <Route path="/sector-suites/:slug" component={SuiteDetail} />
          <Route path="/digital-transformation" component={DigitalTransformation} />
          <Route path="/other-services" component={OtherServices} />
          <Route path="/other-services/:service" component={OtherServices} />
          <Route path="/certifications" component={Certifications} />
          <Route path="/training-certification" component={Certifications} />
          <Route path="/certifications/:slug" component={CertificationDetail} />
          <Route path="/iso-compliance" component={ISOCompliance} />
          <Route path="/demos" component={Demos} />
          <Route path="/video-gallery" component={VideoGallery} />
          <Route path="/videos" component={VideoGallery} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment-success" component={PaymentSuccess} />
          <Route path="/service-proposal/:proposalId" component={ServiceProposal} />
          <Route path="/admin" component={Admin} />

          <Route path="/about" component={About} />
          <Route path="/join-us" component={JoinUs} />
          <Route path="/faq" component={FAQ} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-use" component={TermsOfUse} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
