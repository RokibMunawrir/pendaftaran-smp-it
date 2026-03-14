export interface TimelineStep {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  href?: string;
}

interface TimelineProgressProps {
  steps: TimelineStep[];
  currentStepMessage?: string;
  contactUrl?: string;
}

export default function TimelineProgress({ 
  steps, 
  currentStepMessage = "Silakan selesaikan step saat ini agar Anda dapat melanjutkan ke tahapan berikutnya.",
  contactUrl = "https://wa.me/123456789"
}: TimelineProgressProps) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 sticky top-24">
      <div className="card-body p-6 md:p-8">
        <h2 className="card-title text-xl font-bold mb-6">Progress Pendaftaran</h2>
        
        <ul className="steps steps-vertical -ml-2">
          {steps.map((step, index) => {
            const isClickable = step.href && step.status !== 'upcoming';
            const ContentWrapper = isClickable ? 'a' : 'div';
            return (
              <li 
                key={index} 
                data-content={step.status === 'completed' ? "✓" : step.status === 'current' ? "●" : ""} 
                className={`step ${step.status === 'completed' ? 'step-primary' : step.status === 'current' ? 'step-primary font-bold' : 'step-neutral text-base-content/40'}`}
              >
                <ContentWrapper 
                  {...(isClickable ? { href: step.href } : {})}
                  className={`text-left ml-2 py-2 px-3 rounded-xl transition-colors block ${isClickable ? 'hover:bg-base-200 cursor-pointer' : ''}`}
                >
                  <div className={`text-base ${step.status === 'current' ? 'text-primary font-bold' : 'text-base-content font-medium'}`}>{step.title}</div>
                  <div className={`text-xs mt-1 ${step.status === 'current' ? 'text-base-content/70' : 'text-base-content/50 font-normal'}`}>{step.description}</div>
                </ContentWrapper>
              </li>
            );
          })}
        </ul>
        
        {currentStepMessage && (
          <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex-shrink-0 mt-0.5 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
            <p className="text-sm">{currentStepMessage}</p>
          </div>
        )}
        
        {contactUrl && (
          <a href={contactUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-success w-full mt-4 flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
            Hubungi Bantuan
          </a>
        )}
      </div>
    </div>
  );
}
