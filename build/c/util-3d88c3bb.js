define(["exports"],(function(s){s.getContainOffsets=function(s,n,t,e){const o=t/e;if(o>s/n){const t=s/o;return{sw:s,sh:t,sx:0,sy:(n-t)/2}}const f=n*o;return{sh:n,sw:f,sx:(s-f)/2,sy:0}}}));
