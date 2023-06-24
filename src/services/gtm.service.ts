export default class GTMService {
  /**
   * Send an event notifying google analytics that a page has been viewed at a specified URL
   * @param url 
   */
  pageView(url: string): void {
    this.window.gtag('config', this.trackingId, {
      page_path: url,
    });
  }

  /**
   * Send a custom event to google analytics
   * @param action 
   * @param category 
   * @param label 
   * @param value 
   */
  trackEvent(action: string, category: string, label: string, value: any): void {
    this.window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
  
  /**
   * The GTM measurement ID
   */
  get trackingId(): string | undefined {
    return process.env.NEXT_PUBLIC_GA_ID;
  }

  /**
   * Determines if the window object has gtag defined
   */
  get gtagExists(): boolean {
    return typeof this.window.gtag !== 'undefined';
  }

  /**
   * The URL for Google Tag Manager
   */
  get gtmUrl(): string {
    return 'https://www.googletagmanager.com/gtag';
  }

  private get window(): any {
    return (window as any);
  }
}