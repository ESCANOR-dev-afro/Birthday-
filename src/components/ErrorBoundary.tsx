import { Component, ErrorInfo, ReactNode } from 'react';
import { Heart, RefreshCw, Sparkles } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Graceful error logging without crashing
    if (typeof console !== 'undefined' && console.error) {
      console.error('Tribute Experience Error Caught:', error, errorInfo);
    }
  }

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#140a08] text-[#faf5ef] flex items-center justify-center p-4 selection:bg-[#be123c]/30">
          <div className="w-full max-w-md card-invitation rounded-3xl p-6 sm:p-8 text-center space-y-5 border border-copper-500/40 shadow-2xl">
            {/* Monogram Seal */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-crimson-700 to-copper-600 border border-copper-400/50 flex items-center justify-center mx-auto shadow-inner">
              <span className="font-serif font-bold text-copper-100 text-xl">D</span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-copper-400 uppercase block font-medium">
                BESPOKE BIRTHDAY TRIBUTE
              </span>
              <h1 className="font-editorial text-3xl font-normal text-copper-glow leading-tight">
                Happy Birthday, Deborah! ❤️
              </h1>
              <p className="font-serif italic text-sm text-copper-200/90 max-w-xs mx-auto">
                "To my darling fine girl, celebrating your grace, strength, and joy on your special day."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-espresso-950/80 border border-copper-500/20 text-xs text-cream-200/80 space-y-2">
              <p className="font-light">
                Wishing you endless blessings, divine favor, and peace in your new age, nwunye 'm!
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={this.handleReload}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-crimson-700 via-crimson-600 to-copper-600 text-cream-50 font-sans font-semibold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <RefreshCw className="w-4 h-4 text-copper-200" />
                <span>Reload Celebration</span>
                <Sparkles className="w-4 h-4 text-copper-200" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1 text-[11px] text-copper-300/60 font-mono pt-2">
              <Heart className="w-3 h-3 text-crimson-400 fill-crimson-400 inline" />
              <span>Sent with love & prayers</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
