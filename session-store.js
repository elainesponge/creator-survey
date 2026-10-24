(function(root){
  const api = {
    initialize(data, now = new Date().toISOString()) {
      if (data.sessions?.length && data.activeSessionId) return data;
      const id = 'session-1';
      return {...data, sessions:[{id, name:'Session 1', startedAt:data.responses[0]?.time || now, endedAt:null}], activeSessionId:id, responses:data.responses.map(r=>({...r,sessionId:id}))};
    },
    rows(data, id) {return data.responses.filter(r=>r.sessionId===id);},
    start(data, name, id, now = new Date().toISOString()) {
      if(data.sessions.some(s=>s.id===id)) throw new Error('Duplicate session');
      const next={id,name:name.trim().slice(0,80)||'Session '+(data.sessions.length+1),startedAt:now,endedAt:null};
      return {...data,activeSessionId:id,sessions:[...data.sessions.map(s=>s.id===data.activeSessionId?{...s,endedAt:now}:s),next]};
    }
  };
  if(typeof module!=='undefined' && module.exports) module.exports=api; else root.SurveySessions=api;
})(globalThis);
