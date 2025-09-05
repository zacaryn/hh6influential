// Google Analytics 4 gtag types
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string | Date,
      config?: {
        [key: string]: string | number | boolean | object;
        send_page_view?: boolean;
        allow_google_signals?: boolean;
        allow_ad_personalization_signals?: boolean;
        enhanced_ecommerce?: boolean;
        anonymize_ip?: boolean;
        cookie_flags?: string;
        custom_map?: {
          [key: string]: string;
        };
        page_title?: string;
        page_location?: string;
        page_path?: string;
        content_group1?: string;
        content_group2?: string;
        form_name?: string;
        form_destination?: string;
        engagement_time_msec?: number;
        scroll_depth?: number;
      }
    ) => void;
    dataLayer: unknown[];
  }
}

export {};
