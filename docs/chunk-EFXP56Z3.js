import{T as u,Z as c,fa as a,ma as r,ub as l,wa as s}from"./chunk-NVZOHAZI.js";function y(d,t){let o=!t?.manualCleanup;o&&!t?.injector&&a(y);let b=o?t?.injector?.get(r)??c(r):null,n;t?.requireSync?n=s({kind:0}):n=s({kind:1,value:t?.initialValue});let i=d.subscribe({next:e=>n.set({kind:1,value:e}),error:e=>{if(t?.rejectErrors)throw e;n.set({kind:2,error:e})}});return b?.onDestroy(i.unsubscribe.bind(i)),l(()=>{let e=n();switch(e.kind){case 1:return e.value;case 2:throw e.error;case 0:throw new u(601,"`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.")}})}export{y as a};
