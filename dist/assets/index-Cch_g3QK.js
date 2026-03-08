(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const He={chunkSizeX:16,chunkSizeY:96,chunkSizeZ:16,preloadRadius:4,maxInteractionDistance:6,generationBudgetPerFrame:1,meshBudgetPerFrame:1,skyColor:"#9cc7f5"},De={walkSpeed:4.45,sprintSpeed:6.25,crouchSpeed:1.72,jumpVelocity:7.2,gravity:24,colliderWidth:.6,colliderHeight:1.8,eyeHeight:1.62,crouchEyeHeight:1.15,mouseSensitivity:.0025,jumpRepeatDelayMs:86,landingJumpCooldownMs:54,autoJumpGroundedDelayMs:18,jumpBufferMs:95,coyoteTimeMs:80,groundFrictionTick:.56,airFrictionTick:.92,verticalDragTick:.984,groundWalkAccelerationTick:.11,groundSprintAccelerationTick:.17,groundCrouchAccelerationTick:.05,airWalkAccelerationTick:.022,airSprintAccelerationTick:.03,airStrafePenalty:.55,airSprintSideControlPenalty:.9,groundSprintForwardStrafeScale:.62,airSprintForwardStrafeScale:.76,fallStrafeBaseControlSpeed:2.35,airborneWalkSpeed:5.1,airborneSprintSpeed:6.55,sprintJumpBoost:.28,landingProbeSeconds:.09,landingApproachDamping:.74,maxHorizontalSpeed:7.25,mcTickSeconds:.05},ut={schemaVersion:5,databaseVersion:3,legacyWorldId:"default-world",appMetaKey:"app-meta",playerSaveIntervalMs:2e3,worldSaveDebounceMs:500},Vs=["moveForward","moveBackward","moveLeft","moveRight","jump","crouch","sprint","inventory","debug","pause"],jc={moveForward:"Move Forward",moveBackward:"Move Backward",moveLeft:"Strafe Left",moveRight:"Strafe Right",jump:"Jump",crouch:"Crouch",sprint:"Sprint",inventory:"Inventory",debug:"Debug Overlay",pause:"Pause Menu"},$c={moveForward:{primary:"KeyW",secondary:"ArrowUp"},moveBackward:{primary:"KeyS",secondary:"ArrowDown"},moveLeft:{primary:"KeyA",secondary:"ArrowLeft"},moveRight:{primary:"KeyD",secondary:"ArrowRight"},jump:{primary:"ControlRight",secondary:"Space"},crouch:{primary:"Numpad0",secondary:"ControlLeft"},sprint:{primary:"ShiftLeft",secondary:"ShiftRight"},inventory:{primary:"KeyI",secondary:"Tab"},debug:{primary:"F3",secondary:null},pause:{primary:"Escape",secondary:null}},Gs=()=>({keyBindings:structuredClone($c),skinDataUrl:null}),Jn=s=>{const e={};return Vs.forEach(t=>{e[t]={primary:s[t].primary,secondary:s[t].secondary}}),e},Ao={Escape:"Esc",Space:"Space",ControlLeft:"Ctrl Left",ControlRight:"Ctrl Right",ShiftLeft:"Shift Left",ShiftRight:"Shift Right",AltLeft:"Alt Left",AltRight:"Alt Right",ArrowUp:"Arrow Up",ArrowDown:"Arrow Down",ArrowLeft:"Arrow Left",ArrowRight:"Arrow Right",Numpad0:"Num 0",Numpad1:"Num 1",Numpad2:"Num 2",Numpad3:"Num 3",Numpad4:"Num 4",Numpad5:"Num 5",Numpad6:"Num 6",Numpad7:"Num 7",Numpad8:"Num 8",Numpad9:"Num 9"},Zc=s=>s?Ao[s]?Ao[s]:s.startsWith("Key")?s.replace("Key","").toUpperCase():s.startsWith("Digit")?s.replace("Digit",""):s.startsWith("Mouse")?s.replace("Mouse","Mouse "):s:"Unbound";class Jc{constructor(e,t,n){this.fixedStepSeconds=e,this.update=t,this.render=n,this.tick=this.tick.bind(this)}running=!1;lastTime=0;accumulator=0;animationFrameId=0;start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.animationFrameId=window.requestAnimationFrame(this.tick))}stop(){this.running&&(this.running=!1,window.cancelAnimationFrame(this.animationFrameId))}tick(e){if(!this.running)return;const t=Math.min((e-this.lastTime)/1e3,.1);for(this.lastTime=e,this.accumulator+=t;this.accumulator>=this.fixedStepSeconds;)this.update(this.fixedStepSeconds),this.accumulator-=this.fixedStepSeconds;this.render(this.accumulator/this.fixedStepSeconds),this.animationFrameId=window.requestAnimationFrame(this.tick)}}const Xt=128,ja=27,Ai=9,sr=ja+Ai,zi=ja,Hn=()=>({blockId:null,count:0});class yo{slots;selectedHotbarIndex=0;constructor(e,t=0){this.slots=Array.from({length:sr},(n,i)=>{const r=e?.[i];return r?{...r}:Hn()}),this.selectedHotbarIndex=Math.max(0,Math.min(Ai-1,t))}getSlots(){return this.slots.map(e=>({...e}))}getMainSlots(){return this.slots.slice(0,ja).map(e=>({...e}))}getHotbarSlots(){return this.slots.slice(zi).map(e=>({...e}))}getSelectedHotbarIndex(){return this.selectedHotbarIndex}setSelectedHotbarIndex(e){e<0||e>=Ai||(this.selectedHotbarIndex=e)}shiftSelectedHotbar(e){this.selectedHotbarIndex=((this.selectedHotbarIndex+e)%Ai+Ai)%Ai}getSelectedBlock(){return this.slots[zi+this.selectedHotbarIndex].blockId}getSelectedAbsoluteSlotIndex(){return zi+this.selectedHotbarIndex}getSlot(e){return{...this.slots[e]}}setSlot(e,t){if(e<0||e>=sr)return;const n=t.blockId===null?0:Math.max(1,Math.min(Xt,t.count));this.slots[e]={blockId:t.blockId,count:n}}pickUpSlot(e){const t=this.getSlot(e);return this.slots[e]=Hn(),t}placeCursor(e,t){if(t.blockId===null||t.count<=0)return Hn();const n=this.slots[e];if(n.blockId===null||n.count===0)return this.slots[e]={...t},Hn();if(n.blockId===t.blockId){const i=Math.min(Xt-n.count,t.count);this.slots[e]={blockId:n.blockId,count:n.count+i};const r=t.count-i;return r>0?{blockId:t.blockId,count:r}:Hn()}return this.slots[e]={...t},{...n}}addBlock(e,t=1){if(!this.canAddBlock(e,t))return!1;let n=t;for(const i of this.iterateHotbarThenMain())if(i.blockId===e&&i.count<Xt){const r=Math.min(Xt-i.count,n);if(i.count+=r,n-=r,n===0)return!0}for(const i of this.iterateHotbarThenMain())if(i.blockId===null||i.count===0){const r=Math.min(Xt,n);if(i.blockId=e,i.count=r,n-=r,n===0)return!0}return n===0}canAddBlock(e,t=1){let n=t;for(const i of this.iterateHotbarThenMain())if(i.blockId===e?n-=Xt-i.count:(i.blockId===null||i.count===0)&&(n-=Xt),n<=0)return!0;return!1}removeBlock(e,t){if(this.getBlockCount(e)<t)return!1;let n=t;for(let i=0;i<this.slots.length;i+=1){const r=this.slots[i];if(r.blockId!==e)continue;const a=Math.min(r.count,n);if(r.count-=a,n-=a,r.count===0&&(r.blockId=null),n===0)return!0}return!1}consumeSelectedBlock(){const e=this.getSelectedAbsoluteSlotIndex(),t=this.slots[e];if(t.blockId===null||t.count<=0)return null;t.count-=1;const n=t.blockId;return t.count===0&&(t.blockId=null),n}getBlockCount(e){return this.slots.reduce((t,n)=>n.blockId!==e?t:t+n.count,0)}snapshot(){return this.getSlots()}returnCursor(e){return e.blockId===null||e.count===0||this.addBlock(e.blockId,e.count)?Hn():e}*iterateHotbarThenMain(){for(let e=zi;e<sr;e+=1)yield this.slots[e];for(let e=0;e<zi;e+=1)yield this.slots[e]}}const Qc=[{id:"planks",label:"Planks x4",description:"Turn one log into four planks.",mode:"both",ingredients:[{blockId:4,count:1}],output:{blockId:7,count:4}},{id:"crafting_table",label:"Crafting Table",description:"Four planks form a workbench.",mode:"both",ingredients:[{blockId:7,count:4}],output:{blockId:8,count:1}},{id:"stone_bricks",label:"Stone Bricks x4",description:"Workbench recipe for a cleaner stone block.",mode:"crafting_table",ingredients:[{blockId:3,count:4}],output:{blockId:9,count:4}}],bo=s=>Qc.filter(e=>e.mode==="both"||e.mode===s),Ql=(s,e)=>s.canAddBlock(e.output.blockId,e.output.count)?e.ingredients.every(t=>s.getBlockCount(t.blockId)>=t.count):!1,eh=(s,e)=>Ql(s,e)?(e.ingredients.forEach(t=>{s.removeBlock(t.blockId,t.count)}),s.addBlock(e.output.blockId,e.output.count)):!1;class th{constructor(e){this.canvas=e,this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseDown=this.handleMouseDown.bind(this),this.handleMouseUp=this.handleMouseUp.bind(this),this.handleWheel=this.handleWheel.bind(this),this.handlePointerLockChange=this.handlePointerLockChange.bind(this),this.handleContextMenu=this.handleContextMenu.bind(this)}pressedKeys=new Set;justPressedKeys=new Set;pointerLocked=!1;lookDeltaX=0;lookDeltaY=0;primaryDown=!1;primaryClicked=!1;secondaryClicked=!1;wheelSteps=0;pointerLockListener;connect(){window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("mousemove",this.handleMouseMove),window.addEventListener("mousedown",this.handleMouseDown),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("wheel",this.handleWheel,{passive:!1}),window.addEventListener("contextmenu",this.handleContextMenu),document.addEventListener("pointerlockchange",this.handlePointerLockChange)}dispose(){window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("mousemove",this.handleMouseMove),window.removeEventListener("mousedown",this.handleMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("wheel",this.handleWheel),window.removeEventListener("contextmenu",this.handleContextMenu),document.removeEventListener("pointerlockchange",this.handlePointerLockChange)}setPointerLockListener(e){this.pointerLockListener=e}requestPointerLock(){return this.canvas.requestPointerLock({unadjustedMovement:!0})}exitPointerLock(){document.pointerLockElement===this.canvas&&document.exitPointerLock()}isPointerLocked(){return this.pointerLocked}isKeyDown(e){return this.pressedKeys.has(e)}isAnyKeyDown(e){return e.some(t=>!!t&&this.pressedKeys.has(t))}consumeLookDelta(){const e={x:this.lookDeltaX,y:this.lookDeltaY};return this.lookDeltaX=0,this.lookDeltaY=0,e}isPrimaryDown(){return this.primaryDown}consumePrimaryClick(){const e=this.primaryClicked;return this.primaryClicked=!1,e}consumeSecondaryClick(){const e=this.secondaryClicked;return this.secondaryClicked=!1,e}consumeWheelSteps(){const e=this.wheelSteps;return this.wheelSteps=0,e}consumeJustPressedKey(e){const t=this.justPressedKeys.has(e);return t&&this.justPressedKeys.delete(e),t}consumeAnyJustPressed(e){for(const t of e)if(t&&this.consumeJustPressedKey(t))return!0;return!1}consumeNumberSlot(){for(let e=1;e<=9;e+=1)if(this.consumeJustPressedKey(`Digit${e}`))return e-1;return null}endFrame(){this.justPressedKeys.clear()}handleKeyDown(e){this.pressedKeys.has(e.code)||this.justPressedKeys.add(e.code),this.pressedKeys.add(e.code)}handleKeyUp(e){this.pressedKeys.delete(e.code)}handleMouseMove(e){this.pointerLocked&&(this.lookDeltaX+=e.movementX,this.lookDeltaY+=e.movementY)}handleMouseDown(e){e.button===0&&(this.primaryDown=!0,this.primaryClicked=!0),e.button===2&&(this.secondaryClicked=!0)}handleMouseUp(e){e.button===0&&(this.primaryDown=!1)}handleWheel(e){this.pointerLocked&&(e.preventDefault(),this.wheelSteps+=Math.sign(e.deltaY))}handleContextMenu(e){e.preventDefault()}handlePointerLockChange(){this.pointerLocked=document.pointerLockElement===this.canvas,this.pointerLockListener?.(this.pointerLocked)}}const $a="180",nh=0,Eo=1,ih=2,ec=1,tc=2,gn=3,ln=0,Et=1,_n=2,Ln=0,Ei=1,wo=2,To=3,Co=4,sh=5,Qn=100,rh=101,ah=102,oh=103,lh=104,ch=200,hh=201,dh=202,uh=203,jr=204,$r=205,fh=206,ph=207,mh=208,gh=209,_h=210,vh=211,Sh=212,Mh=213,xh=214,Zr=0,Jr=1,Qr=2,Ri=3,ea=4,ta=5,na=6,ia=7,Za=0,Ah=1,yh=2,Un=0,bh=1,Eh=2,wh=3,nc=4,Th=5,Ch=6,Rh=7,ic=300,Pi=301,Di=302,sa=303,ra=304,Js=306,aa=1e3,vn=1001,oa=1002,It=1003,Ph=1004,cs=1005,Qt=1006,rr=1007,In=1008,cn=1009,sc=1010,rc=1011,ji=1012,Ja=1013,ni=1014,Sn=1015,ns=1016,Qa=1017,eo=1018,$i=1020,ac=35902,oc=35899,lc=1021,cc=1022,en=1023,Zi=1026,Ji=1027,hc=1028,to=1029,dc=1030,no=1031,io=1033,Fs=33776,ks=33777,Bs=33778,Os=33779,la=35840,ca=35841,ha=35842,da=35843,ua=36196,fa=37492,pa=37496,ma=37808,ga=37809,_a=37810,va=37811,Sa=37812,Ma=37813,xa=37814,Aa=37815,ya=37816,ba=37817,Ea=37818,wa=37819,Ta=37820,Ca=37821,Ra=36492,Pa=36494,Da=36495,Ia=36283,La=36284,Ua=36285,Na=36286,Dh=3200,Ih=3201,uc=0,Lh=1,Dn="",xt="srgb",Ii="srgb-linear",Ws="linear",Je="srgb",ri=7680,Ro=519,Uh=512,Nh=513,Fh=514,fc=515,kh=516,Bh=517,Oh=518,zh=519,Po=35044,Do="300 es",an=2e3,Xs=2001;class ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ar=Math.PI/180,Fa=180/Math.PI;function is(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(yt[s&255]+yt[s>>8&255]+yt[s>>16&255]+yt[s>>24&255]+"-"+yt[e&255]+yt[e>>8&255]+"-"+yt[e>>16&15|64]+yt[e>>24&255]+"-"+yt[t&63|128]+yt[t>>8&255]+"-"+yt[t>>16&255]+yt[t>>24&255]+yt[n&255]+yt[n>>8&255]+yt[n>>16&255]+yt[n>>24&255]).toLowerCase()}function We(s,e,t){return Math.max(e,Math.min(t,s))}function Hh(s,e){return(s%e+e)%e}function or(s,e,t){return(1-t)*s+t*e}function Hi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ut(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Xe{constructor(e=0,t=0){Xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],d=n[i+2],h=n[i+3];const u=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(h!==v||l!==u||c!==p||d!==g){let m=1-o;const f=l*u+c*p+d*g+h*v,E=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const C=Math.sqrt(b),w=Math.atan2(C,f*E);m=Math.sin(m*w)/C,o=Math.sin(o*w)/C}const A=o*E;if(l=l*m+u*A,c=c*m+p*A,d=d*m+g*A,h=h*m+v*A,m===1-o){const C=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=C,c*=C,d*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],d=n[i+3],h=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+d*h+l*p-c*u,e[t+1]=l*g+d*u+c*h-o*p,e[t+2]=c*g+d*p+o*u-l*h,e[t+3]=d*g-o*h-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(i/2),h=o(r/2),u=l(n/2),p=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"YXZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"ZXY":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"ZYX":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"YZX":this._x=u*d*h+c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h-u*p*g;break;case"XZY":this._x=u*d*h-c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],u=n+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(a-i)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(d-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(r-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-i)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+i*c-r*l,this._y=i*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-i*o,this._w=a*d-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),h=Math.sin((1-t)*d)/c,u=Math.sin(t*d)/c;return this._w=a*h+this._w*u,this._x=n*h+this._x*u,this._y=i*h+this._y*u,this._z=r*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,n=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Io.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Io.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),d=2*(o*t-r*i),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*d,this.y=n+l*d+o*c-r*h,this.z=i+l*h+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return lr.copy(this).projectOnVector(e),this.sub(lr)}reflect(e){return this.sub(lr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const lr=new F,Io=new Nn;class ke{constructor(e,t,n,i,r,a,o,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=i,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],h=n[7],u=n[2],p=n[5],g=n[8],v=i[0],m=i[3],f=i[6],E=i[1],b=i[4],A=i[7],C=i[2],w=i[5],R=i[8];return r[0]=a*v+o*E+l*C,r[3]=a*m+o*b+l*w,r[6]=a*f+o*A+l*R,r[1]=c*v+d*E+h*C,r[4]=c*m+d*b+h*w,r[7]=c*f+d*A+h*R,r[2]=u*v+p*E+g*C,r[5]=u*m+p*b+g*w,r[8]=u*f+p*A+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,u=o*l-d*r,p=c*r-a*l,g=t*h+n*u+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(i*c-d*n)*v,e[2]=(o*n-i*a)*v,e[3]=u*v,e[4]=(d*t-i*l)*v,e[5]=(i*r-o*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(cr.makeScale(e,t)),this}rotate(e){return this.premultiply(cr.makeRotation(-e)),this}translate(e,t){return this.premultiply(cr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const cr=new ke;function pc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Qi(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Vh(){const s=Qi("canvas");return s.style.display="block",s}const Lo={};function es(s){s in Lo||(Lo[s]=!0,console.warn(s))}function Gh(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Uo=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),No=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wh(){const s={enabled:!0,workingColorSpace:Ii,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Je&&(i.r=Mn(i.r),i.g=Mn(i.g),i.b=Mn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Je&&(i.r=wi(i.r),i.g=wi(i.g),i.b=wi(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Dn?Ws:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return es("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return es("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Ii]:{primaries:e,whitePoint:n,transfer:Ws,toXYZ:Uo,fromXYZ:No,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:xt},outputColorSpaceConfig:{drawingBufferColorSpace:xt}},[xt]:{primaries:e,whitePoint:n,transfer:Je,toXYZ:Uo,fromXYZ:No,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:xt}}}),s}const je=Wh();function Mn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function wi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ai;class Xh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ai===void 0&&(ai=Qi("canvas")),ai.width=e.width,ai.height=e.height;const i=ai.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ai}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Qi("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Mn(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Mn(t[n]/255)*255):t[n]=Mn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Yh=0;class so{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=is(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(hr(i[a].image)):r.push(hr(i[a]))}else r=hr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function hr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Xh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qh=0;const dr=new F;class wt extends ki{constructor(e=wt.DEFAULT_IMAGE,t=wt.DEFAULT_MAPPING,n=vn,i=vn,r=Qt,a=In,o=en,l=cn,c=wt.DEFAULT_ANISOTROPY,d=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=is(),this.name="",this.source=new so(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(dr).x}get height(){return this.source.getSize(dr).y}get depth(){return this.source.getSize(dr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ic)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case aa:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case oa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case aa:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case oa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}wt.DEFAULT_IMAGE=null;wt.DEFAULT_MAPPING=ic;wt.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,n=0,i=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],p=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,A=(p+1)/2,C=(f+1)/2,w=(d+u)/4,R=(h+v)/4,U=(g+m)/4;return b>A&&b>C?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=w/n,r=R/n):A>C?A<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(A),n=w/i,r=U/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=R/r,i=U/r),this.set(n,i,r,t),this}let E=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(u-d)*(u-d));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(h-v)/E,this.z=(u-d)/E,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Kh extends ki{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const i={width:e,height:t,depth:n.depth},r=new wt(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new so(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends Kh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class mc extends wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jh extends wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ss{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,qt):qt.fromBufferAttribute(r,a),qt.applyMatrix4(e.matrixWorld),this.expandByPoint(qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),hs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),hs.copy(n.boundingBox)),hs.applyMatrix4(e.matrixWorld),this.union(hs)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qt),qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vi),ds.subVectors(this.max,Vi),oi.subVectors(e.a,Vi),li.subVectors(e.b,Vi),ci.subVectors(e.c,Vi),yn.subVectors(li,oi),bn.subVectors(ci,li),Vn.subVectors(oi,ci);let t=[0,-yn.z,yn.y,0,-bn.z,bn.y,0,-Vn.z,Vn.y,yn.z,0,-yn.x,bn.z,0,-bn.x,Vn.z,0,-Vn.x,-yn.y,yn.x,0,-bn.y,bn.x,0,-Vn.y,Vn.x,0];return!ur(t,oi,li,ci,ds)||(t=[1,0,0,0,1,0,0,0,1],!ur(t,oi,li,ci,ds))?!1:(us.crossVectors(yn,bn),t=[us.x,us.y,us.z],ur(t,oi,li,ci,ds))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const dn=[new F,new F,new F,new F,new F,new F,new F,new F],qt=new F,hs=new ss,oi=new F,li=new F,ci=new F,yn=new F,bn=new F,Vn=new F,Vi=new F,ds=new F,us=new F,Gn=new F;function ur(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Gn.fromArray(s,r);const o=i.x*Math.abs(Gn.x)+i.y*Math.abs(Gn.y)+i.z*Math.abs(Gn.z),l=e.dot(Gn),c=t.dot(Gn),d=n.dot(Gn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const $h=new ss,Gi=new F,fr=new F;class ro{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):$h.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gi.subVectors(e,this.center);const t=Gi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Gi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gi.copy(e.center).add(fr)),this.expandByPoint(Gi.copy(e.center).sub(fr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const un=new F,pr=new F,fs=new F,En=new F,mr=new F,ps=new F,gr=new F;class Zh{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(un.copy(this.origin).addScaledVector(this.direction,t),un.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){pr.copy(e).add(t).multiplyScalar(.5),fs.copy(t).sub(e).normalize(),En.copy(this.origin).sub(pr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(fs),o=En.dot(this.direction),l=-En.dot(fs),c=En.lengthSq(),d=Math.abs(1-a*a);let h,u,p,g;if(d>0)if(h=a*l-o,u=a*o-l,g=r*d,h>=0)if(u>=-g)if(u<=g){const v=1/d;h*=v,u*=v,p=h*(h+a*u+2*o)+u*(a*h+u+2*l)+c}else u=r,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*l)+c;else u=-r,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-a*r+o)),u=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(h=Math.max(0,-(a*r+o)),u=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+u*(u+2*l)+c);else u=a>0?-r:r,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(pr).addScaledVector(fs,u),p}intersectSphere(e,t){un.subVectors(e.center,this.origin);const n=un.dot(this.direction),i=un.dot(un)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,un)!==null}intersectTriangle(e,t,n,i,r){mr.subVectors(t,e),ps.subVectors(n,e),gr.crossVectors(mr,ps);let a=this.direction.dot(gr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;En.subVectors(this.origin,e);const l=o*this.direction.dot(ps.crossVectors(En,ps));if(l<0)return null;const c=o*this.direction.dot(mr.cross(En));if(c<0||l+c>a)return null;const d=-o*En.dot(gr);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,n,i,r,a,o,l,c,d,h,u,p,g,v,m){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,d,h,u,p,g,v,m)}set(e,t,n,i,r,a,o,l,c,d,h,u,p,g,v,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/hi.setFromMatrixColumn(e,0).length(),r=1/hi.setFromMatrixColumn(e,1).length(),a=1/hi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const u=a*d,p=a*h,g=o*d,v=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*d,p=l*h,g=c*d,v=c*h;t[0]=u+v*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=p*o-g,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*d,p=l*h,g=c*d,v=c*h;t[0]=u-v*o,t[4]=-a*h,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*d,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*d,p=a*h,g=o*d,v=o*h;t[0]=l*d,t[4]=g*c-p,t[8]=u*c+v,t[1]=l*h,t[5]=v*c+u,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=v-u*h,t[8]=g*h+p,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*h+g,t[10]=u-v*h}else if(e.order==="XZY"){const u=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=u*h+v,t[5]=a*d,t[9]=p*h-g,t[2]=g*h-p,t[6]=o*d,t[10]=v*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jh,e,Qh)}lookAt(e,t,n){const i=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),wn.crossVectors(n,Bt),wn.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),wn.crossVectors(n,Bt)),wn.normalize(),ms.crossVectors(Bt,wn),i[0]=wn.x,i[4]=ms.x,i[8]=Bt.x,i[1]=wn.y,i[5]=ms.y,i[9]=Bt.y,i[2]=wn.z,i[6]=ms.z,i[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],h=n[5],u=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],E=n[3],b=n[7],A=n[11],C=n[15],w=i[0],R=i[4],U=i[8],x=i[12],M=i[1],P=i[5],k=i[9],H=i[13],Y=i[2],K=i[6],W=i[10],Q=i[14],z=i[3],ie=i[7],ae=i[11],pe=i[15];return r[0]=a*w+o*M+l*Y+c*z,r[4]=a*R+o*P+l*K+c*ie,r[8]=a*U+o*k+l*W+c*ae,r[12]=a*x+o*H+l*Q+c*pe,r[1]=d*w+h*M+u*Y+p*z,r[5]=d*R+h*P+u*K+p*ie,r[9]=d*U+h*k+u*W+p*ae,r[13]=d*x+h*H+u*Q+p*pe,r[2]=g*w+v*M+m*Y+f*z,r[6]=g*R+v*P+m*K+f*ie,r[10]=g*U+v*k+m*W+f*ae,r[14]=g*x+v*H+m*Q+f*pe,r[3]=E*w+b*M+A*Y+C*z,r[7]=E*R+b*P+A*K+C*ie,r[11]=E*U+b*k+A*W+C*ae,r[15]=E*x+b*H+A*Q+C*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15];return g*(+r*l*h-i*c*h-r*o*u+n*c*u+i*o*p-n*l*p)+v*(+t*l*p-t*c*u+r*a*u-i*a*p+i*c*d-r*l*d)+m*(+t*c*h-t*o*p-r*a*h+n*a*p+r*o*d-n*c*d)+f*(-i*o*d-t*l*h+t*o*u+i*a*h-n*a*u+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],E=h*m*c-v*u*c+v*l*p-o*m*p-h*l*f+o*u*f,b=g*u*c-d*m*c-g*l*p+a*m*p+d*l*f-a*u*f,A=d*v*c-g*h*c+g*o*p-a*v*p-d*o*f+a*h*f,C=g*h*l-d*v*l-g*o*u+a*v*u+d*o*m-a*h*m,w=t*E+n*b+i*A+r*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return e[0]=E*R,e[1]=(v*u*r-h*m*r-v*i*p+n*m*p+h*i*f-n*u*f)*R,e[2]=(o*m*r-v*l*r+v*i*c-n*m*c-o*i*f+n*l*f)*R,e[3]=(h*l*r-o*u*r-h*i*c+n*u*c+o*i*p-n*l*p)*R,e[4]=b*R,e[5]=(d*m*r-g*u*r+g*i*p-t*m*p-d*i*f+t*u*f)*R,e[6]=(g*l*r-a*m*r-g*i*c+t*m*c+a*i*f-t*l*f)*R,e[7]=(a*u*r-d*l*r+d*i*c-t*u*c-a*i*p+t*l*p)*R,e[8]=A*R,e[9]=(g*h*r-d*v*r-g*n*p+t*v*p+d*n*f-t*h*f)*R,e[10]=(a*v*r-g*o*r+g*n*c-t*v*c-a*n*f+t*o*f)*R,e[11]=(d*o*r-a*h*r-d*n*c+t*h*c+a*n*p-t*o*p)*R,e[12]=C*R,e[13]=(d*v*i-g*h*i+g*n*u-t*v*u-d*n*m+t*h*m)*R,e[14]=(g*o*i-a*v*i-g*n*l+t*v*l+a*n*m-t*o*m)*R,e[15]=(a*h*i-d*o*i+d*n*l-t*h*l-a*n*u+t*o*u)*R,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,d*o+n,d*l-i*a,0,c*l-i*o,d*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,h=o+o,u=r*c,p=r*d,g=r*h,v=a*d,m=a*h,f=o*h,E=l*c,b=l*d,A=l*h,C=n.x,w=n.y,R=n.z;return i[0]=(1-(v+f))*C,i[1]=(p+A)*C,i[2]=(g-b)*C,i[3]=0,i[4]=(p-A)*w,i[5]=(1-(u+f))*w,i[6]=(m+E)*w,i[7]=0,i[8]=(g+b)*R,i[9]=(m-E)*R,i[10]=(1-(u+v))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=hi.set(i[0],i[1],i[2]).length();const a=hi.set(i[4],i[5],i[6]).length(),o=hi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Kt.copy(this);const c=1/r,d=1/a,h=1/o;return Kt.elements[0]*=c,Kt.elements[1]*=c,Kt.elements[2]*=c,Kt.elements[4]*=d,Kt.elements[5]*=d,Kt.elements[6]*=d,Kt.elements[8]*=h,Kt.elements[9]*=h,Kt.elements[10]*=h,t.setFromRotationMatrix(Kt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=an,l=!1){const c=this.elements,d=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),p=(n+i)/(n-i);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===an)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Xs)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=an,l=!1){const c=this.elements,d=2/(t-e),h=2/(n-i),u=-(t+e)/(t-e),p=-(n+i)/(n-i);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===an)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Xs)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const hi=new F,Kt=new ct,Jh=new F(0,0,0),Qh=new F(1,1,1),wn=new F,ms=new F,Bt=new F,Fo=new ct,ko=new Nn;class tn{constructor(e=0,t=0,n=0,i=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],d=i[9],h=i[2],u=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ko.setFromEuler(this),this.setFromQuaternion(ko,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class gc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ed=0;const Bo=new F,di=new Nn,fn=new ct,gs=new F,Wi=new F,td=new F,nd=new Nn,Oo=new F(1,0,0),zo=new F(0,1,0),Ho=new F(0,0,1),Vo={type:"added"},id={type:"removed"},ui={type:"childadded",child:null},_r={type:"childremoved",child:null};class vt extends ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=is(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new F,t=new tn,n=new Nn,i=new F(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ct},normalMatrix:{value:new ke}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return di.setFromAxisAngle(e,t),this.quaternion.multiply(di),this}rotateOnWorldAxis(e,t){return di.setFromAxisAngle(e,t),this.quaternion.premultiply(di),this}rotateX(e){return this.rotateOnAxis(Oo,e)}rotateY(e){return this.rotateOnAxis(zo,e)}rotateZ(e){return this.rotateOnAxis(Ho,e)}translateOnAxis(e,t){return Bo.copy(e).applyQuaternion(this.quaternion),this.position.add(Bo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Oo,e)}translateY(e){return this.translateOnAxis(zo,e)}translateZ(e){return this.translateOnAxis(Ho,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gs.copy(e):gs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(Wi,gs,this.up):fn.lookAt(gs,Wi,this.up),this.quaternion.setFromRotationMatrix(fn),i&&(fn.extractRotation(i.matrixWorld),di.setFromRotationMatrix(fn),this.quaternion.premultiply(di.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vo),ui.child=e,this.dispatchEvent(ui),ui.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(id),_r.child=e,this.dispatchEvent(_r),_r.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vo),ui.child=e,this.dispatchEvent(ui),ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,e,td),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,nd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}vt.DEFAULT_UP=new F(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jt=new F,pn=new F,vr=new F,mn=new F,fi=new F,pi=new F,Go=new F,Sr=new F,Mr=new F,xr=new F,Ar=new ot,yr=new ot,br=new ot;class Jt{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),jt.subVectors(e,t),i.cross(jt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){jt.subVectors(i,t),pn.subVectors(n,t),vr.subVectors(e,t);const a=jt.dot(jt),o=jt.dot(pn),l=jt.dot(vr),c=pn.dot(pn),d=pn.dot(vr),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const u=1/h,p=(c*l-o*d)*u,g=(a*d-o*l)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,mn.x),l.addScaledVector(a,mn.y),l.addScaledVector(o,mn.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return Ar.setScalar(0),yr.setScalar(0),br.setScalar(0),Ar.fromBufferAttribute(e,t),yr.fromBufferAttribute(e,n),br.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Ar,r.x),a.addScaledVector(yr,r.y),a.addScaledVector(br,r.z),a}static isFrontFacing(e,t,n,i){return jt.subVectors(n,t),pn.subVectors(e,t),jt.cross(pn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jt.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),jt.cross(pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Jt.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;fi.subVectors(i,n),pi.subVectors(r,n),Sr.subVectors(e,n);const l=fi.dot(Sr),c=pi.dot(Sr);if(l<=0&&c<=0)return t.copy(n);Mr.subVectors(e,i);const d=fi.dot(Mr),h=pi.dot(Mr);if(d>=0&&h<=d)return t.copy(i);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(fi,a);xr.subVectors(e,r);const p=fi.dot(xr),g=pi.dot(xr);if(g>=0&&p<=g)return t.copy(r);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(pi,o);const m=d*g-p*h;if(m<=0&&h-d>=0&&p-g>=0)return Go.subVectors(r,i),o=(h-d)/(h-d+(p-g)),t.copy(i).addScaledVector(Go,o);const f=1/(m+v+u);return a=v*f,o=u*f,t.copy(n).addScaledVector(fi,a).addScaledVector(pi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const _c={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Tn={h:0,s:0,l:0},_s={h:0,s:0,l:0};function Er(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=je.workingColorSpace){if(e=Hh(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Er(a,r,e+1/3),this.g=Er(a,r,e),this.b=Er(a,r,e-1/3)}return je.colorSpaceToWorking(this,i),this}setStyle(e,t=xt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xt){const n=_c[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Mn(e.r),this.g=Mn(e.g),this.b=Mn(e.b),this}copyLinearToSRGB(e){return this.r=wi(e.r),this.g=wi(e.g),this.b=wi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xt){return je.workingToColorSpace(bt.copy(this),e),Math.round(We(bt.r*255,0,255))*65536+Math.round(We(bt.g*255,0,255))*256+Math.round(We(bt.b*255,0,255))}getHexString(e=xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(bt.copy(this),t);const n=bt.r,i=bt.g,r=bt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=xt){je.workingToColorSpace(bt.copy(this),e);const t=bt.r,n=bt.g,i=bt.b;return e!==xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Tn),this.setHSL(Tn.h+e,Tn.s+t,Tn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Tn),e.getHSL(_s);const n=or(Tn.h,_s.h,t),i=or(Tn.s,_s.s,t),r=or(Tn.l,_s.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bt=new Ne;Ne.NAMES=_c;let sd=0;class rs extends ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sd++}),this.uuid=is(),this.name="",this.type="Material",this.blending=Ei,this.side=ln,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jr,this.blendDst=$r,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=Ri,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ro,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ri,this.stencilZFail=ri,this.stencilZPass=ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(n.blending=this.blending),this.side!==ln&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==jr&&(n.blendSrc=this.blendSrc),this.blendDst!==$r&&(n.blendDst=this.blendDst),this.blendEquation!==Qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ri&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ro&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Li extends rs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Za,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ht=new F,vs=new Xe;let rd=0;class on{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Po,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)vs.fromBufferAttribute(this,t),vs.applyMatrix3(e),this.setXY(t,vs.x,vs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix3(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix4(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyNormalMatrix(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.transformDirection(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Hi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Hi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Hi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Hi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Hi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),i=Ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),i=Ut(i,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Po&&(e.usage=this.usage),e}}class vc extends on{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Sc extends on{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class zt extends on{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ad=0;const Wt=new ct,wr=new vt,mi=new F,Ot=new ss,Xi=new ss,gt=new F;class An extends ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=is(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pc(e)?Sc:vc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,n){return Wt.makeTranslation(e,t,n),this.applyMatrix4(Wt),this}scale(e,t,n){return Wt.makeScale(e,t,n),this.applyMatrix4(Wt),this}lookAt(e){return wr.lookAt(e),wr.updateMatrix(),this.applyMatrix4(wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mi).negate(),this.translate(mi.x,mi.y,mi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ss);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Ot.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Ot.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Ot.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Ot.min),this.boundingBox.expandByPoint(Ot.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ro);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(Ot.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(gt.addVectors(Ot.min,Xi.min),Ot.expandByPoint(gt),gt.addVectors(Ot.max,Xi.max),Ot.expandByPoint(gt)):(Ot.expandByPoint(Xi.min),Ot.expandByPoint(Xi.max))}Ot.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)gt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(gt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)gt.fromBufferAttribute(o,c),l&&(mi.fromBufferAttribute(e,c),gt.add(mi)),i=Math.max(i,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new on(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new F,l[U]=new F;const c=new F,d=new F,h=new F,u=new Xe,p=new Xe,g=new Xe,v=new F,m=new F;function f(U,x,M){c.fromBufferAttribute(n,U),d.fromBufferAttribute(n,x),h.fromBufferAttribute(n,M),u.fromBufferAttribute(r,U),p.fromBufferAttribute(r,x),g.fromBufferAttribute(r,M),d.sub(c),h.sub(c),p.sub(u),g.sub(u);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(P),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(P),o[U].add(v),o[x].add(v),o[M].add(v),l[U].add(m),l[x].add(m),l[M].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let U=0,x=E.length;U<x;++U){const M=E[U],P=M.start,k=M.count;for(let H=P,Y=P+k;H<Y;H+=3)f(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const b=new F,A=new F,C=new F,w=new F;function R(U){C.fromBufferAttribute(i,U),w.copy(C);const x=o[U];b.copy(x),b.sub(C.multiplyScalar(C.dot(x))).normalize(),A.crossVectors(w,x);const P=A.dot(l[U])<0?-1:1;a.setXYZW(U,b.x,b.y,b.z,P)}for(let U=0,x=E.length;U<x;++U){const M=E[U],P=M.start,k=M.count;for(let H=P,Y=P+k;H<Y;H+=3)R(e.getX(H+0)),R(e.getX(H+1)),R(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new on(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const i=new F,r=new F,a=new F,o=new F,l=new F,c=new F,d=new F,h=new F;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,r),h.subVectors(i,r),d.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),h.subVectors(i,r),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*d;for(let f=0;f<d;f++)u[g++]=c[p++]}return new on(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new An,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,h=c.length;d<h;d++){const u=c[d],p=e(u,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(i[l]=d,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const d=i[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wo=new ct,Wn=new Zh,Ss=new ro,Xo=new F,Ms=new F,xs=new F,As=new F,Tr=new F,ys=new F,Yo=new F,bs=new F;class _t extends vt{constructor(e=new An,t=new Li){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){ys.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],h=r[l];d!==0&&(Tr.fromBufferAttribute(h,e),a?ys.addScaledVector(Tr,d):ys.addScaledVector(Tr.sub(t),d))}t.add(ys)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ss.copy(n.boundingSphere),Ss.applyMatrix4(r),Wn.copy(e.ray).recast(e.near),!(Ss.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(Ss,Xo)===null||Wn.origin.distanceToSquared(Xo)>(e.far-e.near)**2))&&(Wo.copy(r).invert(),Wn.copy(e.ray).applyMatrix4(Wo),!(n.boundingBox!==null&&Wn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wn)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=a[m.materialIndex],E=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let A=E,C=b;A<C;A+=3){const w=o.getX(A),R=o.getX(A+1),U=o.getX(A+2);i=Es(this,f,e,n,c,d,h,w,R,U),i&&(i.faceIndex=Math.floor(A/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const E=o.getX(m),b=o.getX(m+1),A=o.getX(m+2);i=Es(this,a,e,n,c,d,h,E,b,A),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=a[m.materialIndex],E=Math.max(m.start,p.start),b=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let A=E,C=b;A<C;A+=3){const w=A,R=A+1,U=A+2;i=Es(this,f,e,n,c,d,h,w,R,U),i&&(i.faceIndex=Math.floor(A/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const E=m,b=m+1,A=m+2;i=Es(this,a,e,n,c,d,h,E,b,A),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function od(s,e,t,n,i,r,a,o){let l;if(e.side===Et?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===ln,o),l===null)return null;bs.copy(o),bs.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(bs);return c<t.near||c>t.far?null:{distance:c,point:bs.clone(),object:s}}function Es(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,Ms),s.getVertexPosition(l,xs),s.getVertexPosition(c,As);const d=od(s,e,t,n,Ms,xs,As,Yo);if(d){const h=new F;Jt.getBarycoord(Yo,Ms,xs,As,h),i&&(d.uv=Jt.getInterpolatedAttribute(i,o,l,c,h,new Xe)),r&&(d.uv1=Jt.getInterpolatedAttribute(r,o,l,c,h,new Xe)),a&&(d.normal=Jt.getInterpolatedAttribute(a,o,l,c,h,new F),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new F,materialIndex:0};Jt.getNormal(Ms,xs,As,u.normal),d.face=u,d.barycoord=h}return d}class Ht extends An{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(d,3)),this.setAttribute("uv",new zt(h,2));function g(v,m,f,E,b,A,C,w,R,U,x){const M=A/R,P=C/U,k=A/2,H=C/2,Y=w/2,K=R+1,W=U+1;let Q=0,z=0;const ie=new F;for(let ae=0;ae<W;ae++){const pe=ae*P-H;for(let Ie=0;Ie<K;Ie++){const qe=Ie*M-k;ie[v]=qe*E,ie[m]=pe*b,ie[f]=Y,c.push(ie.x,ie.y,ie.z),ie[v]=0,ie[m]=0,ie[f]=w>0?1:-1,d.push(ie.x,ie.y,ie.z),h.push(Ie/R),h.push(1-ae/U),Q+=1}}for(let ae=0;ae<U;ae++)for(let pe=0;pe<R;pe++){const Ie=u+pe+K*ae,qe=u+pe+K*(ae+1),Ve=u+(pe+1)+K*(ae+1),Be=u+(pe+1)+K*ae;l.push(Ie,qe,Be),l.push(qe,Ve,Be),z+=6}o.addGroup(p,z,x),p+=z,u+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ht(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ui(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Pt(s){const e={};for(let t=0;t<s.length;t++){const n=Ui(s[t]);for(const i in n)e[i]=n[i]}return e}function ld(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Mc(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const cd={clone:Ui,merge:Pt};var hd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,dd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xn extends rs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hd,this.fragmentShader=dd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ui(e.uniforms),this.uniformsGroups=ld(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class xc extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=an,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cn=new F,qo=new Xe,Ko=new Xe;class Dt extends xc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Fa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Fa*2*Math.atan(Math.tan(ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Cn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z),Cn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z)}getViewSize(e,t){return this.getViewBounds(e,qo,Ko),t.subVectors(Ko,qo)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ar*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const gi=-90,_i=1;class ud extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Dt(gi,_i,e,t);i.layers=this.layers,this.add(i);const r=new Dt(gi,_i,e,t);r.layers=this.layers,this.add(r);const a=new Dt(gi,_i,e,t);a.layers=this.layers,this.add(a);const o=new Dt(gi,_i,e,t);o.layers=this.layers,this.add(o);const l=new Dt(gi,_i,e,t);l.layers=this.layers,this.add(l);const c=new Dt(gi,_i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===an)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,d),e.setRenderTarget(h,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ac extends wt{constructor(e=[],t=Pi,n,i,r,a,o,l,c,d){super(e,t,n,i,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fd extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ac(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ht(5,5,5),r=new xn({name:"CubemapFromEquirect",uniforms:Ui(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Et,blending:Ln});r.uniforms.tEquirect.value=t;const a=new _t(i,r),o=t.minFilter;return t.minFilter===In&&(t.minFilter=Qt),new ud(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}class Yt extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pd={type:"move"};class Cr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pd)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Yt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class ao{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ne(e),this.near=t,this.far=n}clone(){return new ao(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ys extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Rr=new F,md=new F,gd=new ke;class jn{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Rr.subVectors(n,t).cross(md.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Rr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||gd.getNormalMatrix(e),i=this.coplanarPoint(Rr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xn=new ro,_d=new Xe(.5,.5),ws=new F;class oo{constructor(e=new jn,t=new jn,n=new jn,i=new jn,r=new jn,a=new jn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=an,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],h=r[5],u=r[6],p=r[7],g=r[8],v=r[9],m=r[10],f=r[11],E=r[12],b=r[13],A=r[14],C=r[15];if(i[0].setComponents(c-a,p-d,f-g,C-E).normalize(),i[1].setComponents(c+a,p+d,f+g,C+E).normalize(),i[2].setComponents(c+o,p+h,f+v,C+b).normalize(),i[3].setComponents(c-o,p-h,f-v,C-b).normalize(),n)i[4].setComponents(l,u,m,A).normalize(),i[5].setComponents(c-l,p-u,f-m,C-A).normalize();else if(i[4].setComponents(c-l,p-u,f-m,C-A).normalize(),t===an)i[5].setComponents(c+l,p+u,f+m,C+A).normalize();else if(t===Xs)i[5].setComponents(l,u,m,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(e){Xn.center.set(0,0,0);const t=_d.distanceTo(e.center);return Xn.radius=.7071067811865476+t,Xn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(ws.x=i.normal.x>0?e.max.x:e.min.x,ws.y=i.normal.y>0?e.max.y:e.min.y,ws.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ws)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class yc extends wt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bc extends wt{constructor(e,t,n=ni,i,r,a,o=It,l=It,c,d=Zi,h=1){if(d!==Zi&&d!==Ji)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,i,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new so(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ec extends wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class as extends An{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,d=l+1,h=e/o,u=t/l,p=[],g=[],v=[],m=[];for(let f=0;f<d;f++){const E=f*u-a;for(let b=0;b<c;b++){const A=b*h-r;g.push(A,-E,0),v.push(0,0,1),m.push(b/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let E=0;E<o;E++){const b=E+c*f,A=E+c*(f+1),C=E+1+c*(f+1),w=E+1+c*f;p.push(b,A,w),p.push(A,C,w)}this.setIndex(p),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(v,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new as(e.width,e.height,e.widthSegments,e.heightSegments)}}class lo extends An{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],h=new F,u=new F,p=[],g=[],v=[],m=[];for(let f=0;f<=n;f++){const E=[],b=f/n;let A=0;f===0&&a===0?A=.5/t:f===n&&l===Math.PI&&(A=-.5/t);for(let C=0;C<=t;C++){const w=C/t;h.x=-e*Math.cos(i+w*r)*Math.sin(a+b*o),h.y=e*Math.cos(a+b*o),h.z=e*Math.sin(i+w*r)*Math.sin(a+b*o),g.push(h.x,h.y,h.z),u.copy(h).normalize(),v.push(u.x,u.y,u.z),m.push(w+A,1-b),E.push(c++)}d.push(E)}for(let f=0;f<n;f++)for(let E=0;E<t;E++){const b=d[f][E+1],A=d[f][E],C=d[f+1][E],w=d[f+1][E+1];(f!==0||a>0)&&p.push(b,A,w),(f!==n-1||l<Math.PI)&&p.push(A,C,w)}this.setIndex(p),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(v,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Qs extends rs{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uc,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Za,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class vd extends rs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sd extends rs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Pr={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Md{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(d){o++,r===!1&&i.onStart!==void 0&&i.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,i.onProgress!==void 0&&i.onProgress(d,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(d){i.onError!==void 0&&i.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=c.length;h<u;h+=2){const p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const xd=new Md;class co{constructor(e){this.manager=e!==void 0?e:xd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}co.DEFAULT_MATERIAL_NAME="__DEFAULT";const vi=new WeakMap;class Ad extends co{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Pr.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let h=vi.get(a);h===void 0&&(h=[],vi.set(a,h)),h.push({onLoad:t,onError:i})}return a}const o=Qi("img");function l(){d(),t&&t(this);const h=vi.get(this)||[];for(let u=0;u<h.length;u++){const p=h[u];p.onLoad&&p.onLoad(this)}vi.delete(this),r.manager.itemEnd(e)}function c(h){d(),i&&i(h),Pr.remove(`image:${e}`);const u=vi.get(this)||[];for(let p=0;p<u.length;p++){const g=u[p];g.onError&&g.onError(h)}vi.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Pr.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class yd extends co{constructor(e){super(e)}load(e,t,n,i){const r=new wt,a=new Ad(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class ho extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class bd extends ho{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Dr=new ct,jo=new F,$o=new F;class Ed{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.mapType=cn,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new oo,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;jo.setFromMatrixPosition(e.matrixWorld),t.position.copy(jo),$o.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($o),t.updateMatrixWorld(),Dr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dr,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Dr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class wc extends xc{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class wd extends Ed{constructor(){super(new wc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qs extends ho{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new wd}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class uo extends ho{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Td extends Dt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Tc{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Zo(s,e,t,n){const i=Cd(n);switch(t){case lc:return s*e;case hc:return s*e/i.components*i.byteLength;case to:return s*e/i.components*i.byteLength;case dc:return s*e*2/i.components*i.byteLength;case no:return s*e*2/i.components*i.byteLength;case cc:return s*e*3/i.components*i.byteLength;case en:return s*e*4/i.components*i.byteLength;case io:return s*e*4/i.components*i.byteLength;case Fs:case ks:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Bs:case Os:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ca:case da:return Math.max(s,16)*Math.max(e,8)/4;case la:case ha:return Math.max(s,8)*Math.max(e,8)/2;case ua:case fa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case pa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ma:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ga:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case _a:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case va:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Sa:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ma:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case xa:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Aa:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case ya:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case ba:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Ea:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case wa:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Ta:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Ca:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ra:case Pa:case Da:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Ia:case La:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Ua:case Na:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Cd(s){switch(s){case cn:case sc:return{byteLength:1,components:1};case ji:case rc:case ns:return{byteLength:2,components:1};case Qa:case eo:return{byteLength:2,components:4};case ni:case Ja:case Sn:return{byteLength:4,components:1};case ac:case oc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$a}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$a);function Cc(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Rd(s){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,h=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const d=l.array,h=l.updateRanges;if(s.bindBuffer(c,o),h.length===0)s.bufferSubData(c,0,d);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){const g=h[u],v=h[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,h[u]=v)}h.length=u+1;for(let p=0,g=h.length;p<g;p++){const v=h[p];s.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var Pd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Id=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ld=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ud=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Od=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$d=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Jd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Qd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,eu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,tu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,nu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,iu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,su=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ru=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,au="gl_FragColor = linearToOutputTexel( gl_FragColor );",ou=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,cu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,du=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,uu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_u=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,vu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Su=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Au=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Eu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Cu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ru=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Pu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Du=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Iu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Uu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ku=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ou=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Yu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ku=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ju=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$u=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ju=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Qu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ef=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,af=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,of=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,df=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ff=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,pf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,mf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,gf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_f=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,vf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Mf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Af=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ef=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Rf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Pf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Df=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,If=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ff=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,kf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Bf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Of=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Xf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,jf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$f=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Zf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Jf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,np=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ip=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,rp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ap=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,op=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,lp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:Pd,alphahash_pars_fragment:Dd,alphamap_fragment:Id,alphamap_pars_fragment:Ld,alphatest_fragment:Ud,alphatest_pars_fragment:Nd,aomap_fragment:Fd,aomap_pars_fragment:kd,batching_pars_vertex:Bd,batching_vertex:Od,begin_vertex:zd,beginnormal_vertex:Hd,bsdfs:Vd,iridescence_fragment:Gd,bumpmap_pars_fragment:Wd,clipping_planes_fragment:Xd,clipping_planes_pars_fragment:Yd,clipping_planes_pars_vertex:qd,clipping_planes_vertex:Kd,color_fragment:jd,color_pars_fragment:$d,color_pars_vertex:Zd,color_vertex:Jd,common:Qd,cube_uv_reflection_fragment:eu,defaultnormal_vertex:tu,displacementmap_pars_vertex:nu,displacementmap_vertex:iu,emissivemap_fragment:su,emissivemap_pars_fragment:ru,colorspace_fragment:au,colorspace_pars_fragment:ou,envmap_fragment:lu,envmap_common_pars_fragment:cu,envmap_pars_fragment:hu,envmap_pars_vertex:du,envmap_physical_pars_fragment:Au,envmap_vertex:uu,fog_vertex:fu,fog_pars_vertex:pu,fog_fragment:mu,fog_pars_fragment:gu,gradientmap_pars_fragment:_u,lightmap_pars_fragment:vu,lights_lambert_fragment:Su,lights_lambert_pars_fragment:Mu,lights_pars_begin:xu,lights_toon_fragment:yu,lights_toon_pars_fragment:bu,lights_phong_fragment:Eu,lights_phong_pars_fragment:wu,lights_physical_fragment:Tu,lights_physical_pars_fragment:Cu,lights_fragment_begin:Ru,lights_fragment_maps:Pu,lights_fragment_end:Du,logdepthbuf_fragment:Iu,logdepthbuf_pars_fragment:Lu,logdepthbuf_pars_vertex:Uu,logdepthbuf_vertex:Nu,map_fragment:Fu,map_pars_fragment:ku,map_particle_fragment:Bu,map_particle_pars_fragment:Ou,metalnessmap_fragment:zu,metalnessmap_pars_fragment:Hu,morphinstance_vertex:Vu,morphcolor_vertex:Gu,morphnormal_vertex:Wu,morphtarget_pars_vertex:Xu,morphtarget_vertex:Yu,normal_fragment_begin:qu,normal_fragment_maps:Ku,normal_pars_fragment:ju,normal_pars_vertex:$u,normal_vertex:Zu,normalmap_pars_fragment:Ju,clearcoat_normal_fragment_begin:Qu,clearcoat_normal_fragment_maps:ef,clearcoat_pars_fragment:tf,iridescence_pars_fragment:nf,opaque_fragment:sf,packing:rf,premultiplied_alpha_fragment:af,project_vertex:of,dithering_fragment:lf,dithering_pars_fragment:cf,roughnessmap_fragment:hf,roughnessmap_pars_fragment:df,shadowmap_pars_fragment:uf,shadowmap_pars_vertex:ff,shadowmap_vertex:pf,shadowmask_pars_fragment:mf,skinbase_vertex:gf,skinning_pars_vertex:_f,skinning_vertex:vf,skinnormal_vertex:Sf,specularmap_fragment:Mf,specularmap_pars_fragment:xf,tonemapping_fragment:Af,tonemapping_pars_fragment:yf,transmission_fragment:bf,transmission_pars_fragment:Ef,uv_pars_fragment:wf,uv_pars_vertex:Tf,uv_vertex:Cf,worldpos_vertex:Rf,background_vert:Pf,background_frag:Df,backgroundCube_vert:If,backgroundCube_frag:Lf,cube_vert:Uf,cube_frag:Nf,depth_vert:Ff,depth_frag:kf,distanceRGBA_vert:Bf,distanceRGBA_frag:Of,equirect_vert:zf,equirect_frag:Hf,linedashed_vert:Vf,linedashed_frag:Gf,meshbasic_vert:Wf,meshbasic_frag:Xf,meshlambert_vert:Yf,meshlambert_frag:qf,meshmatcap_vert:Kf,meshmatcap_frag:jf,meshnormal_vert:$f,meshnormal_frag:Zf,meshphong_vert:Jf,meshphong_frag:Qf,meshphysical_vert:ep,meshphysical_frag:tp,meshtoon_vert:np,meshtoon_frag:ip,points_vert:sp,points_frag:rp,shadow_vert:ap,shadow_frag:op,sprite_vert:lp,sprite_frag:cp},re={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},rn={basic:{uniforms:Pt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Pt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Ne(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Pt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Pt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Pt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Ne(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Pt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Pt([re.points,re.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Pt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Pt([re.common,re.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Pt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Pt([re.sprite,re.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Pt([re.common,re.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Pt([re.lights,re.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};rn.physical={uniforms:Pt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const Ts={r:0,b:0,g:0},Yn=new tn,hp=new ct;function dp(s,e,t,n,i,r,a){const o=new Ne(0);let l=r===!0?0:1,c,d,h=null,u=0,p=null;function g(b){let A=b.isScene===!0?b.background:null;return A&&A.isTexture&&(A=(b.backgroundBlurriness>0?t:e).get(A)),A}function v(b){let A=!1;const C=g(b);C===null?f(o,l):C&&C.isColor&&(f(C,1),A=!0);const w=s.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||A)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(b,A){const C=g(A);C&&(C.isCubeTexture||C.mapping===Js)?(d===void 0&&(d=new _t(new Ht(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:Ui(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Et,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(w,R,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),Yn.copy(A.backgroundRotation),Yn.x*=-1,Yn.y*=-1,Yn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Yn.y*=-1,Yn.z*=-1),d.material.uniforms.envMap.value=C,d.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(hp.makeRotationFromEuler(Yn)),d.material.toneMapped=je.getTransfer(C.colorSpace)!==Je,(h!==C||u!==C.version||p!==s.toneMapping)&&(d.material.needsUpdate=!0,h=C,u=C.version,p=s.toneMapping),d.layers.enableAll(),b.unshift(d,d.geometry,d.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new _t(new as(2,2),new xn({name:"BackgroundMaterial",uniforms:Ui(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=je.getTransfer(C.colorSpace)!==Je,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(h!==C||u!==C.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,h=C,u=C.version,p=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function f(b,A){b.getRGB(Ts,Mc(s)),n.buffers.color.setClear(Ts.r,Ts.g,Ts.b,A,a)}function E(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,A=1){o.set(b),l=A,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,f(o,l)},render:v,addToRenderList:m,dispose:E}}function up(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,a=!1;function o(M,P,k,H,Y){let K=!1;const W=h(H,k,P);r!==W&&(r=W,c(r.object)),K=p(M,H,k,Y),K&&g(M,H,k,Y),Y!==null&&e.update(Y,s.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,A(M,P,k,H),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function d(M){return s.deleteVertexArray(M)}function h(M,P,k){const H=k.wireframe===!0;let Y=n[M.id];Y===void 0&&(Y={},n[M.id]=Y);let K=Y[P.id];K===void 0&&(K={},Y[P.id]=K);let W=K[H];return W===void 0&&(W=u(l()),K[H]=W),W}function u(M){const P=[],k=[],H=[];for(let Y=0;Y<t;Y++)P[Y]=0,k[Y]=0,H[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:k,attributeDivisors:H,object:M,attributes:{},index:null}}function p(M,P,k,H){const Y=r.attributes,K=P.attributes;let W=0;const Q=k.getAttributes();for(const z in Q)if(Q[z].location>=0){const ae=Y[z];let pe=K[z];if(pe===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(pe=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(pe=M.instanceColor)),ae===void 0||ae.attribute!==pe||pe&&ae.data!==pe.data)return!0;W++}return r.attributesNum!==W||r.index!==H}function g(M,P,k,H){const Y={},K=P.attributes;let W=0;const Q=k.getAttributes();for(const z in Q)if(Q[z].location>=0){let ae=K[z];ae===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor));const pe={};pe.attribute=ae,ae&&ae.data&&(pe.data=ae.data),Y[z]=pe,W++}r.attributes=Y,r.attributesNum=W,r.index=H}function v(){const M=r.newAttributes;for(let P=0,k=M.length;P<k;P++)M[P]=0}function m(M){f(M,0)}function f(M,P){const k=r.newAttributes,H=r.enabledAttributes,Y=r.attributeDivisors;k[M]=1,H[M]===0&&(s.enableVertexAttribArray(M),H[M]=1),Y[M]!==P&&(s.vertexAttribDivisor(M,P),Y[M]=P)}function E(){const M=r.newAttributes,P=r.enabledAttributes;for(let k=0,H=P.length;k<H;k++)P[k]!==M[k]&&(s.disableVertexAttribArray(k),P[k]=0)}function b(M,P,k,H,Y,K,W){W===!0?s.vertexAttribIPointer(M,P,k,Y,K):s.vertexAttribPointer(M,P,k,H,Y,K)}function A(M,P,k,H){v();const Y=H.attributes,K=k.getAttributes(),W=P.defaultAttributeValues;for(const Q in K){const z=K[Q];if(z.location>=0){let ie=Y[Q];if(ie===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&(ie=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&(ie=M.instanceColor)),ie!==void 0){const ae=ie.normalized,pe=ie.itemSize,Ie=e.get(ie);if(Ie===void 0)continue;const qe=Ie.buffer,Ve=Ie.type,Be=Ie.bytesPerElement,X=Ve===s.INT||Ve===s.UNSIGNED_INT||ie.gpuType===Ja;if(ie.isInterleavedBufferAttribute){const $=ie.data,ue=$.stride,Pe=ie.offset;if($.isInstancedInterleavedBuffer){for(let Ae=0;Ae<z.locationSize;Ae++)f(z.location+Ae,$.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Ae=0;Ae<z.locationSize;Ae++)m(z.location+Ae);s.bindBuffer(s.ARRAY_BUFFER,qe);for(let Ae=0;Ae<z.locationSize;Ae++)b(z.location+Ae,pe/z.locationSize,Ve,ae,ue*Be,(Pe+pe/z.locationSize*Ae)*Be,X)}else{if(ie.isInstancedBufferAttribute){for(let $=0;$<z.locationSize;$++)f(z.location+$,ie.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let $=0;$<z.locationSize;$++)m(z.location+$);s.bindBuffer(s.ARRAY_BUFFER,qe);for(let $=0;$<z.locationSize;$++)b(z.location+$,pe/z.locationSize,Ve,ae,pe*Be,pe/z.locationSize*$*Be,X)}}else if(W!==void 0){const ae=W[Q];if(ae!==void 0)switch(ae.length){case 2:s.vertexAttrib2fv(z.location,ae);break;case 3:s.vertexAttrib3fv(z.location,ae);break;case 4:s.vertexAttrib4fv(z.location,ae);break;default:s.vertexAttrib1fv(z.location,ae)}}}}E()}function C(){U();for(const M in n){const P=n[M];for(const k in P){const H=P[k];for(const Y in H)d(H[Y].object),delete H[Y];delete P[k]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const k in P){const H=P[k];for(const Y in H)d(H[Y].object),delete H[Y];delete P[k]}delete n[M.id]}function R(M){for(const P in n){const k=n[P];if(k[M.id]===void 0)continue;const H=k[M.id];for(const Y in H)d(H[Y].object),delete H[Y];delete k[M.id]}}function U(){x(),a=!0,r!==i&&(r=i,c(r.object))}function x(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:U,resetDefaultState:x,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:E}}function fp(s,e,t){let n;function i(c){n=c}function r(c,d){s.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,h){h!==0&&(s.drawArraysInstanced(n,c,d,h),t.update(d,n,h))}function o(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,h);let p=0;for(let g=0;g<h;g++)p+=d[g];t.update(p,n,1)}function l(c,d,h,u){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],d[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,d,0,u,0,h);let g=0;for(let v=0;v<h;v++)g+=d[v]*u[v];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function pp(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==en&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const U=R===ns&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==cn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Sn&&!U)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),E=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),A=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:A,vertexTextures:C,maxSamples:w}}function mp(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new jn,o=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||n!==0||i;return i=u,n=h.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,f=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?d(null):c();else{const E=r?0:n,b=E*4;let A=f.clippingState||null;l.value=A,A=d(g,u,b,p);for(let C=0;C!==b;++C)A[C]=t[C];f.clippingState=A,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,p,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const f=p+v*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,A=p;b!==v;++b,A+=4)a.copy(h[b]).applyMatrix4(E,o),a.normal.toArray(m,A),m[A+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function gp(s){let e=new WeakMap;function t(a,o){return o===sa?a.mapping=Pi:o===ra&&(a.mapping=Di),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===sa||o===ra)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new fd(l.height);return c.fromEquirectangularTexture(s,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const yi=4,Jo=[.125,.215,.35,.446,.526,.582],ei=20,Ir=new wc,Qo=new Ne;let Lr=null,Ur=0,Nr=0,Fr=!1;const $n=(1+Math.sqrt(5))/2,Si=1/$n,el=[new F(-$n,Si,0),new F($n,Si,0),new F(-Si,0,$n),new F(Si,0,$n),new F(0,$n,-Si),new F(0,$n,Si),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],_p=new F;class tl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=_p}=r;Lr=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel(),Fr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Lr,Ur,Nr),this._renderer.xr.enabled=Fr,e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pi||e.mapping===Di?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lr=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel(),Fr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:ns,format:en,colorSpace:Ii,depthBuffer:!1},i=nl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vp(r)),this._blurMaterial=Sp(r,e,t)}return i}_compileMaterial(e){const t=new _t(this._lodPlanes[0],e);this._renderer.compile(t,Ir)}_sceneToCubeUV(e,t,n,i,r){const l=new Dt(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(Qo),h.toneMapping=Un,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null));const v=new Li({name:"PMREM.Background",side:Et,depthWrite:!1,depthTest:!1}),m=new _t(new Ht,v);let f=!1;const E=e.background;E?E.isColor&&(v.color.copy(E),e.background=null,f=!0):(v.color.copy(Qo),f=!0);for(let b=0;b<6;b++){const A=b%3;A===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[b],r.y,r.z)):A===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[b]));const C=this._cubeSize;Cs(i,A*C,b>2?C:0,C,C),h.setRenderTarget(i),f&&h.render(m,l),h.render(e,l)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=p,h.autoClear=u,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Pi||e.mapping===Di;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=sl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=il());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new _t(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Cs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ir)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=el[(i-r-1)%el.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new _t(this._lodPlanes[i],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ei-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):ei;m>ei&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ei}`);const f=[];let E=0;for(let R=0;R<ei;++R){const U=R/v,x=Math.exp(-U*U/2);f.push(x),R===0?E+=x:R<m&&(E+=2*x)}for(let R=0;R<f.length;R++)f[R]=f[R]/E;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-n;const A=this._sizeLods[i],C=3*A*(i>b-yi?i-b+yi:0),w=4*(this._cubeSize-A);Cs(t,C,w,3*A,2*A),l.setRenderTarget(t),l.render(h,Ir)}}function vp(s){const e=[],t=[],n=[];let i=s;const r=s-yi+1+Jo.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>s-yi?l=Jo[a-s+yi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,v=3,m=2,f=1,E=new Float32Array(v*g*p),b=new Float32Array(m*g*p),A=new Float32Array(f*g*p);for(let w=0;w<p;w++){const R=w%3*2/3-1,U=w>2?0:-1,x=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];E.set(x,v*g*w),b.set(u,m*g*w);const M=[w,w,w,w,w,w];A.set(M,f*g*w)}const C=new An;C.setAttribute("position",new on(E,v)),C.setAttribute("uv",new on(b,m)),C.setAttribute("faceIndex",new on(A,f)),e.push(C),i>yi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function nl(s,e,t){const n=new ii(s,e,t);return n.texture.mapping=Js,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Cs(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Sp(s,e,t){const n=new Float32Array(ei),i=new F(0,1,0);return new xn({name:"SphericalGaussianBlur",defines:{n:ei,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function il(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function sl(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function fo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Mp(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===sa||l===ra,d=l===Pi||l===Di;if(c||d){let h=e.get(o);const u=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new tl(s)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return c&&p&&p.height>0||d&&p&&i(p)?(t===null&&(t=new tl(s)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function i(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function xp(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&es("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ap(s,e,t,n){const i={},r=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete i[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function l(h){const u=h.attributes;for(const p in u)e.update(u[p],s.ARRAY_BUFFER)}function c(h){const u=[],p=h.index,g=h.attributes.position;let v=0;if(p!==null){const E=p.array;v=p.version;for(let b=0,A=E.length;b<A;b+=3){const C=E[b+0],w=E[b+1],R=E[b+2];u.push(C,w,w,R,R,C)}}else if(g!==void 0){const E=g.array;v=g.version;for(let b=0,A=E.length/3-1;b<A;b+=3){const C=b+0,w=b+1,R=b+2;u.push(C,w,w,R,R,C)}}else return;const m=new(pc(u)?Sc:vc)(u,1);m.version=v;const f=r.get(h);f&&e.remove(f),r.set(h,m)}function d(h){const u=r.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function yp(s,e,t){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,p){s.drawElements(n,p,r,u*a),t.update(p,n,1)}function c(u,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,u*a,g),t.update(p,n,g))}function d(u,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function h(u,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)c(u[f]/a,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,v,0,g);let f=0;for(let E=0;E<g;E++)f+=p[E]*v[E];t.update(f,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function bp(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Ep(s,e,t){const n=new WeakMap,i=new ot;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=n.get(o);if(u===void 0||u.count!==h){let x=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",x)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let b=0;p===!0&&(b=1),g===!0&&(b=2),v===!0&&(b=3);let A=o.attributes.position.count*b,C=1;A>e.maxTextureSize&&(C=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const w=new Float32Array(A*C*4*h),R=new mc(w,A,C,h);R.type=Sn,R.needsUpdate=!0;const U=b*4;for(let M=0;M<h;M++){const P=m[M],k=f[M],H=E[M],Y=A*C*4*M;for(let K=0;K<P.count;K++){const W=K*U;p===!0&&(i.fromBufferAttribute(P,K),w[Y+W+0]=i.x,w[Y+W+1]=i.y,w[Y+W+2]=i.z,w[Y+W+3]=0),g===!0&&(i.fromBufferAttribute(k,K),w[Y+W+4]=i.x,w[Y+W+5]=i.y,w[Y+W+6]=i.z,w[Y+W+7]=0),v===!0&&(i.fromBufferAttribute(H,K),w[Y+W+8]=i.x,w[Y+W+9]=i.y,w[Y+W+10]=i.z,w[Y+W+11]=H.itemSize===4?i.w:1)}}u={count:h,texture:R,size:new Xe(A,C)},n.set(o,u),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function wp(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,h=e.get(l,d);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return h}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Rc=new wt,rl=new bc(1,1),Pc=new mc,Dc=new jh,Ic=new Ac,al=[],ol=[],ll=new Float32Array(16),cl=new Float32Array(9),hl=new Float32Array(4);function Bi(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=al[i];if(r===void 0&&(r=new Float32Array(i),al[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function ft(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function pt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function er(s,e){let t=ol[e];t===void 0&&(t=new Int32Array(e),ol[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Tp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Cp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2fv(this.addr,e),pt(t,e)}}function Rp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;s.uniform3fv(this.addr,e),pt(t,e)}}function Pp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4fv(this.addr,e),pt(t,e)}}function Dp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;hl.set(n),s.uniformMatrix2fv(this.addr,!1,hl),pt(t,n)}}function Ip(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;cl.set(n),s.uniformMatrix3fv(this.addr,!1,cl),pt(t,n)}}function Lp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;ll.set(n),s.uniformMatrix4fv(this.addr,!1,ll),pt(t,n)}}function Up(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Np(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2iv(this.addr,e),pt(t,e)}}function Fp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;s.uniform3iv(this.addr,e),pt(t,e)}}function kp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4iv(this.addr,e),pt(t,e)}}function Bp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Op(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2uiv(this.addr,e),pt(t,e)}}function zp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;s.uniform3uiv(this.addr,e),pt(t,e)}}function Hp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4uiv(this.addr,e),pt(t,e)}}function Vp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(rl.compareFunction=fc,r=rl):r=Rc,t.setTexture2D(e||r,i)}function Gp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Dc,i)}function Wp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Ic,i)}function Xp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Pc,i)}function Yp(s){switch(s){case 5126:return Tp;case 35664:return Cp;case 35665:return Rp;case 35666:return Pp;case 35674:return Dp;case 35675:return Ip;case 35676:return Lp;case 5124:case 35670:return Up;case 35667:case 35671:return Np;case 35668:case 35672:return Fp;case 35669:case 35673:return kp;case 5125:return Bp;case 36294:return Op;case 36295:return zp;case 36296:return Hp;case 35678:case 36198:case 36298:case 36306:case 35682:return Vp;case 35679:case 36299:case 36307:return Gp;case 35680:case 36300:case 36308:case 36293:return Wp;case 36289:case 36303:case 36311:case 36292:return Xp}}function qp(s,e){s.uniform1fv(this.addr,e)}function Kp(s,e){const t=Bi(e,this.size,2);s.uniform2fv(this.addr,t)}function jp(s,e){const t=Bi(e,this.size,3);s.uniform3fv(this.addr,t)}function $p(s,e){const t=Bi(e,this.size,4);s.uniform4fv(this.addr,t)}function Zp(s,e){const t=Bi(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Jp(s,e){const t=Bi(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Qp(s,e){const t=Bi(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function em(s,e){s.uniform1iv(this.addr,e)}function tm(s,e){s.uniform2iv(this.addr,e)}function nm(s,e){s.uniform3iv(this.addr,e)}function im(s,e){s.uniform4iv(this.addr,e)}function sm(s,e){s.uniform1uiv(this.addr,e)}function rm(s,e){s.uniform2uiv(this.addr,e)}function am(s,e){s.uniform3uiv(this.addr,e)}function om(s,e){s.uniform4uiv(this.addr,e)}function lm(s,e,t){const n=this.cache,i=e.length,r=er(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Rc,r[a])}function cm(s,e,t){const n=this.cache,i=e.length,r=er(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Dc,r[a])}function hm(s,e,t){const n=this.cache,i=e.length,r=er(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Ic,r[a])}function dm(s,e,t){const n=this.cache,i=e.length,r=er(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Pc,r[a])}function um(s){switch(s){case 5126:return qp;case 35664:return Kp;case 35665:return jp;case 35666:return $p;case 35674:return Zp;case 35675:return Jp;case 35676:return Qp;case 5124:case 35670:return em;case 35667:case 35671:return tm;case 35668:case 35672:return nm;case 35669:case 35673:return im;case 5125:return sm;case 36294:return rm;case 36295:return am;case 36296:return om;case 35678:case 36198:case 36298:case 36306:case 35682:return lm;case 35679:case 36299:case 36307:return cm;case 35680:case 36300:case 36308:case 36293:return hm;case 36289:case 36303:case 36311:case 36292:return dm}}class fm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Yp(t.type)}}class pm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=um(t.type)}}class mm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const kr=/(\w+)(\])?(\[|\.)?/g;function dl(s,e){s.seq.push(e),s.map[e.id]=e}function gm(s,e,t){const n=s.name,i=n.length;for(kr.lastIndex=0;;){const r=kr.exec(n),a=kr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){dl(t,c===void 0?new fm(o,s,e):new pm(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new mm(o),dl(t,h)),t=h}}}class zs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);gm(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function ul(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const _m=37297;let vm=0;function Sm(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const fl=new ke;function Mm(s){je._getMatrix(fl,je.workingColorSpace,s);const e=`mat3( ${fl.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(s)){case Ws:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function pl(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Sm(s.getShaderSource(e),o)}else return r}function xm(s,e){const t=Mm(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Am(s,e){let t;switch(e){case bh:t="Linear";break;case Eh:t="Reinhard";break;case wh:t="Cineon";break;case nc:t="ACESFilmic";break;case Ch:t="AgX";break;case Rh:t="Neutral";break;case Th:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Rs=new F;function ym(){je.getLuminanceCoefficients(Rs);const s=Rs.x.toFixed(4),e=Rs.y.toFixed(4),t=Rs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qi).join(`
`)}function Em(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function wm(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function qi(s){return s!==""}function ml(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gl(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Tm=/^[ \t]*#include +<([\w\d./]+)>/gm;function ka(s){return s.replace(Tm,Rm)}const Cm=new Map;function Rm(s,e){let t=ze[e];if(t===void 0){const n=Cm.get(e);if(n!==void 0)t=ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ka(t)}const Pm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _l(s){return s.replace(Pm,Dm)}function Dm(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function vl(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Im(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ec?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===tc?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===gn&&(e="SHADOWMAP_TYPE_VSM"),e}function Lm(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Pi:case Di:e="ENVMAP_TYPE_CUBE";break;case Js:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Um(s){let e="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===Di&&(e="ENVMAP_MODE_REFRACTION"),e}function Nm(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Za:e="ENVMAP_BLENDING_MULTIPLY";break;case Ah:e="ENVMAP_BLENDING_MIX";break;case yh:e="ENVMAP_BLENDING_ADD";break}return e}function Fm(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function km(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Im(t),c=Lm(t),d=Um(t),h=Nm(t),u=Fm(t),p=bm(t),g=Em(r),v=i.createProgram();let m,f,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qi).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qi).join(`
`),f.length>0&&(f+=`
`)):(m=[vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qi).join(`
`),f=[vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Un?"#define TONE_MAPPING":"",t.toneMapping!==Un?ze.tonemapping_pars_fragment:"",t.toneMapping!==Un?Am("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,xm("linearToOutputTexel",t.outputColorSpace),ym(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qi).join(`
`)),a=ka(a),a=ml(a,t),a=gl(a,t),o=ka(o),o=ml(o,t),o=gl(o,t),a=_l(a),o=_l(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Do?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Do?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=E+m+a,A=E+f+o,C=ul(i,i.VERTEX_SHADER,b),w=ul(i,i.FRAGMENT_SHADER,A);i.attachShader(v,C),i.attachShader(v,w),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function R(P){if(s.debug.checkShaderErrors){const k=i.getProgramInfoLog(v)||"",H=i.getShaderInfoLog(C)||"",Y=i.getShaderInfoLog(w)||"",K=k.trim(),W=H.trim(),Q=Y.trim();let z=!0,ie=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,C,w);else{const ae=pl(i,C,"vertex"),pe=pl(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+K+`
`+ae+`
`+pe)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(W===""||Q==="")&&(ie=!1);ie&&(P.diagnostics={runnable:z,programLog:K,vertexShader:{log:W,prefix:m},fragmentShader:{log:Q,prefix:f}})}i.deleteShader(C),i.deleteShader(w),U=new zs(i,v),x=wm(i,v)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let x;this.getAttributes=function(){return x===void 0&&R(this),x};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,_m)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vm++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=w,this}let Bm=0;class Om{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new zm(e),t.set(e,n)),n}}class zm{constructor(e){this.id=Bm++,this.code=e,this.usedTimes=0}}function Hm(s,e,t,n,i,r,a){const o=new gc,l=new Om,c=new Set,d=[],h=i.logarithmicDepthBuffer,u=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,M,P,k,H){const Y=k.fog,K=H.geometry,W=x.isMeshStandardMaterial?k.environment:null,Q=(x.isMeshStandardMaterial?t:e).get(x.envMap||W),z=Q&&Q.mapping===Js?Q.image.height:null,ie=g[x.type];x.precision!==null&&(p=i.getMaxPrecision(x.precision),p!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const ae=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,pe=ae!==void 0?ae.length:0;let Ie=0;K.morphAttributes.position!==void 0&&(Ie=1),K.morphAttributes.normal!==void 0&&(Ie=2),K.morphAttributes.color!==void 0&&(Ie=3);let qe,Ve,Be,X;if(ie){const $e=rn[ie];qe=$e.vertexShader,Ve=$e.fragmentShader}else qe=x.vertexShader,Ve=x.fragmentShader,l.update(x),Be=l.getVertexShaderID(x),X=l.getFragmentShaderID(x);const $=s.getRenderTarget(),ue=s.state.buffers.depth.getReversed(),Pe=H.isInstancedMesh===!0,Ae=H.isBatchedMesh===!0,Ye=!!x.map,At=!!x.matcap,T=!!Q,nt=!!x.aoMap,Ue=!!x.lightMap,Ce=!!x.bumpMap,ge=!!x.normalMap,it=!!x.displacementMap,_e=!!x.emissiveMap,Oe=!!x.metalnessMap,mt=!!x.roughnessMap,lt=x.anisotropy>0,y=x.clearcoat>0,_=x.dispersion>0,N=x.iridescence>0,G=x.sheen>0,j=x.transmission>0,V=lt&&!!x.anisotropyMap,xe=y&&!!x.clearcoatMap,ne=y&&!!x.clearcoatNormalMap,ve=y&&!!x.clearcoatRoughnessMap,Se=N&&!!x.iridescenceMap,ee=N&&!!x.iridescenceThicknessMap,ce=G&&!!x.sheenColorMap,Te=G&&!!x.sheenRoughnessMap,Me=!!x.specularMap,oe=!!x.specularColorMap,Fe=!!x.specularIntensityMap,D=j&&!!x.transmissionMap,te=j&&!!x.thicknessMap,se=!!x.gradientMap,de=!!x.alphaMap,Z=x.alphaTest>0,q=!!x.alphaHash,me=!!x.extensions;let Le=Un;x.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Le=s.toneMapping);const et={shaderID:ie,shaderType:x.type,shaderName:x.name,vertexShader:qe,fragmentShader:Ve,defines:x.defines,customVertexShaderID:Be,customFragmentShaderID:X,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,batching:Ae,batchingColor:Ae&&H._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&H.instanceColor!==null,instancingMorph:Pe&&H.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:$===null?s.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Ii,alphaToCoverage:!!x.alphaToCoverage,map:Ye,matcap:At,envMap:T,envMapMode:T&&Q.mapping,envMapCubeUVHeight:z,aoMap:nt,lightMap:Ue,bumpMap:Ce,normalMap:ge,displacementMap:u&&it,emissiveMap:_e,normalMapObjectSpace:ge&&x.normalMapType===Lh,normalMapTangentSpace:ge&&x.normalMapType===uc,metalnessMap:Oe,roughnessMap:mt,anisotropy:lt,anisotropyMap:V,clearcoat:y,clearcoatMap:xe,clearcoatNormalMap:ne,clearcoatRoughnessMap:ve,dispersion:_,iridescence:N,iridescenceMap:Se,iridescenceThicknessMap:ee,sheen:G,sheenColorMap:ce,sheenRoughnessMap:Te,specularMap:Me,specularColorMap:oe,specularIntensityMap:Fe,transmission:j,transmissionMap:D,thicknessMap:te,gradientMap:se,opaque:x.transparent===!1&&x.blending===Ei&&x.alphaToCoverage===!1,alphaMap:de,alphaTest:Z,alphaHash:q,combine:x.combine,mapUv:Ye&&v(x.map.channel),aoMapUv:nt&&v(x.aoMap.channel),lightMapUv:Ue&&v(x.lightMap.channel),bumpMapUv:Ce&&v(x.bumpMap.channel),normalMapUv:ge&&v(x.normalMap.channel),displacementMapUv:it&&v(x.displacementMap.channel),emissiveMapUv:_e&&v(x.emissiveMap.channel),metalnessMapUv:Oe&&v(x.metalnessMap.channel),roughnessMapUv:mt&&v(x.roughnessMap.channel),anisotropyMapUv:V&&v(x.anisotropyMap.channel),clearcoatMapUv:xe&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:ne&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:Te&&v(x.sheenRoughnessMap.channel),specularMapUv:Me&&v(x.specularMap.channel),specularColorMapUv:oe&&v(x.specularColorMap.channel),specularIntensityMapUv:Fe&&v(x.specularIntensityMap.channel),transmissionMapUv:D&&v(x.transmissionMap.channel),thicknessMapUv:te&&v(x.thicknessMap.channel),alphaMapUv:de&&v(x.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(ge||lt),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!K.attributes.uv&&(Ye||de),fog:!!Y,useFog:x.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ue,skinning:H.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:Ie,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Le,decodeVideoTexture:Ye&&x.map.isVideoTexture===!0&&je.getTransfer(x.map.colorSpace)===Je,decodeVideoTextureEmissive:_e&&x.emissiveMap.isVideoTexture===!0&&je.getTransfer(x.emissiveMap.colorSpace)===Je,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===_n,flipSided:x.side===Et,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:me&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&x.extensions.multiDraw===!0||Ae)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return et.vertexUv1s=c.has(1),et.vertexUv2s=c.has(2),et.vertexUv3s=c.has(3),c.clear(),et}function f(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)M.push(P),M.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(E(M,x),b(M,x),M.push(s.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function E(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function b(x,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),x.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),x.push(o.mask)}function A(x){const M=g[x.type];let P;if(M){const k=rn[M];P=cd.clone(k.uniforms)}else P=x.uniforms;return P}function C(x,M){let P;for(let k=0,H=d.length;k<H;k++){const Y=d[k];if(Y.cacheKey===M){P=Y,++P.usedTimes;break}}return P===void 0&&(P=new km(s,M,x,r),d.push(P)),P}function w(x){if(--x.usedTimes===0){const M=d.indexOf(x);d[M]=d[d.length-1],d.pop(),x.destroy()}}function R(x){l.remove(x)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:A,acquireProgram:C,releaseProgram:w,releaseShaderCache:R,programs:d,dispose:U}}function Vm(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Gm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Sl(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Ml(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(h,u,p,g,v,m){let f=s[e];return f===void 0?(f={id:h.id,object:h,geometry:u,material:p,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},s[e]=f):(f.id=h.id,f.object=h,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=v,f.group=m),e++,f}function o(h,u,p,g,v,m){const f=a(h,u,p,g,v,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):t.push(f)}function l(h,u,p,g,v,m){const f=a(h,u,p,g,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function c(h,u){t.length>1&&t.sort(h||Gm),n.length>1&&n.sort(u||Sl),i.length>1&&i.sort(u||Sl)}function d(){for(let h=e,u=s.length;h<u;h++){const p=s[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:d,sort:c}}function Wm(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Ml,s.set(n,[a])):i>=r.length?(a=new Ml,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Xm(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Ne};break;case"SpotLight":t={position:new F,direction:new F,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new F,halfWidth:new F,halfHeight:new F};break}return s[e.id]=t,t}}}function Ym(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let qm=0;function Km(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function jm(s){const e=new Xm,t=Ym(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);const i=new F,r=new ct,a=new ct;function o(c){let d=0,h=0,u=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,E=0,b=0,A=0,C=0,w=0,R=0;c.sort(Km);for(let x=0,M=c.length;x<M;x++){const P=c[x],k=P.color,H=P.intensity,Y=P.distance,K=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=k.r*H,h+=k.g*H,u+=k.b*H;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],H);R++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Q=P.shadow,z=t.get(P);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,n.directionalShadow[p]=z,n.directionalShadowMap[p]=K,n.directionalShadowMatrix[p]=P.shadow.matrix,E++}n.directional[p]=W,p++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(k).multiplyScalar(H),W.distance=Y,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[v]=W;const Q=P.shadow;if(P.map&&(n.spotLightMap[C]=P.map,C++,Q.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[v]=Q.matrix,P.castShadow){const z=t.get(P);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,n.spotShadow[v]=z,n.spotShadowMap[v]=K,A++}v++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(k).multiplyScalar(H),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=W,m++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const Q=P.shadow,z=t.get(P);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,z.shadowCameraNear=Q.camera.near,z.shadowCameraFar=Q.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=P.shadow.matrix,b++}n.point[g]=W,g++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(H),W.groundColor.copy(P.groundColor).multiplyScalar(H),n.hemi[f]=W,f++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;const U=n.hash;(U.directionalLength!==p||U.pointLength!==g||U.spotLength!==v||U.rectAreaLength!==m||U.hemiLength!==f||U.numDirectionalShadows!==E||U.numPointShadows!==b||U.numSpotShadows!==A||U.numSpotMaps!==C||U.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=A+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,U.directionalLength=p,U.pointLength=g,U.spotLength=v,U.rectAreaLength=m,U.hemiLength=f,U.numDirectionalShadows=E,U.numPointShadows=b,U.numSpotShadows=A,U.numSpotMaps=C,U.numLightProbes=R,n.version=qm++)}function l(c,d){let h=0,u=0,p=0,g=0,v=0;const m=d.matrixWorldInverse;for(let f=0,E=c.length;f<E;f++){const b=c[f];if(b.isDirectionalLight){const A=n.directional[h];A.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),h++}else if(b.isSpotLight){const A=n.spot[p];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const A=n.rectArea[g];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const A=n.point[u];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),u++}else if(b.isHemisphereLight){const A=n.hemi[v];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function xl(s){const e=new jm(s),t=[],n=[];function i(d){c.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function $m(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new xl(s),e.set(i,[o])):r>=a.length?(o=new xl(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Zm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Qm(s,e,t){let n=new oo;const i=new Xe,r=new Xe,a=new ot,o=new vd({depthPacking:Ih}),l=new Sd,c={},d=t.maxTextureSize,h={[ln]:Et,[Et]:ln,[_n]:_n},u=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:Zm,fragmentShader:Jm}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new An;g.setAttribute("position",new on(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new _t(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ec;let f=this.type;this.render=function(w,R,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const x=s.getRenderTarget(),M=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Ln),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const H=f!==gn&&this.type===gn,Y=f===gn&&this.type!==gn;for(let K=0,W=w.length;K<W;K++){const Q=w[K],z=Q.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const ie=z.getFrameExtents();if(i.multiply(ie),r.copy(z.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(r.x=Math.floor(d/ie.x),i.x=r.x*ie.x,z.mapSize.x=r.x),i.y>d&&(r.y=Math.floor(d/ie.y),i.y=r.y*ie.y,z.mapSize.y=r.y)),z.map===null||H===!0||Y===!0){const pe=this.type!==gn?{minFilter:It,magFilter:It}:{};z.map!==null&&z.map.dispose(),z.map=new ii(i.x,i.y,pe),z.map.texture.name=Q.name+".shadowMap",z.camera.updateProjectionMatrix()}s.setRenderTarget(z.map),s.clear();const ae=z.getViewportCount();for(let pe=0;pe<ae;pe++){const Ie=z.getViewport(pe);a.set(r.x*Ie.x,r.y*Ie.y,r.x*Ie.z,r.y*Ie.w),k.viewport(a),z.updateMatrices(Q,pe),n=z.getFrustum(),A(R,U,z.camera,Q,this.type)}z.isPointLightShadow!==!0&&this.type===gn&&E(z,U),z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(x,M,P)};function E(w,R){const U=e.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ii(i.x,i.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(R,null,U,u,v,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(R,null,U,p,v,null)}function b(w,R,U,x){let M=null;const P=U.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)M=P;else if(M=U.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const k=M.uuid,H=R.uuid;let Y=c[k];Y===void 0&&(Y={},c[k]=Y);let K=Y[H];K===void 0&&(K=M.clone(),Y[H]=K,R.addEventListener("dispose",C)),M=K}if(M.visible=R.visible,M.wireframe=R.wireframe,x===gn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:h[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const k=s.properties.get(M);k.light=U}return M}function A(w,R,U,x,M){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===gn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,w.matrixWorld);const H=e.update(w),Y=w.material;if(Array.isArray(Y)){const K=H.groups;for(let W=0,Q=K.length;W<Q;W++){const z=K[W],ie=Y[z.materialIndex];if(ie&&ie.visible){const ae=b(w,ie,x,M);w.onBeforeShadow(s,w,R,U,H,ae,z),s.renderBufferDirect(U,null,H,ae,w,z),w.onAfterShadow(s,w,R,U,H,ae,z)}}}else if(Y.visible){const K=b(w,Y,x,M);w.onBeforeShadow(s,w,R,U,H,K,null),s.renderBufferDirect(U,null,H,K,w,null),w.onAfterShadow(s,w,R,U,H,K,null)}}const k=w.children;for(let H=0,Y=k.length;H<Y;H++)A(k[H],R,U,x,M)}function C(w){w.target.removeEventListener("dispose",C);for(const U in c){const x=c[U],M=w.target.uuid;M in x&&(x[M].dispose(),delete x[M])}}}const eg={[Zr]:Jr,[Qr]:na,[ea]:ia,[Ri]:ta,[Jr]:Zr,[na]:Qr,[ia]:ea,[ta]:Ri};function tg(s,e){function t(){let D=!1;const te=new ot;let se=null;const de=new ot(0,0,0,0);return{setMask:function(Z){se!==Z&&!D&&(s.colorMask(Z,Z,Z,Z),se=Z)},setLocked:function(Z){D=Z},setClear:function(Z,q,me,Le,et){et===!0&&(Z*=Le,q*=Le,me*=Le),te.set(Z,q,me,Le),de.equals(te)===!1&&(s.clearColor(Z,q,me,Le),de.copy(te))},reset:function(){D=!1,se=null,de.set(-1,0,0,0)}}}function n(){let D=!1,te=!1,se=null,de=null,Z=null;return{setReversed:function(q){if(te!==q){const me=e.get("EXT_clip_control");q?me.clipControlEXT(me.LOWER_LEFT_EXT,me.ZERO_TO_ONE_EXT):me.clipControlEXT(me.LOWER_LEFT_EXT,me.NEGATIVE_ONE_TO_ONE_EXT),te=q;const Le=Z;Z=null,this.setClear(Le)}},getReversed:function(){return te},setTest:function(q){q?$(s.DEPTH_TEST):ue(s.DEPTH_TEST)},setMask:function(q){se!==q&&!D&&(s.depthMask(q),se=q)},setFunc:function(q){if(te&&(q=eg[q]),de!==q){switch(q){case Zr:s.depthFunc(s.NEVER);break;case Jr:s.depthFunc(s.ALWAYS);break;case Qr:s.depthFunc(s.LESS);break;case Ri:s.depthFunc(s.LEQUAL);break;case ea:s.depthFunc(s.EQUAL);break;case ta:s.depthFunc(s.GEQUAL);break;case na:s.depthFunc(s.GREATER);break;case ia:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}de=q}},setLocked:function(q){D=q},setClear:function(q){Z!==q&&(te&&(q=1-q),s.clearDepth(q),Z=q)},reset:function(){D=!1,se=null,de=null,Z=null,te=!1}}}function i(){let D=!1,te=null,se=null,de=null,Z=null,q=null,me=null,Le=null,et=null;return{setTest:function($e){D||($e?$(s.STENCIL_TEST):ue(s.STENCIL_TEST))},setMask:function($e){te!==$e&&!D&&(s.stencilMask($e),te=$e)},setFunc:function($e,hn,nn){(se!==$e||de!==hn||Z!==nn)&&(s.stencilFunc($e,hn,nn),se=$e,de=hn,Z=nn)},setOp:function($e,hn,nn){(q!==$e||me!==hn||Le!==nn)&&(s.stencilOp($e,hn,nn),q=$e,me=hn,Le=nn)},setLocked:function($e){D=$e},setClear:function($e){et!==$e&&(s.clearStencil($e),et=$e)},reset:function(){D=!1,te=null,se=null,de=null,Z=null,q=null,me=null,Le=null,et=null}}}const r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let d={},h={},u=new WeakMap,p=[],g=null,v=!1,m=null,f=null,E=null,b=null,A=null,C=null,w=null,R=new Ne(0,0,0),U=0,x=!1,M=null,P=null,k=null,H=null,Y=null;const K=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Q=0;const z=s.getParameter(s.VERSION);z.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(z)[1]),W=Q>=1):z.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),W=Q>=2);let ie=null,ae={};const pe=s.getParameter(s.SCISSOR_BOX),Ie=s.getParameter(s.VIEWPORT),qe=new ot().fromArray(pe),Ve=new ot().fromArray(Ie);function Be(D,te,se,de){const Z=new Uint8Array(4),q=s.createTexture();s.bindTexture(D,q),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let me=0;me<se;me++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(te,0,s.RGBA,1,1,de,0,s.RGBA,s.UNSIGNED_BYTE,Z):s.texImage2D(te+me,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Z);return q}const X={};X[s.TEXTURE_2D]=Be(s.TEXTURE_2D,s.TEXTURE_2D,1),X[s.TEXTURE_CUBE_MAP]=Be(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[s.TEXTURE_2D_ARRAY]=Be(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),X[s.TEXTURE_3D]=Be(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(s.DEPTH_TEST),a.setFunc(Ri),Ce(!1),ge(Eo),$(s.CULL_FACE),nt(Ln);function $(D){d[D]!==!0&&(s.enable(D),d[D]=!0)}function ue(D){d[D]!==!1&&(s.disable(D),d[D]=!1)}function Pe(D,te){return h[D]!==te?(s.bindFramebuffer(D,te),h[D]=te,D===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=te),D===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=te),!0):!1}function Ae(D,te){let se=p,de=!1;if(D){se=u.get(te),se===void 0&&(se=[],u.set(te,se));const Z=D.textures;if(se.length!==Z.length||se[0]!==s.COLOR_ATTACHMENT0){for(let q=0,me=Z.length;q<me;q++)se[q]=s.COLOR_ATTACHMENT0+q;se.length=Z.length,de=!0}}else se[0]!==s.BACK&&(se[0]=s.BACK,de=!0);de&&s.drawBuffers(se)}function Ye(D){return g!==D?(s.useProgram(D),g=D,!0):!1}const At={[Qn]:s.FUNC_ADD,[rh]:s.FUNC_SUBTRACT,[ah]:s.FUNC_REVERSE_SUBTRACT};At[oh]=s.MIN,At[lh]=s.MAX;const T={[ch]:s.ZERO,[hh]:s.ONE,[dh]:s.SRC_COLOR,[jr]:s.SRC_ALPHA,[_h]:s.SRC_ALPHA_SATURATE,[mh]:s.DST_COLOR,[fh]:s.DST_ALPHA,[uh]:s.ONE_MINUS_SRC_COLOR,[$r]:s.ONE_MINUS_SRC_ALPHA,[gh]:s.ONE_MINUS_DST_COLOR,[ph]:s.ONE_MINUS_DST_ALPHA,[vh]:s.CONSTANT_COLOR,[Sh]:s.ONE_MINUS_CONSTANT_COLOR,[Mh]:s.CONSTANT_ALPHA,[xh]:s.ONE_MINUS_CONSTANT_ALPHA};function nt(D,te,se,de,Z,q,me,Le,et,$e){if(D===Ln){v===!0&&(ue(s.BLEND),v=!1);return}if(v===!1&&($(s.BLEND),v=!0),D!==sh){if(D!==m||$e!==x){if((f!==Qn||A!==Qn)&&(s.blendEquation(s.FUNC_ADD),f=Qn,A=Qn),$e)switch(D){case Ei:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wo:s.blendFunc(s.ONE,s.ONE);break;case To:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Co:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ei:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wo:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case To:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Co:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}E=null,b=null,C=null,w=null,R.set(0,0,0),U=0,m=D,x=$e}return}Z=Z||te,q=q||se,me=me||de,(te!==f||Z!==A)&&(s.blendEquationSeparate(At[te],At[Z]),f=te,A=Z),(se!==E||de!==b||q!==C||me!==w)&&(s.blendFuncSeparate(T[se],T[de],T[q],T[me]),E=se,b=de,C=q,w=me),(Le.equals(R)===!1||et!==U)&&(s.blendColor(Le.r,Le.g,Le.b,et),R.copy(Le),U=et),m=D,x=!1}function Ue(D,te){D.side===_n?ue(s.CULL_FACE):$(s.CULL_FACE);let se=D.side===Et;te&&(se=!se),Ce(se),D.blending===Ei&&D.transparent===!1?nt(Ln):nt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const de=D.stencilWrite;o.setTest(de),de&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),_e(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?$(s.SAMPLE_ALPHA_TO_COVERAGE):ue(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(D){M!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),M=D)}function ge(D){D!==nh?($(s.CULL_FACE),D!==P&&(D===Eo?s.cullFace(s.BACK):D===ih?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ue(s.CULL_FACE),P=D}function it(D){D!==k&&(W&&s.lineWidth(D),k=D)}function _e(D,te,se){D?($(s.POLYGON_OFFSET_FILL),(H!==te||Y!==se)&&(s.polygonOffset(te,se),H=te,Y=se)):ue(s.POLYGON_OFFSET_FILL)}function Oe(D){D?$(s.SCISSOR_TEST):ue(s.SCISSOR_TEST)}function mt(D){D===void 0&&(D=s.TEXTURE0+K-1),ie!==D&&(s.activeTexture(D),ie=D)}function lt(D,te,se){se===void 0&&(ie===null?se=s.TEXTURE0+K-1:se=ie);let de=ae[se];de===void 0&&(de={type:void 0,texture:void 0},ae[se]=de),(de.type!==D||de.texture!==te)&&(ie!==se&&(s.activeTexture(se),ie=se),s.bindTexture(D,te||X[D]),de.type=D,de.texture=te)}function y(){const D=ae[ie];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{s.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function N(){try{s.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function G(){try{s.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{s.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function V(){try{s.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xe(){try{s.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{s.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{s.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Se(){try{s.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{s.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ce(D){qe.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),qe.copy(D))}function Te(D){Ve.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),Ve.copy(D))}function Me(D,te){let se=c.get(te);se===void 0&&(se=new WeakMap,c.set(te,se));let de=se.get(D);de===void 0&&(de=s.getUniformBlockIndex(te,D.name),se.set(D,de))}function oe(D,te){const de=c.get(te).get(D);l.get(te)!==de&&(s.uniformBlockBinding(te,de,D.__bindingPointIndex),l.set(te,de))}function Fe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},ie=null,ae={},h={},u=new WeakMap,p=[],g=null,v=!1,m=null,f=null,E=null,b=null,A=null,C=null,w=null,R=new Ne(0,0,0),U=0,x=!1,M=null,P=null,k=null,H=null,Y=null,qe.set(0,0,s.canvas.width,s.canvas.height),Ve.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:$,disable:ue,bindFramebuffer:Pe,drawBuffers:Ae,useProgram:Ye,setBlending:nt,setMaterial:Ue,setFlipSided:Ce,setCullFace:ge,setLineWidth:it,setPolygonOffset:_e,setScissorTest:Oe,activeTexture:mt,bindTexture:lt,unbindTexture:y,compressedTexImage2D:_,compressedTexImage3D:N,texImage2D:Se,texImage3D:ee,updateUBOMapping:Me,uniformBlockBinding:oe,texStorage2D:ne,texStorage3D:ve,texSubImage2D:G,texSubImage3D:j,compressedTexSubImage2D:V,compressedTexSubImage3D:xe,scissor:ce,viewport:Te,reset:Fe}}function ng(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Xe,d=new WeakMap;let h;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(y,_){return p?new OffscreenCanvas(y,_):Qi("canvas")}function v(y,_,N){let G=1;const j=lt(y);if((j.width>N||j.height>N)&&(G=N/Math.max(j.width,j.height)),G<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const V=Math.floor(G*j.width),xe=Math.floor(G*j.height);h===void 0&&(h=g(V,xe));const ne=_?g(V,xe):h;return ne.width=V,ne.height=xe,ne.getContext("2d").drawImage(y,0,0,V,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+V+"x"+xe+")."),ne}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),y;return y}function m(y){return y.generateMipmaps}function f(y){s.generateMipmap(y)}function E(y){return y.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?s.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(y,_,N,G,j=!1){if(y!==null){if(s[y]!==void 0)return s[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let V=_;if(_===s.RED&&(N===s.FLOAT&&(V=s.R32F),N===s.HALF_FLOAT&&(V=s.R16F),N===s.UNSIGNED_BYTE&&(V=s.R8)),_===s.RED_INTEGER&&(N===s.UNSIGNED_BYTE&&(V=s.R8UI),N===s.UNSIGNED_SHORT&&(V=s.R16UI),N===s.UNSIGNED_INT&&(V=s.R32UI),N===s.BYTE&&(V=s.R8I),N===s.SHORT&&(V=s.R16I),N===s.INT&&(V=s.R32I)),_===s.RG&&(N===s.FLOAT&&(V=s.RG32F),N===s.HALF_FLOAT&&(V=s.RG16F),N===s.UNSIGNED_BYTE&&(V=s.RG8)),_===s.RG_INTEGER&&(N===s.UNSIGNED_BYTE&&(V=s.RG8UI),N===s.UNSIGNED_SHORT&&(V=s.RG16UI),N===s.UNSIGNED_INT&&(V=s.RG32UI),N===s.BYTE&&(V=s.RG8I),N===s.SHORT&&(V=s.RG16I),N===s.INT&&(V=s.RG32I)),_===s.RGB_INTEGER&&(N===s.UNSIGNED_BYTE&&(V=s.RGB8UI),N===s.UNSIGNED_SHORT&&(V=s.RGB16UI),N===s.UNSIGNED_INT&&(V=s.RGB32UI),N===s.BYTE&&(V=s.RGB8I),N===s.SHORT&&(V=s.RGB16I),N===s.INT&&(V=s.RGB32I)),_===s.RGBA_INTEGER&&(N===s.UNSIGNED_BYTE&&(V=s.RGBA8UI),N===s.UNSIGNED_SHORT&&(V=s.RGBA16UI),N===s.UNSIGNED_INT&&(V=s.RGBA32UI),N===s.BYTE&&(V=s.RGBA8I),N===s.SHORT&&(V=s.RGBA16I),N===s.INT&&(V=s.RGBA32I)),_===s.RGB&&(N===s.UNSIGNED_INT_5_9_9_9_REV&&(V=s.RGB9_E5),N===s.UNSIGNED_INT_10F_11F_11F_REV&&(V=s.R11F_G11F_B10F)),_===s.RGBA){const xe=j?Ws:je.getTransfer(G);N===s.FLOAT&&(V=s.RGBA32F),N===s.HALF_FLOAT&&(V=s.RGBA16F),N===s.UNSIGNED_BYTE&&(V=xe===Je?s.SRGB8_ALPHA8:s.RGBA8),N===s.UNSIGNED_SHORT_4_4_4_4&&(V=s.RGBA4),N===s.UNSIGNED_SHORT_5_5_5_1&&(V=s.RGB5_A1)}return(V===s.R16F||V===s.R32F||V===s.RG16F||V===s.RG32F||V===s.RGBA16F||V===s.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function A(y,_){let N;return y?_===null||_===ni||_===$i?N=s.DEPTH24_STENCIL8:_===Sn?N=s.DEPTH32F_STENCIL8:_===ji&&(N=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ni||_===$i?N=s.DEPTH_COMPONENT24:_===Sn?N=s.DEPTH_COMPONENT32F:_===ji&&(N=s.DEPTH_COMPONENT16),N}function C(y,_){return m(y)===!0||y.isFramebufferTexture&&y.minFilter!==It&&y.minFilter!==Qt?Math.log2(Math.max(_.width,_.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?_.mipmaps.length:1}function w(y){const _=y.target;_.removeEventListener("dispose",w),U(_),_.isVideoTexture&&d.delete(_)}function R(y){const _=y.target;_.removeEventListener("dispose",R),M(_)}function U(y){const _=n.get(y);if(_.__webglInit===void 0)return;const N=y.source,G=u.get(N);if(G){const j=G[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&x(y),Object.keys(G).length===0&&u.delete(N)}n.remove(y)}function x(y){const _=n.get(y);s.deleteTexture(_.__webglTexture);const N=y.source,G=u.get(N);delete G[_.__cacheKey],a.memory.textures--}function M(y){const _=n.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),n.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(_.__webglFramebuffer[G]))for(let j=0;j<_.__webglFramebuffer[G].length;j++)s.deleteFramebuffer(_.__webglFramebuffer[G][j]);else s.deleteFramebuffer(_.__webglFramebuffer[G]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[G])}else{if(Array.isArray(_.__webglFramebuffer))for(let G=0;G<_.__webglFramebuffer.length;G++)s.deleteFramebuffer(_.__webglFramebuffer[G]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let G=0;G<_.__webglColorRenderbuffer.length;G++)_.__webglColorRenderbuffer[G]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[G]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const N=y.textures;for(let G=0,j=N.length;G<j;G++){const V=n.get(N[G]);V.__webglTexture&&(s.deleteTexture(V.__webglTexture),a.memory.textures--),n.remove(N[G])}n.remove(y)}let P=0;function k(){P=0}function H(){const y=P;return y>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+i.maxTextures),P+=1,y}function Y(y){const _=[];return _.push(y.wrapS),_.push(y.wrapT),_.push(y.wrapR||0),_.push(y.magFilter),_.push(y.minFilter),_.push(y.anisotropy),_.push(y.internalFormat),_.push(y.format),_.push(y.type),_.push(y.generateMipmaps),_.push(y.premultiplyAlpha),_.push(y.flipY),_.push(y.unpackAlignment),_.push(y.colorSpace),_.join()}function K(y,_){const N=n.get(y);if(y.isVideoTexture&&Oe(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&N.__version!==y.version){const G=y.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(N,y,_);return}}else y.isExternalTexture&&(N.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,N.__webglTexture,s.TEXTURE0+_)}function W(y,_){const N=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&N.__version!==y.version){X(N,y,_);return}t.bindTexture(s.TEXTURE_2D_ARRAY,N.__webglTexture,s.TEXTURE0+_)}function Q(y,_){const N=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&N.__version!==y.version){X(N,y,_);return}t.bindTexture(s.TEXTURE_3D,N.__webglTexture,s.TEXTURE0+_)}function z(y,_){const N=n.get(y);if(y.version>0&&N.__version!==y.version){$(N,y,_);return}t.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+_)}const ie={[aa]:s.REPEAT,[vn]:s.CLAMP_TO_EDGE,[oa]:s.MIRRORED_REPEAT},ae={[It]:s.NEAREST,[Ph]:s.NEAREST_MIPMAP_NEAREST,[cs]:s.NEAREST_MIPMAP_LINEAR,[Qt]:s.LINEAR,[rr]:s.LINEAR_MIPMAP_NEAREST,[In]:s.LINEAR_MIPMAP_LINEAR},pe={[Uh]:s.NEVER,[zh]:s.ALWAYS,[Nh]:s.LESS,[fc]:s.LEQUAL,[Fh]:s.EQUAL,[Oh]:s.GEQUAL,[kh]:s.GREATER,[Bh]:s.NOTEQUAL};function Ie(y,_){if(_.type===Sn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Qt||_.magFilter===rr||_.magFilter===cs||_.magFilter===In||_.minFilter===Qt||_.minFilter===rr||_.minFilter===cs||_.minFilter===In)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(y,s.TEXTURE_WRAP_S,ie[_.wrapS]),s.texParameteri(y,s.TEXTURE_WRAP_T,ie[_.wrapT]),(y===s.TEXTURE_3D||y===s.TEXTURE_2D_ARRAY)&&s.texParameteri(y,s.TEXTURE_WRAP_R,ie[_.wrapR]),s.texParameteri(y,s.TEXTURE_MAG_FILTER,ae[_.magFilter]),s.texParameteri(y,s.TEXTURE_MIN_FILTER,ae[_.minFilter]),_.compareFunction&&(s.texParameteri(y,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(y,s.TEXTURE_COMPARE_FUNC,pe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===It||_.minFilter!==cs&&_.minFilter!==In||_.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");s.texParameterf(y,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function qe(y,_){let N=!1;y.__webglInit===void 0&&(y.__webglInit=!0,_.addEventListener("dispose",w));const G=_.source;let j=u.get(G);j===void 0&&(j={},u.set(G,j));const V=Y(_);if(V!==y.__cacheKey){j[V]===void 0&&(j[V]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,N=!0),j[V].usedTimes++;const xe=j[y.__cacheKey];xe!==void 0&&(j[y.__cacheKey].usedTimes--,xe.usedTimes===0&&x(_)),y.__cacheKey=V,y.__webglTexture=j[V].texture}return N}function Ve(y,_,N){return Math.floor(Math.floor(y/N)/_)}function Be(y,_,N,G){const V=y.updateRanges;if(V.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,N,G,_.data);else{V.sort((ee,ce)=>ee.start-ce.start);let xe=0;for(let ee=1;ee<V.length;ee++){const ce=V[xe],Te=V[ee],Me=ce.start+ce.count,oe=Ve(Te.start,_.width,4),Fe=Ve(ce.start,_.width,4);Te.start<=Me+1&&oe===Fe&&Ve(Te.start+Te.count-1,_.width,4)===oe?ce.count=Math.max(ce.count,Te.start+Te.count-ce.start):(++xe,V[xe]=Te)}V.length=xe+1;const ne=s.getParameter(s.UNPACK_ROW_LENGTH),ve=s.getParameter(s.UNPACK_SKIP_PIXELS),Se=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let ee=0,ce=V.length;ee<ce;ee++){const Te=V[ee],Me=Math.floor(Te.start/4),oe=Math.ceil(Te.count/4),Fe=Me%_.width,D=Math.floor(Me/_.width),te=oe,se=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Fe),s.pixelStorei(s.UNPACK_SKIP_ROWS,D),t.texSubImage2D(s.TEXTURE_2D,0,Fe,D,te,se,N,G,_.data)}y.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,ne),s.pixelStorei(s.UNPACK_SKIP_PIXELS,ve),s.pixelStorei(s.UNPACK_SKIP_ROWS,Se)}}function X(y,_,N){let G=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(G=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(G=s.TEXTURE_3D);const j=qe(y,_),V=_.source;t.bindTexture(G,y.__webglTexture,s.TEXTURE0+N);const xe=n.get(V);if(V.version!==xe.__version||j===!0){t.activeTexture(s.TEXTURE0+N);const ne=je.getPrimaries(je.workingColorSpace),ve=_.colorSpace===Dn?null:je.getPrimaries(_.colorSpace),Se=_.colorSpace===Dn||ne===ve?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let ee=v(_.image,!1,i.maxTextureSize);ee=mt(_,ee);const ce=r.convert(_.format,_.colorSpace),Te=r.convert(_.type);let Me=b(_.internalFormat,ce,Te,_.colorSpace,_.isVideoTexture);Ie(G,_);let oe;const Fe=_.mipmaps,D=_.isVideoTexture!==!0,te=xe.__version===void 0||j===!0,se=V.dataReady,de=C(_,ee);if(_.isDepthTexture)Me=A(_.format===Ji,_.type),te&&(D?t.texStorage2D(s.TEXTURE_2D,1,Me,ee.width,ee.height):t.texImage2D(s.TEXTURE_2D,0,Me,ee.width,ee.height,0,ce,Te,null));else if(_.isDataTexture)if(Fe.length>0){D&&te&&t.texStorage2D(s.TEXTURE_2D,de,Me,Fe[0].width,Fe[0].height);for(let Z=0,q=Fe.length;Z<q;Z++)oe=Fe[Z],D?se&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,oe.width,oe.height,ce,Te,oe.data):t.texImage2D(s.TEXTURE_2D,Z,Me,oe.width,oe.height,0,ce,Te,oe.data);_.generateMipmaps=!1}else D?(te&&t.texStorage2D(s.TEXTURE_2D,de,Me,ee.width,ee.height),se&&Be(_,ee,ce,Te)):t.texImage2D(s.TEXTURE_2D,0,Me,ee.width,ee.height,0,ce,Te,ee.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&te&&t.texStorage3D(s.TEXTURE_2D_ARRAY,de,Me,Fe[0].width,Fe[0].height,ee.depth);for(let Z=0,q=Fe.length;Z<q;Z++)if(oe=Fe[Z],_.format!==en)if(ce!==null)if(D){if(se)if(_.layerUpdates.size>0){const me=Zo(oe.width,oe.height,_.format,_.type);for(const Le of _.layerUpdates){const et=oe.data.subarray(Le*me/oe.data.BYTES_PER_ELEMENT,(Le+1)*me/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,Le,oe.width,oe.height,1,ce,et)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,oe.width,oe.height,ee.depth,ce,oe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Z,Me,oe.width,oe.height,ee.depth,0,oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?se&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,oe.width,oe.height,ee.depth,ce,Te,oe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Z,Me,oe.width,oe.height,ee.depth,0,ce,Te,oe.data)}else{D&&te&&t.texStorage2D(s.TEXTURE_2D,de,Me,Fe[0].width,Fe[0].height);for(let Z=0,q=Fe.length;Z<q;Z++)oe=Fe[Z],_.format!==en?ce!==null?D?se&&t.compressedTexSubImage2D(s.TEXTURE_2D,Z,0,0,oe.width,oe.height,ce,oe.data):t.compressedTexImage2D(s.TEXTURE_2D,Z,Me,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?se&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,oe.width,oe.height,ce,Te,oe.data):t.texImage2D(s.TEXTURE_2D,Z,Me,oe.width,oe.height,0,ce,Te,oe.data)}else if(_.isDataArrayTexture)if(D){if(te&&t.texStorage3D(s.TEXTURE_2D_ARRAY,de,Me,ee.width,ee.height,ee.depth),se)if(_.layerUpdates.size>0){const Z=Zo(ee.width,ee.height,_.format,_.type);for(const q of _.layerUpdates){const me=ee.data.subarray(q*Z/ee.data.BYTES_PER_ELEMENT,(q+1)*Z/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,q,ee.width,ee.height,1,ce,Te,me)}_.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ce,Te,ee.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Me,ee.width,ee.height,ee.depth,0,ce,Te,ee.data);else if(_.isData3DTexture)D?(te&&t.texStorage3D(s.TEXTURE_3D,de,Me,ee.width,ee.height,ee.depth),se&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ce,Te,ee.data)):t.texImage3D(s.TEXTURE_3D,0,Me,ee.width,ee.height,ee.depth,0,ce,Te,ee.data);else if(_.isFramebufferTexture){if(te)if(D)t.texStorage2D(s.TEXTURE_2D,de,Me,ee.width,ee.height);else{let Z=ee.width,q=ee.height;for(let me=0;me<de;me++)t.texImage2D(s.TEXTURE_2D,me,Me,Z,q,0,ce,Te,null),Z>>=1,q>>=1}}else if(Fe.length>0){if(D&&te){const Z=lt(Fe[0]);t.texStorage2D(s.TEXTURE_2D,de,Me,Z.width,Z.height)}for(let Z=0,q=Fe.length;Z<q;Z++)oe=Fe[Z],D?se&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,ce,Te,oe):t.texImage2D(s.TEXTURE_2D,Z,Me,ce,Te,oe);_.generateMipmaps=!1}else if(D){if(te){const Z=lt(ee);t.texStorage2D(s.TEXTURE_2D,de,Me,Z.width,Z.height)}se&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ce,Te,ee)}else t.texImage2D(s.TEXTURE_2D,0,Me,ce,Te,ee);m(_)&&f(G),xe.__version=V.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function $(y,_,N){if(_.image.length!==6)return;const G=qe(y,_),j=_.source;t.bindTexture(s.TEXTURE_CUBE_MAP,y.__webglTexture,s.TEXTURE0+N);const V=n.get(j);if(j.version!==V.__version||G===!0){t.activeTexture(s.TEXTURE0+N);const xe=je.getPrimaries(je.workingColorSpace),ne=_.colorSpace===Dn?null:je.getPrimaries(_.colorSpace),ve=_.colorSpace===Dn||xe===ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Se=_.isCompressedTexture||_.image[0].isCompressedTexture,ee=_.image[0]&&_.image[0].isDataTexture,ce=[];for(let q=0;q<6;q++)!Se&&!ee?ce[q]=v(_.image[q],!0,i.maxCubemapSize):ce[q]=ee?_.image[q].image:_.image[q],ce[q]=mt(_,ce[q]);const Te=ce[0],Me=r.convert(_.format,_.colorSpace),oe=r.convert(_.type),Fe=b(_.internalFormat,Me,oe,_.colorSpace),D=_.isVideoTexture!==!0,te=V.__version===void 0||G===!0,se=j.dataReady;let de=C(_,Te);Ie(s.TEXTURE_CUBE_MAP,_);let Z;if(Se){D&&te&&t.texStorage2D(s.TEXTURE_CUBE_MAP,de,Fe,Te.width,Te.height);for(let q=0;q<6;q++){Z=ce[q].mipmaps;for(let me=0;me<Z.length;me++){const Le=Z[me];_.format!==en?Me!==null?D?se&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,0,0,Le.width,Le.height,Me,Le.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,Fe,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,0,0,Le.width,Le.height,Me,oe,Le.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,Fe,Le.width,Le.height,0,Me,oe,Le.data)}}}else{if(Z=_.mipmaps,D&&te){Z.length>0&&de++;const q=lt(ce[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,de,Fe,q.width,q.height)}for(let q=0;q<6;q++)if(ee){D?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ce[q].width,ce[q].height,Me,oe,ce[q].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Fe,ce[q].width,ce[q].height,0,Me,oe,ce[q].data);for(let me=0;me<Z.length;me++){const et=Z[me].image[q].image;D?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,0,0,et.width,et.height,Me,oe,et.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,Fe,et.width,et.height,0,Me,oe,et.data)}}else{D?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Me,oe,ce[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Fe,Me,oe,ce[q]);for(let me=0;me<Z.length;me++){const Le=Z[me];D?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,0,0,Me,oe,Le.image[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,Fe,Me,oe,Le.image[q])}}}m(_)&&f(s.TEXTURE_CUBE_MAP),V.__version=j.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function ue(y,_,N,G,j,V){const xe=r.convert(N.format,N.colorSpace),ne=r.convert(N.type),ve=b(N.internalFormat,xe,ne,N.colorSpace),Se=n.get(_),ee=n.get(N);if(ee.__renderTarget=_,!Se.__hasExternalTextures){const ce=Math.max(1,_.width>>V),Te=Math.max(1,_.height>>V);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?t.texImage3D(j,V,ve,ce,Te,_.depth,0,xe,ne,null):t.texImage2D(j,V,ve,ce,Te,0,xe,ne,null)}t.bindFramebuffer(s.FRAMEBUFFER,y),_e(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,G,j,ee.__webglTexture,0,it(_)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,G,j,ee.__webglTexture,V),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Pe(y,_,N){if(s.bindRenderbuffer(s.RENDERBUFFER,y),_.depthBuffer){const G=_.depthTexture,j=G&&G.isDepthTexture?G.type:null,V=A(_.stencilBuffer,j),xe=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ne=it(_);_e(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ne,V,_.width,_.height):N?s.renderbufferStorageMultisample(s.RENDERBUFFER,ne,V,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,V,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,xe,s.RENDERBUFFER,y)}else{const G=_.textures;for(let j=0;j<G.length;j++){const V=G[j],xe=r.convert(V.format,V.colorSpace),ne=r.convert(V.type),ve=b(V.internalFormat,xe,ne,V.colorSpace),Se=it(_);N&&_e(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Se,ve,_.width,_.height):_e(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Se,ve,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,ve,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ae(y,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,y),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=n.get(_.depthTexture);G.__renderTarget=_,(!G.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),K(_.depthTexture,0);const j=G.__webglTexture,V=it(_);if(_.depthTexture.format===Zi)_e(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0,V):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0);else if(_.depthTexture.format===Ji)_e(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0,V):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Ye(y){const _=n.get(y),N=y.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==y.depthTexture){const G=y.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),G){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,G.removeEventListener("dispose",j)};G.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=G}if(y.depthTexture&&!_.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");const G=y.texture.mipmaps;G&&G.length>0?Ae(_.__webglFramebuffer[0],y):Ae(_.__webglFramebuffer,y)}else if(N){_.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[G]),_.__webglDepthbuffer[G]===void 0)_.__webglDepthbuffer[G]=s.createRenderbuffer(),Pe(_.__webglDepthbuffer[G],y,!1);else{const j=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,V=_.__webglDepthbuffer[G];s.bindRenderbuffer(s.RENDERBUFFER,V),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,V)}}else{const G=y.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),Pe(_.__webglDepthbuffer,y,!1);else{const j=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,V=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,V),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,V)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function At(y,_,N){const G=n.get(y);_!==void 0&&ue(G.__webglFramebuffer,y,y.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),N!==void 0&&Ye(y)}function T(y){const _=y.texture,N=n.get(y),G=n.get(_);y.addEventListener("dispose",R);const j=y.textures,V=y.isWebGLCubeRenderTarget===!0,xe=j.length>1;if(xe||(G.__webglTexture===void 0&&(G.__webglTexture=s.createTexture()),G.__version=_.version,a.memory.textures++),V){N.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[ne]=[];for(let ve=0;ve<_.mipmaps.length;ve++)N.__webglFramebuffer[ne][ve]=s.createFramebuffer()}else N.__webglFramebuffer[ne]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let ne=0;ne<_.mipmaps.length;ne++)N.__webglFramebuffer[ne]=s.createFramebuffer()}else N.__webglFramebuffer=s.createFramebuffer();if(xe)for(let ne=0,ve=j.length;ne<ve;ne++){const Se=n.get(j[ne]);Se.__webglTexture===void 0&&(Se.__webglTexture=s.createTexture(),a.memory.textures++)}if(y.samples>0&&_e(y)===!1){N.__webglMultisampledFramebuffer=s.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ne=0;ne<j.length;ne++){const ve=j[ne];N.__webglColorRenderbuffer[ne]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,N.__webglColorRenderbuffer[ne]);const Se=r.convert(ve.format,ve.colorSpace),ee=r.convert(ve.type),ce=b(ve.internalFormat,Se,ee,ve.colorSpace,y.isXRRenderTarget===!0),Te=it(y);s.renderbufferStorageMultisample(s.RENDERBUFFER,Te,ce,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ne,s.RENDERBUFFER,N.__webglColorRenderbuffer[ne])}s.bindRenderbuffer(s.RENDERBUFFER,null),y.depthBuffer&&(N.__webglDepthRenderbuffer=s.createRenderbuffer(),Pe(N.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(V){t.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture),Ie(s.TEXTURE_CUBE_MAP,_);for(let ne=0;ne<6;ne++)if(_.mipmaps&&_.mipmaps.length>0)for(let ve=0;ve<_.mipmaps.length;ve++)ue(N.__webglFramebuffer[ne][ve],y,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve);else ue(N.__webglFramebuffer[ne],y,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);m(_)&&f(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let ne=0,ve=j.length;ne<ve;ne++){const Se=j[ne],ee=n.get(Se);let ce=s.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ce=y.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ce,ee.__webglTexture),Ie(ce,Se),ue(N.__webglFramebuffer,y,Se,s.COLOR_ATTACHMENT0+ne,ce,0),m(Se)&&f(ce)}t.unbindTexture()}else{let ne=s.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ne=y.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ne,G.__webglTexture),Ie(ne,_),_.mipmaps&&_.mipmaps.length>0)for(let ve=0;ve<_.mipmaps.length;ve++)ue(N.__webglFramebuffer[ve],y,_,s.COLOR_ATTACHMENT0,ne,ve);else ue(N.__webglFramebuffer,y,_,s.COLOR_ATTACHMENT0,ne,0);m(_)&&f(ne),t.unbindTexture()}y.depthBuffer&&Ye(y)}function nt(y){const _=y.textures;for(let N=0,G=_.length;N<G;N++){const j=_[N];if(m(j)){const V=E(y),xe=n.get(j).__webglTexture;t.bindTexture(V,xe),f(V),t.unbindTexture()}}}const Ue=[],Ce=[];function ge(y){if(y.samples>0){if(_e(y)===!1){const _=y.textures,N=y.width,G=y.height;let j=s.COLOR_BUFFER_BIT;const V=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xe=n.get(y),ne=_.length>1;if(ne)for(let Se=0;Se<_.length;Se++)t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const ve=y.texture.mipmaps;ve&&ve.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Se=0;Se<_.length;Se++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),ne){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,xe.__webglColorRenderbuffer[Se]);const ee=n.get(_[Se]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ee,0)}s.blitFramebuffer(0,0,N,G,0,0,N,G,j,s.NEAREST),l===!0&&(Ue.length=0,Ce.length=0,Ue.push(s.COLOR_ATTACHMENT0+Se),y.depthBuffer&&y.resolveDepthBuffer===!1&&(Ue.push(V),Ce.push(V),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ce)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ne)for(let Se=0;Se<_.length;Se++){t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.RENDERBUFFER,xe.__webglColorRenderbuffer[Se]);const ee=n.get(_[Se]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.TEXTURE_2D,ee,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){const _=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function it(y){return Math.min(i.maxSamples,y.samples)}function _e(y){const _=n.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Oe(y){const _=a.render.frame;d.get(y)!==_&&(d.set(y,_),y.update())}function mt(y,_){const N=y.colorSpace,G=y.format,j=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||N!==Ii&&N!==Dn&&(je.getTransfer(N)===Je?(G!==en||j!==cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),_}function lt(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=k,this.setTexture2D=K,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=z,this.rebindTextures=At,this.setupRenderTarget=T,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=_e}function ig(s,e){function t(n,i=Dn){let r;const a=je.getTransfer(i);if(n===cn)return s.UNSIGNED_BYTE;if(n===Qa)return s.UNSIGNED_SHORT_4_4_4_4;if(n===eo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===ac)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===oc)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===sc)return s.BYTE;if(n===rc)return s.SHORT;if(n===ji)return s.UNSIGNED_SHORT;if(n===Ja)return s.INT;if(n===ni)return s.UNSIGNED_INT;if(n===Sn)return s.FLOAT;if(n===ns)return s.HALF_FLOAT;if(n===lc)return s.ALPHA;if(n===cc)return s.RGB;if(n===en)return s.RGBA;if(n===Zi)return s.DEPTH_COMPONENT;if(n===Ji)return s.DEPTH_STENCIL;if(n===hc)return s.RED;if(n===to)return s.RED_INTEGER;if(n===dc)return s.RG;if(n===no)return s.RG_INTEGER;if(n===io)return s.RGBA_INTEGER;if(n===Fs||n===ks||n===Bs||n===Os)if(a===Je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Fs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Bs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Os)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Fs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ks)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Bs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Os)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===la||n===ca||n===ha||n===da)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===la)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ca)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ha)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===da)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ua||n===fa||n===pa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ua||n===fa)return a===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===pa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ma||n===ga||n===_a||n===va||n===Sa||n===Ma||n===xa||n===Aa||n===ya||n===ba||n===Ea||n===wa||n===Ta||n===Ca)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ma)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ga)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_a)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===va)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Sa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ma)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Aa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ya)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ba)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ea)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===wa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ta)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ca)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ra||n===Pa||n===Da)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ra)return a===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Pa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Da)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ia||n===La||n===Ua||n===Na)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ia)return r.COMPRESSED_RED_RGTC1_EXT;if(n===La)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ua)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Na)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$i?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const sg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ag{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ec(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new xn({vertexShader:sg,fragmentShader:rg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _t(new as(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class og extends ki{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,p=null,g=null;const v=typeof XRWebGLBinding<"u",m=new ag,f={},E=t.getContextAttributes();let b=null,A=null;const C=[],w=[],R=new Xe;let U=null;const x=new Dt;x.viewport=new ot;const M=new Dt;M.viewport=new ot;const P=[x,M],k=new Td;let H=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let $=C[X];return $===void 0&&($=new Cr,C[X]=$),$.getTargetRaySpace()},this.getControllerGrip=function(X){let $=C[X];return $===void 0&&($=new Cr,C[X]=$),$.getGripSpace()},this.getHand=function(X){let $=C[X];return $===void 0&&($=new Cr,C[X]=$),$.getHandSpace()};function K(X){const $=w.indexOf(X.inputSource);if($===-1)return;const ue=C[$];ue!==void 0&&(ue.update(X.inputSource,X.frame,c||a),ue.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){i.removeEventListener("select",K),i.removeEventListener("selectstart",K),i.removeEventListener("selectend",K),i.removeEventListener("squeeze",K),i.removeEventListener("squeezestart",K),i.removeEventListener("squeezeend",K),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",Q);for(let X=0;X<C.length;X++){const $=w[X];$!==null&&(w[X]=null,C[X].disconnect($))}H=null,Y=null,m.reset();for(const X in f)delete f[X];e.setRenderTarget(b),p=null,u=null,h=null,i=null,A=null,Be.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",K),i.addEventListener("selectstart",K),i.addEventListener("selectend",K),i.addEventListener("squeeze",K),i.addEventListener("squeezestart",K),i.addEventListener("squeezeend",K),i.addEventListener("end",W),i.addEventListener("inputsourceschange",Q),E.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,Pe=null,Ae=null;E.depth&&(Ae=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=E.stencil?Ji:Zi,Pe=E.stencil?$i:ni);const Ye={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:r};h=this.getBinding(),u=h.createProjectionLayer(Ye),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),A=new ii(u.textureWidth,u.textureHeight,{format:en,type:cn,depthTexture:new bc(u.textureWidth,u.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ue={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,t,ue),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new ii(p.framebufferWidth,p.framebufferHeight,{format:en,type:cn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Be.setContext(i),Be.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(X){for(let $=0;$<X.removed.length;$++){const ue=X.removed[$],Pe=w.indexOf(ue);Pe>=0&&(w[Pe]=null,C[Pe].disconnect(ue))}for(let $=0;$<X.added.length;$++){const ue=X.added[$];let Pe=w.indexOf(ue);if(Pe===-1){for(let Ye=0;Ye<C.length;Ye++)if(Ye>=w.length){w.push(ue),Pe=Ye;break}else if(w[Ye]===null){w[Ye]=ue,Pe=Ye;break}if(Pe===-1)break}const Ae=C[Pe];Ae&&Ae.connect(ue)}}const z=new F,ie=new F;function ae(X,$,ue){z.setFromMatrixPosition($.matrixWorld),ie.setFromMatrixPosition(ue.matrixWorld);const Pe=z.distanceTo(ie),Ae=$.projectionMatrix.elements,Ye=ue.projectionMatrix.elements,At=Ae[14]/(Ae[10]-1),T=Ae[14]/(Ae[10]+1),nt=(Ae[9]+1)/Ae[5],Ue=(Ae[9]-1)/Ae[5],Ce=(Ae[8]-1)/Ae[0],ge=(Ye[8]+1)/Ye[0],it=At*Ce,_e=At*ge,Oe=Pe/(-Ce+ge),mt=Oe*-Ce;if($.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(mt),X.translateZ(Oe),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ae[10]===-1)X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const lt=At+Oe,y=T+Oe,_=it-mt,N=_e+(Pe-mt),G=nt*T/y*lt,j=Ue*T/y*lt;X.projectionMatrix.makePerspective(_,N,G,j,lt,y),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function pe(X,$){$===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices($.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;let $=X.near,ue=X.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(ue=m.depthFar)),k.near=M.near=x.near=$,k.far=M.far=x.far=ue,(H!==k.near||Y!==k.far)&&(i.updateRenderState({depthNear:k.near,depthFar:k.far}),H=k.near,Y=k.far),k.layers.mask=X.layers.mask|6,x.layers.mask=k.layers.mask&3,M.layers.mask=k.layers.mask&5;const Pe=X.parent,Ae=k.cameras;pe(k,Pe);for(let Ye=0;Ye<Ae.length;Ye++)pe(Ae[Ye],Pe);Ae.length===2?ae(k,x,M):k.projectionMatrix.copy(x.projectionMatrix),Ie(X,k,Pe)};function Ie(X,$,ue){ue===null?X.matrix.copy($.matrixWorld):(X.matrix.copy(ue.matrixWorld),X.matrix.invert(),X.matrix.multiply($.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Fa*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(X){return f[X]};let qe=null;function Ve(X,$){if(d=$.getViewerPose(c||a),g=$,d!==null){const ue=d.views;p!==null&&(e.setRenderTargetFramebuffer(A,p.framebuffer),e.setRenderTarget(A));let Pe=!1;ue.length!==k.cameras.length&&(k.cameras.length=0,Pe=!0);for(let T=0;T<ue.length;T++){const nt=ue[T];let Ue=null;if(p!==null)Ue=p.getViewport(nt);else{const ge=h.getViewSubImage(u,nt);Ue=ge.viewport,T===0&&(e.setRenderTargetTextures(A,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(A))}let Ce=P[T];Ce===void 0&&(Ce=new Dt,Ce.layers.enable(T),Ce.viewport=new ot,P[T]=Ce),Ce.matrix.fromArray(nt.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(nt.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),T===0&&(k.matrix.copy(Ce.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Pe===!0&&k.cameras.push(Ce)}const Ae=i.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){h=n.getBinding();const T=h.getDepthInformation(ue[0]);T&&T.isValid&&T.texture&&m.init(T,i.renderState)}if(Ae&&Ae.includes("camera-access")&&v){e.state.unbindTexture(),h=n.getBinding();for(let T=0;T<ue.length;T++){const nt=ue[T].camera;if(nt){let Ue=f[nt];Ue||(Ue=new Ec,f[nt]=Ue);const Ce=h.getCameraImage(nt);Ue.sourceTexture=Ce}}}}for(let ue=0;ue<C.length;ue++){const Pe=w[ue],Ae=C[ue];Pe!==null&&Ae!==void 0&&Ae.update(Pe,$,c||a)}qe&&qe(X,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}const Be=new Cc;Be.setAnimationLoop(Ve),this.setAnimationLoop=function(X){qe=X},this.dispose=function(){}}}const qn=new tn,lg=new ct;function cg(s,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Mc(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,E,b,A){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),d(m,f)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,A)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,E,b):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Et&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Et&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const E=e.get(f),b=E.envMap,A=E.envMapRotation;b&&(m.envMap.value=b,qn.copy(A),qn.x*=-1,qn.y*=-1,qn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(qn.y*=-1,qn.z*=-1),m.envMapRotation.value.setFromMatrix4(lg.makeRotationFromEuler(qn)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,E,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*E,m.scale.value=b*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,E){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Et&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const E=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function hg(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,b){const A=b.program;n.uniformBlockBinding(E,A)}function c(E,b){let A=i[E.id];A===void 0&&(g(E),A=d(E),i[E.id]=A,E.addEventListener("dispose",m));const C=b.program;n.updateUBOMapping(E,C);const w=e.render.frame;r[E.id]!==w&&(u(E),r[E.id]=w)}function d(E){const b=h();E.__bindingPointIndex=b;const A=s.createBuffer(),C=E.__size,w=E.usage;return s.bindBuffer(s.UNIFORM_BUFFER,A),s.bufferData(s.UNIFORM_BUFFER,C,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,A),A}function h(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){const b=i[E.id],A=E.uniforms,C=E.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let w=0,R=A.length;w<R;w++){const U=Array.isArray(A[w])?A[w]:[A[w]];for(let x=0,M=U.length;x<M;x++){const P=U[x];if(p(P,w,x,C)===!0){const k=P.__offset,H=Array.isArray(P.value)?P.value:[P.value];let Y=0;for(let K=0;K<H.length;K++){const W=H[K],Q=v(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,k+Y,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,Y),Y+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(E,b,A,C){const w=E.value,R=b+"_"+A;if(C[R]===void 0)return typeof w=="number"||typeof w=="boolean"?C[R]=w:C[R]=w.clone(),!0;{const U=C[R];if(typeof w=="number"||typeof w=="boolean"){if(U!==w)return C[R]=w,!0}else if(U.equals(w)===!1)return U.copy(w),!0}return!1}function g(E){const b=E.uniforms;let A=0;const C=16;for(let R=0,U=b.length;R<U;R++){const x=Array.isArray(b[R])?b[R]:[b[R]];for(let M=0,P=x.length;M<P;M++){const k=x[M],H=Array.isArray(k.value)?k.value:[k.value];for(let Y=0,K=H.length;Y<K;Y++){const W=H[Y],Q=v(W),z=A%C,ie=z%Q.boundary,ae=z+ie;A+=ie,ae!==0&&C-ae<Q.storage&&(A+=C-ae),k.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=A,A+=Q.storage}}}const w=A%C;return w>0&&(A+=C-w),E.__size=A,E.__cache={},this}function v(E){const b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),b}function m(E){const b=E.target;b.removeEventListener("dispose",m);const A=a.indexOf(b.__bindingPointIndex);a.splice(A,1),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function f(){for(const E in i)s.deleteBuffer(i[E]);a=[],i={},r={}}return{bind:l,update:c,dispose:f}}class po{constructor(e={}){const{canvas:t=Vh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const E=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let C=!1;this._outputColorSpace=xt;let w=0,R=0,U=null,x=-1,M=null;const P=new ot,k=new ot;let H=null;const Y=new Ne(0);let K=0,W=t.width,Q=t.height,z=1,ie=null,ae=null;const pe=new ot(0,0,W,Q),Ie=new ot(0,0,W,Q);let qe=!1;const Ve=new oo;let Be=!1,X=!1;const $=new ct,ue=new F,Pe=new ot,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ye=!1;function At(){return U===null?z:1}let T=n;function nt(S,I){return t.getContext(S,I)}try{const S={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$a}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",Z,!1),T===null){const I="webgl2";if(T=nt(I,S),T===null)throw nt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Ue,Ce,ge,it,_e,Oe,mt,lt,y,_,N,G,j,V,xe,ne,ve,Se,ee,ce,Te,Me,oe,Fe;function D(){Ue=new xp(T),Ue.init(),Me=new ig(T,Ue),Ce=new pp(T,Ue,e,Me),ge=new tg(T,Ue),Ce.reversedDepthBuffer&&u&&ge.buffers.depth.setReversed(!0),it=new bp(T),_e=new Vm,Oe=new ng(T,Ue,ge,_e,Ce,Me,it),mt=new gp(A),lt=new Mp(A),y=new Rd(T),oe=new up(T,y),_=new Ap(T,y,it,oe),N=new wp(T,_,y,it),ee=new Ep(T,Ce,Oe),ne=new mp(_e),G=new Hm(A,mt,lt,Ue,Ce,oe,ne),j=new cg(A,_e),V=new Wm,xe=new $m(Ue),Se=new dp(A,mt,lt,ge,N,p,l),ve=new Qm(A,N,Ce),Fe=new hg(T,it,Ce,ge),ce=new fp(T,Ue,it),Te=new yp(T,Ue,it),it.programs=G.programs,A.capabilities=Ce,A.extensions=Ue,A.properties=_e,A.renderLists=V,A.shadowMap=ve,A.state=ge,A.info=it}D();const te=new og(A,T);this.xr=te,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const S=Ue.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ue.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(S){S!==void 0&&(z=S,this.setSize(W,Q,!1))},this.getSize=function(S){return S.set(W,Q)},this.setSize=function(S,I,B=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=S,Q=I,t.width=Math.floor(S*z),t.height=Math.floor(I*z),B===!0&&(t.style.width=S+"px",t.style.height=I+"px"),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(W*z,Q*z).floor()},this.setDrawingBufferSize=function(S,I,B){W=S,Q=I,z=B,t.width=Math.floor(S*B),t.height=Math.floor(I*B),this.setViewport(0,0,S,I)},this.getCurrentViewport=function(S){return S.copy(P)},this.getViewport=function(S){return S.copy(pe)},this.setViewport=function(S,I,B,O){S.isVector4?pe.set(S.x,S.y,S.z,S.w):pe.set(S,I,B,O),ge.viewport(P.copy(pe).multiplyScalar(z).round())},this.getScissor=function(S){return S.copy(Ie)},this.setScissor=function(S,I,B,O){S.isVector4?Ie.set(S.x,S.y,S.z,S.w):Ie.set(S,I,B,O),ge.scissor(k.copy(Ie).multiplyScalar(z).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(S){ge.setScissorTest(qe=S)},this.setOpaqueSort=function(S){ie=S},this.setTransparentSort=function(S){ae=S},this.getClearColor=function(S){return S.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor(...arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha(...arguments)},this.clear=function(S=!0,I=!0,B=!0){let O=0;if(S){let L=!1;if(U!==null){const J=U.texture.format;L=J===io||J===no||J===to}if(L){const J=U.texture.type,le=J===cn||J===ni||J===ji||J===$i||J===Qa||J===eo,fe=Se.getClearColor(),he=Se.getClearAlpha(),we=fe.r,Re=fe.g,ye=fe.b;le?(g[0]=we,g[1]=Re,g[2]=ye,g[3]=he,T.clearBufferuiv(T.COLOR,0,g)):(v[0]=we,v[1]=Re,v[2]=ye,v[3]=he,T.clearBufferiv(T.COLOR,0,v))}else O|=T.COLOR_BUFFER_BIT}I&&(O|=T.DEPTH_BUFFER_BIT),B&&(O|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",Z,!1),Se.dispose(),V.dispose(),xe.dispose(),_e.dispose(),mt.dispose(),lt.dispose(),N.dispose(),oe.dispose(),Fe.dispose(),G.dispose(),te.dispose(),te.removeEventListener("sessionstart",nn),te.removeEventListener("sessionend",go),On.stop()};function se(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const S=it.autoReset,I=ve.enabled,B=ve.autoUpdate,O=ve.needsUpdate,L=ve.type;D(),it.autoReset=S,ve.enabled=I,ve.autoUpdate=B,ve.needsUpdate=O,ve.type=L}function Z(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function q(S){const I=S.target;I.removeEventListener("dispose",q),me(I)}function me(S){Le(S),_e.remove(S)}function Le(S){const I=_e.get(S).programs;I!==void 0&&(I.forEach(function(B){G.releaseProgram(B)}),S.isShaderMaterial&&G.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,B,O,L,J){I===null&&(I=Ae);const le=L.isMesh&&L.matrixWorld.determinant()<0,fe=Gc(S,I,B,O,L);ge.setMaterial(O,le);let he=B.index,we=1;if(O.wireframe===!0){if(he=_.getWireframeAttribute(B),he===void 0)return;we=2}const Re=B.drawRange,ye=B.attributes.position;let Ge=Re.start*we,Ze=(Re.start+Re.count)*we;J!==null&&(Ge=Math.max(Ge,J.start*we),Ze=Math.min(Ze,(J.start+J.count)*we)),he!==null?(Ge=Math.max(Ge,0),Ze=Math.min(Ze,he.count)):ye!=null&&(Ge=Math.max(Ge,0),Ze=Math.min(Ze,ye.count));const at=Ze-Ge;if(at<0||at===1/0)return;oe.setup(L,O,fe,B,he);let tt,Qe=ce;if(he!==null&&(tt=y.get(he),Qe=Te,Qe.setIndex(tt)),L.isMesh)O.wireframe===!0?(ge.setLineWidth(O.wireframeLinewidth*At()),Qe.setMode(T.LINES)):Qe.setMode(T.TRIANGLES);else if(L.isLine){let Ee=O.linewidth;Ee===void 0&&(Ee=1),ge.setLineWidth(Ee*At()),L.isLineSegments?Qe.setMode(T.LINES):L.isLineLoop?Qe.setMode(T.LINE_LOOP):Qe.setMode(T.LINE_STRIP)}else L.isPoints?Qe.setMode(T.POINTS):L.isSprite&&Qe.setMode(T.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)es("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Qe.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))Qe.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{const Ee=L._multiDrawStarts,st=L._multiDrawCounts,Ke=L._multiDrawCount,Ft=he?y.get(he).bytesPerElement:1,si=_e.get(O).currentProgram.getUniforms();for(let kt=0;kt<Ke;kt++)si.setValue(T,"_gl_DrawID",kt),Qe.render(Ee[kt]/Ft,st[kt])}else if(L.isInstancedMesh)Qe.renderInstances(Ge,at,L.count);else if(B.isInstancedBufferGeometry){const Ee=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,st=Math.min(B.instanceCount,Ee);Qe.renderInstances(Ge,at,st)}else Qe.render(Ge,at)};function et(S,I,B){S.transparent===!0&&S.side===_n&&S.forceSinglePass===!1?(S.side=Et,S.needsUpdate=!0,ls(S,I,B),S.side=ln,S.needsUpdate=!0,ls(S,I,B),S.side=_n):ls(S,I,B)}this.compile=function(S,I,B=null){B===null&&(B=S),f=xe.get(B),f.init(I),b.push(f),B.traverseVisible(function(L){L.isLight&&L.layers.test(I.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),S!==B&&S.traverseVisible(function(L){L.isLight&&L.layers.test(I.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),f.setupLights();const O=new Set;return S.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;const J=L.material;if(J)if(Array.isArray(J))for(let le=0;le<J.length;le++){const fe=J[le];et(fe,B,L),O.add(fe)}else et(J,B,L),O.add(J)}),f=b.pop(),O},this.compileAsync=function(S,I,B=null){const O=this.compile(S,I,B);return new Promise(L=>{function J(){if(O.forEach(function(le){_e.get(le).currentProgram.isReady()&&O.delete(le)}),O.size===0){L(S);return}setTimeout(J,10)}Ue.get("KHR_parallel_shader_compile")!==null?J():setTimeout(J,10)})};let $e=null;function hn(S){$e&&$e(S)}function nn(){On.stop()}function go(){On.start()}const On=new Cc;On.setAnimationLoop(hn),typeof self<"u"&&On.setContext(self),this.setAnimationLoop=function(S){$e=S,te.setAnimationLoop(S),S===null?On.stop():On.start()},te.addEventListener("sessionstart",nn),te.addEventListener("sessionend",go),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(I),I=te.getCamera()),S.isScene===!0&&S.onBeforeRender(A,S,I,U),f=xe.get(S,b.length),f.init(I),b.push(f),$.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Ve.setFromProjectionMatrix($,an,I.reversedDepth),X=this.localClippingEnabled,Be=ne.init(this.clippingPlanes,X),m=V.get(S,E.length),m.init(),E.push(m),te.enabled===!0&&te.isPresenting===!0){const J=A.xr.getDepthSensingMesh();J!==null&&nr(J,I,-1/0,A.sortObjects)}nr(S,I,0,A.sortObjects),m.finish(),A.sortObjects===!0&&m.sort(ie,ae),Ye=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Ye&&Se.addToRenderList(m,S),this.info.render.frame++,Be===!0&&ne.beginShadows();const B=f.state.shadowsArray;ve.render(B,S,I),Be===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=m.opaque,L=m.transmissive;if(f.setupLights(),I.isArrayCamera){const J=I.cameras;if(L.length>0)for(let le=0,fe=J.length;le<fe;le++){const he=J[le];vo(O,L,S,he)}Ye&&Se.render(S);for(let le=0,fe=J.length;le<fe;le++){const he=J[le];_o(m,S,he,he.viewport)}}else L.length>0&&vo(O,L,S,I),Ye&&Se.render(S),_o(m,S,I);U!==null&&R===0&&(Oe.updateMultisampleRenderTarget(U),Oe.updateRenderTargetMipmap(U)),S.isScene===!0&&S.onAfterRender(A,S,I),oe.resetDefaultState(),x=-1,M=null,b.pop(),b.length>0?(f=b[b.length-1],Be===!0&&ne.setGlobalState(A.clippingPlanes,f.state.camera)):f=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function nr(S,I,B,O){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ve.intersectsSprite(S)){O&&Pe.setFromMatrixPosition(S.matrixWorld).applyMatrix4($);const le=N.update(S),fe=S.material;fe.visible&&m.push(S,le,fe,B,Pe.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ve.intersectsObject(S))){const le=N.update(S),fe=S.material;if(O&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Pe.copy(S.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Pe.copy(le.boundingSphere.center)),Pe.applyMatrix4(S.matrixWorld).applyMatrix4($)),Array.isArray(fe)){const he=le.groups;for(let we=0,Re=he.length;we<Re;we++){const ye=he[we],Ge=fe[ye.materialIndex];Ge&&Ge.visible&&m.push(S,le,Ge,B,Pe.z,ye)}}else fe.visible&&m.push(S,le,fe,B,Pe.z,null)}}const J=S.children;for(let le=0,fe=J.length;le<fe;le++)nr(J[le],I,B,O)}function _o(S,I,B,O){const L=S.opaque,J=S.transmissive,le=S.transparent;f.setupLightsView(B),Be===!0&&ne.setGlobalState(A.clippingPlanes,B),O&&ge.viewport(P.copy(O)),L.length>0&&os(L,I,B),J.length>0&&os(J,I,B),le.length>0&&os(le,I,B),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function vo(S,I,B,O){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[O.id]===void 0&&(f.state.transmissionRenderTarget[O.id]=new ii(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?ns:cn,minFilter:In,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace}));const J=f.state.transmissionRenderTarget[O.id],le=O.viewport||P;J.setSize(le.z*A.transmissionResolutionScale,le.w*A.transmissionResolutionScale);const fe=A.getRenderTarget(),he=A.getActiveCubeFace(),we=A.getActiveMipmapLevel();A.setRenderTarget(J),A.getClearColor(Y),K=A.getClearAlpha(),K<1&&A.setClearColor(16777215,.5),A.clear(),Ye&&Se.render(B);const Re=A.toneMapping;A.toneMapping=Un;const ye=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),f.setupLightsView(O),Be===!0&&ne.setGlobalState(A.clippingPlanes,O),os(S,B,O),Oe.updateMultisampleRenderTarget(J),Oe.updateRenderTargetMipmap(J),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let Ze=0,at=I.length;Ze<at;Ze++){const tt=I[Ze],Qe=tt.object,Ee=tt.geometry,st=tt.material,Ke=tt.group;if(st.side===_n&&Qe.layers.test(O.layers)){const Ft=st.side;st.side=Et,st.needsUpdate=!0,So(Qe,B,O,Ee,st,Ke),st.side=Ft,st.needsUpdate=!0,Ge=!0}}Ge===!0&&(Oe.updateMultisampleRenderTarget(J),Oe.updateRenderTargetMipmap(J))}A.setRenderTarget(fe,he,we),A.setClearColor(Y,K),ye!==void 0&&(O.viewport=ye),A.toneMapping=Re}function os(S,I,B){const O=I.isScene===!0?I.overrideMaterial:null;for(let L=0,J=S.length;L<J;L++){const le=S[L],fe=le.object,he=le.geometry,we=le.group;let Re=le.material;Re.allowOverride===!0&&O!==null&&(Re=O),fe.layers.test(B.layers)&&So(fe,I,B,he,Re,we)}}function So(S,I,B,O,L,J){S.onBeforeRender(A,I,B,O,L,J),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),L.onBeforeRender(A,I,B,O,S,J),L.transparent===!0&&L.side===_n&&L.forceSinglePass===!1?(L.side=Et,L.needsUpdate=!0,A.renderBufferDirect(B,I,O,L,S,J),L.side=ln,L.needsUpdate=!0,A.renderBufferDirect(B,I,O,L,S,J),L.side=_n):A.renderBufferDirect(B,I,O,L,S,J),S.onAfterRender(A,I,B,O,L,J)}function ls(S,I,B){I.isScene!==!0&&(I=Ae);const O=_e.get(S),L=f.state.lights,J=f.state.shadowsArray,le=L.state.version,fe=G.getParameters(S,L.state,J,I,B),he=G.getProgramCacheKey(fe);let we=O.programs;O.environment=S.isMeshStandardMaterial?I.environment:null,O.fog=I.fog,O.envMap=(S.isMeshStandardMaterial?lt:mt).get(S.envMap||O.environment),O.envMapRotation=O.environment!==null&&S.envMap===null?I.environmentRotation:S.envMapRotation,we===void 0&&(S.addEventListener("dispose",q),we=new Map,O.programs=we);let Re=we.get(he);if(Re!==void 0){if(O.currentProgram===Re&&O.lightsStateVersion===le)return xo(S,fe),Re}else fe.uniforms=G.getUniforms(S),S.onBeforeCompile(fe,A),Re=G.acquireProgram(fe,he),we.set(he,Re),O.uniforms=fe.uniforms;const ye=O.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(ye.clippingPlanes=ne.uniform),xo(S,fe),O.needsLights=Xc(S),O.lightsStateVersion=le,O.needsLights&&(ye.ambientLightColor.value=L.state.ambient,ye.lightProbe.value=L.state.probe,ye.directionalLights.value=L.state.directional,ye.directionalLightShadows.value=L.state.directionalShadow,ye.spotLights.value=L.state.spot,ye.spotLightShadows.value=L.state.spotShadow,ye.rectAreaLights.value=L.state.rectArea,ye.ltc_1.value=L.state.rectAreaLTC1,ye.ltc_2.value=L.state.rectAreaLTC2,ye.pointLights.value=L.state.point,ye.pointLightShadows.value=L.state.pointShadow,ye.hemisphereLights.value=L.state.hemi,ye.directionalShadowMap.value=L.state.directionalShadowMap,ye.directionalShadowMatrix.value=L.state.directionalShadowMatrix,ye.spotShadowMap.value=L.state.spotShadowMap,ye.spotLightMatrix.value=L.state.spotLightMatrix,ye.spotLightMap.value=L.state.spotLightMap,ye.pointShadowMap.value=L.state.pointShadowMap,ye.pointShadowMatrix.value=L.state.pointShadowMatrix),O.currentProgram=Re,O.uniformsList=null,Re}function Mo(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=zs.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function xo(S,I){const B=_e.get(S);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function Gc(S,I,B,O,L){I.isScene!==!0&&(I=Ae),Oe.resetTextureUnits();const J=I.fog,le=O.isMeshStandardMaterial?I.environment:null,fe=U===null?A.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Ii,he=(O.isMeshStandardMaterial?lt:mt).get(O.envMap||le),we=O.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Re=!!B.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),ye=!!B.morphAttributes.position,Ge=!!B.morphAttributes.normal,Ze=!!B.morphAttributes.color;let at=Un;O.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(at=A.toneMapping);const tt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Qe=tt!==void 0?tt.length:0,Ee=_e.get(O),st=f.state.lights;if(Be===!0&&(X===!0||S!==M)){const Tt=S===M&&O.id===x;ne.setState(O,S,Tt)}let Ke=!1;O.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==st.state.version||Ee.outputColorSpace!==fe||L.isBatchedMesh&&Ee.batching===!1||!L.isBatchedMesh&&Ee.batching===!0||L.isBatchedMesh&&Ee.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&Ee.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&Ee.instancing===!1||!L.isInstancedMesh&&Ee.instancing===!0||L.isSkinnedMesh&&Ee.skinning===!1||!L.isSkinnedMesh&&Ee.skinning===!0||L.isInstancedMesh&&Ee.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&Ee.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&Ee.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&Ee.instancingMorph===!1&&L.morphTexture!==null||Ee.envMap!==he||O.fog===!0&&Ee.fog!==J||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ne.numPlanes||Ee.numIntersection!==ne.numIntersection)||Ee.vertexAlphas!==we||Ee.vertexTangents!==Re||Ee.morphTargets!==ye||Ee.morphNormals!==Ge||Ee.morphColors!==Ze||Ee.toneMapping!==at||Ee.morphTargetsCount!==Qe)&&(Ke=!0):(Ke=!0,Ee.__version=O.version);let Ft=Ee.currentProgram;Ke===!0&&(Ft=ls(O,I,L));let si=!1,kt=!1,Oi=!1;const rt=Ft.getUniforms(),Vt=Ee.uniforms;if(ge.useProgram(Ft.program)&&(si=!0,kt=!0,Oi=!0),O.id!==x&&(x=O.id,kt=!0),si||M!==S){ge.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),rt.setValue(T,"projectionMatrix",S.projectionMatrix),rt.setValue(T,"viewMatrix",S.matrixWorldInverse);const Lt=rt.map.cameraPosition;Lt!==void 0&&Lt.setValue(T,ue.setFromMatrixPosition(S.matrixWorld)),Ce.logarithmicDepthBuffer&&rt.setValue(T,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&rt.setValue(T,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,kt=!0,Oi=!0)}if(L.isSkinnedMesh){rt.setOptional(T,L,"bindMatrix"),rt.setOptional(T,L,"bindMatrixInverse");const Tt=L.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),rt.setValue(T,"boneTexture",Tt.boneTexture,Oe))}L.isBatchedMesh&&(rt.setOptional(T,L,"batchingTexture"),rt.setValue(T,"batchingTexture",L._matricesTexture,Oe),rt.setOptional(T,L,"batchingIdTexture"),rt.setValue(T,"batchingIdTexture",L._indirectTexture,Oe),rt.setOptional(T,L,"batchingColorTexture"),L._colorsTexture!==null&&rt.setValue(T,"batchingColorTexture",L._colorsTexture,Oe));const Gt=B.morphAttributes;if((Gt.position!==void 0||Gt.normal!==void 0||Gt.color!==void 0)&&ee.update(L,B,Ft),(kt||Ee.receiveShadow!==L.receiveShadow)&&(Ee.receiveShadow=L.receiveShadow,rt.setValue(T,"receiveShadow",L.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Vt.envMap.value=he,Vt.flipEnvMap.value=he.isCubeTexture&&he.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&I.environment!==null&&(Vt.envMapIntensity.value=I.environmentIntensity),kt&&(rt.setValue(T,"toneMappingExposure",A.toneMappingExposure),Ee.needsLights&&Wc(Vt,Oi),J&&O.fog===!0&&j.refreshFogUniforms(Vt,J),j.refreshMaterialUniforms(Vt,O,z,Q,f.state.transmissionRenderTarget[S.id]),zs.upload(T,Mo(Ee),Vt,Oe)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(zs.upload(T,Mo(Ee),Vt,Oe),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&rt.setValue(T,"center",L.center),rt.setValue(T,"modelViewMatrix",L.modelViewMatrix),rt.setValue(T,"normalMatrix",L.normalMatrix),rt.setValue(T,"modelMatrix",L.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Tt=O.uniformsGroups;for(let Lt=0,ir=Tt.length;Lt<ir;Lt++){const zn=Tt[Lt];Fe.update(zn,Ft),Fe.bind(zn,Ft)}}return Ft}function Wc(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function Xc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(S,I,B){const O=_e.get(S);O.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),_e.get(S.texture).__webglTexture=I,_e.get(S.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:B,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,I){const B=_e.get(S);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0};const Yc=T.createFramebuffer();this.setRenderTarget=function(S,I=0,B=0){U=S,w=I,R=B;let O=!0,L=null,J=!1,le=!1;if(S){const he=_e.get(S);if(he.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(T.FRAMEBUFFER,null),O=!1;else if(he.__webglFramebuffer===void 0)Oe.setupRenderTarget(S);else if(he.__hasExternalTextures)Oe.rebindTextures(S,_e.get(S.texture).__webglTexture,_e.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const ye=S.depthTexture;if(he.__boundDepthTexture!==ye){if(ye!==null&&_e.has(ye)&&(S.width!==ye.image.width||S.height!==ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Oe.setupDepthRenderbuffer(S)}}const we=S.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(le=!0);const Re=_e.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Re[I])?L=Re[I][B]:L=Re[I],J=!0):S.samples>0&&Oe.useMultisampledRTT(S)===!1?L=_e.get(S).__webglMultisampledFramebuffer:Array.isArray(Re)?L=Re[B]:L=Re,P.copy(S.viewport),k.copy(S.scissor),H=S.scissorTest}else P.copy(pe).multiplyScalar(z).floor(),k.copy(Ie).multiplyScalar(z).floor(),H=qe;if(B!==0&&(L=Yc),ge.bindFramebuffer(T.FRAMEBUFFER,L)&&O&&ge.drawBuffers(S,L),ge.viewport(P),ge.scissor(k),ge.setScissorTest(H),J){const he=_e.get(S.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+I,he.__webglTexture,B)}else if(le){const he=I;for(let we=0;we<S.textures.length;we++){const Re=_e.get(S.textures[we]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+we,Re.__webglTexture,B,he)}}else if(S!==null&&B!==0){const he=_e.get(S.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,he.__webglTexture,B)}x=-1},this.readRenderTargetPixels=function(S,I,B,O,L,J,le,fe=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=_e.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&le!==void 0&&(he=he[le]),he){ge.bindFramebuffer(T.FRAMEBUFFER,he);try{const we=S.textures[fe],Re=we.format,ye=we.type;if(!Ce.textureFormatReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable(ye)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-O&&B>=0&&B<=S.height-L&&(S.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+fe),T.readPixels(I,B,O,L,Me.convert(Re),Me.convert(ye),J))}finally{const we=U!==null?_e.get(U).__webglFramebuffer:null;ge.bindFramebuffer(T.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(S,I,B,O,L,J,le,fe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=_e.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&le!==void 0&&(he=he[le]),he)if(I>=0&&I<=S.width-O&&B>=0&&B<=S.height-L){ge.bindFramebuffer(T.FRAMEBUFFER,he);const we=S.textures[fe],Re=we.format,ye=we.type;if(!Ce.textureFormatReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ge=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,Ge),T.bufferData(T.PIXEL_PACK_BUFFER,J.byteLength,T.STREAM_READ),S.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+fe),T.readPixels(I,B,O,L,Me.convert(Re),Me.convert(ye),0);const Ze=U!==null?_e.get(U).__webglFramebuffer:null;ge.bindFramebuffer(T.FRAMEBUFFER,Ze);const at=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await Gh(T,at,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,Ge),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,J),T.deleteBuffer(Ge),T.deleteSync(at),J}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,I=null,B=0){const O=Math.pow(2,-B),L=Math.floor(S.image.width*O),J=Math.floor(S.image.height*O),le=I!==null?I.x:0,fe=I!==null?I.y:0;Oe.setTexture2D(S,0),T.copyTexSubImage2D(T.TEXTURE_2D,B,0,0,le,fe,L,J),ge.unbindTexture()};const qc=T.createFramebuffer(),Kc=T.createFramebuffer();this.copyTextureToTexture=function(S,I,B=null,O=null,L=0,J=null){J===null&&(L!==0?(es("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),J=L,L=0):J=0);let le,fe,he,we,Re,ye,Ge,Ze,at;const tt=S.isCompressedTexture?S.mipmaps[J]:S.image;if(B!==null)le=B.max.x-B.min.x,fe=B.max.y-B.min.y,he=B.isBox3?B.max.z-B.min.z:1,we=B.min.x,Re=B.min.y,ye=B.isBox3?B.min.z:0;else{const Gt=Math.pow(2,-L);le=Math.floor(tt.width*Gt),fe=Math.floor(tt.height*Gt),S.isDataArrayTexture?he=tt.depth:S.isData3DTexture?he=Math.floor(tt.depth*Gt):he=1,we=0,Re=0,ye=0}O!==null?(Ge=O.x,Ze=O.y,at=O.z):(Ge=0,Ze=0,at=0);const Qe=Me.convert(I.format),Ee=Me.convert(I.type);let st;I.isData3DTexture?(Oe.setTexture3D(I,0),st=T.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Oe.setTexture2DArray(I,0),st=T.TEXTURE_2D_ARRAY):(Oe.setTexture2D(I,0),st=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,I.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,I.unpackAlignment);const Ke=T.getParameter(T.UNPACK_ROW_LENGTH),Ft=T.getParameter(T.UNPACK_IMAGE_HEIGHT),si=T.getParameter(T.UNPACK_SKIP_PIXELS),kt=T.getParameter(T.UNPACK_SKIP_ROWS),Oi=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,tt.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,tt.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,we),T.pixelStorei(T.UNPACK_SKIP_ROWS,Re),T.pixelStorei(T.UNPACK_SKIP_IMAGES,ye);const rt=S.isDataArrayTexture||S.isData3DTexture,Vt=I.isDataArrayTexture||I.isData3DTexture;if(S.isDepthTexture){const Gt=_e.get(S),Tt=_e.get(I),Lt=_e.get(Gt.__renderTarget),ir=_e.get(Tt.__renderTarget);ge.bindFramebuffer(T.READ_FRAMEBUFFER,Lt.__webglFramebuffer),ge.bindFramebuffer(T.DRAW_FRAMEBUFFER,ir.__webglFramebuffer);for(let zn=0;zn<he;zn++)rt&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,_e.get(S).__webglTexture,L,ye+zn),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,_e.get(I).__webglTexture,J,at+zn)),T.blitFramebuffer(we,Re,le,fe,Ge,Ze,le,fe,T.DEPTH_BUFFER_BIT,T.NEAREST);ge.bindFramebuffer(T.READ_FRAMEBUFFER,null),ge.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(L!==0||S.isRenderTargetTexture||_e.has(S)){const Gt=_e.get(S),Tt=_e.get(I);ge.bindFramebuffer(T.READ_FRAMEBUFFER,qc),ge.bindFramebuffer(T.DRAW_FRAMEBUFFER,Kc);for(let Lt=0;Lt<he;Lt++)rt?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Gt.__webglTexture,L,ye+Lt):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Gt.__webglTexture,L),Vt?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Tt.__webglTexture,J,at+Lt):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Tt.__webglTexture,J),L!==0?T.blitFramebuffer(we,Re,le,fe,Ge,Ze,le,fe,T.COLOR_BUFFER_BIT,T.NEAREST):Vt?T.copyTexSubImage3D(st,J,Ge,Ze,at+Lt,we,Re,le,fe):T.copyTexSubImage2D(st,J,Ge,Ze,we,Re,le,fe);ge.bindFramebuffer(T.READ_FRAMEBUFFER,null),ge.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else Vt?S.isDataTexture||S.isData3DTexture?T.texSubImage3D(st,J,Ge,Ze,at,le,fe,he,Qe,Ee,tt.data):I.isCompressedArrayTexture?T.compressedTexSubImage3D(st,J,Ge,Ze,at,le,fe,he,Qe,tt.data):T.texSubImage3D(st,J,Ge,Ze,at,le,fe,he,Qe,Ee,tt):S.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,J,Ge,Ze,le,fe,Qe,Ee,tt.data):S.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,J,Ge,Ze,tt.width,tt.height,Qe,tt.data):T.texSubImage2D(T.TEXTURE_2D,J,Ge,Ze,le,fe,Qe,Ee,tt);T.pixelStorei(T.UNPACK_ROW_LENGTH,Ke),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Ft),T.pixelStorei(T.UNPACK_SKIP_PIXELS,si),T.pixelStorei(T.UNPACK_SKIP_ROWS,kt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Oi),J===0&&I.generateMipmaps&&T.generateMipmap(st),ge.unbindTexture()},this.initRenderTarget=function(S){_e.get(S).__webglFramebuffer===void 0&&Oe.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Oe.setTextureCube(S,0):S.isData3DTexture?Oe.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Oe.setTexture2DArray(S,0):Oe.setTexture2D(S,0),ge.unbindTexture()},this.resetState=function(){w=0,R=0,U=null,ge.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return an}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}const sn=(s,e,t)=>Math.min(t,Math.max(e,s)),Br=(s,e,t)=>s+(e-s)*t,dg=(s,e,t)=>(t-s)/(e-s),Al=(s,e,t)=>{const n=sn(dg(s,e,t),0,1);return n*n*(3-2*n)},yl=(s,e)=>Math.floor(s/e),bl=(s,e)=>{const t=s%e;return t<0?t+e:t},ug=(s,e,t,n)=>{const i=s-t,r=e-n;return i*i+r*r},fg={air:{id:0,key:"air",label:"Air",solid:!1,mineable:!1,placeable:!1,mineDurationMs:0,uiColor:"transparent"},grass:{id:1,key:"grass",label:"Grass",solid:!0,mineable:!0,placeable:!0,mineDurationMs:600,textureTop:"grass_top",textureSide:"grass_side",textureBottom:"dirt",uiColor:"#6eb75e"},dirt:{id:2,key:"dirt",label:"Dirt",solid:!0,mineable:!0,placeable:!0,mineDurationMs:550,textureTop:"dirt",textureSide:"dirt",textureBottom:"dirt",uiColor:"#8d5a34"},stone:{id:3,key:"stone",label:"Stone",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1700,textureTop:"stone",textureSide:"stone",textureBottom:"stone",uiColor:"#87898e"},wood:{id:4,key:"wood",label:"Log",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1250,textureTop:"wood_top",textureSide:"wood_side",textureBottom:"wood_top",uiColor:"#8c6239"},leaves:{id:5,key:"leaves",label:"Leaves",solid:!0,mineable:!0,placeable:!0,mineDurationMs:500,textureTop:"leaves",textureSide:"leaves",textureBottom:"leaves",uiColor:"#4d8748"},bedrock:{id:6,key:"bedrock",label:"Bedrock",solid:!0,mineable:!1,placeable:!1,mineDurationMs:0,textureTop:"bedrock",textureSide:"bedrock",textureBottom:"bedrock",uiColor:"#393a3c"},planks:{id:7,key:"planks",label:"Planks",solid:!0,mineable:!0,placeable:!0,mineDurationMs:700,textureTop:"planks",textureSide:"planks",textureBottom:"planks",uiColor:"#c08b51"},crafting_table:{id:8,key:"crafting_table",label:"Crafting Table",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1200,textureTop:"crafting_table_top",textureSide:"crafting_table_side",textureBottom:"planks",uiColor:"#8b623c"},stone_bricks:{id:9,key:"stone_bricks",label:"Stone Bricks",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1900,textureTop:"stone_bricks",textureSide:"stone_bricks",textureBottom:"stone_bricks",uiColor:"#8a8d95"},water:{id:10,key:"water",label:"Water",solid:!1,mineable:!1,placeable:!1,mineDurationMs:0,textureTop:"water",textureSide:"water",textureBottom:"water",transparent:!0,liquid:!0,uiColor:"#4f89d6"},sand:{id:11,key:"sand",label:"Sand",solid:!0,mineable:!0,placeable:!0,mineDurationMs:650,textureTop:"sand",textureSide:"sand",textureBottom:"sand",uiColor:"#d8c07f"},clay:{id:12,key:"clay",label:"Clay",solid:!0,mineable:!0,placeable:!0,mineDurationMs:900,textureTop:"clay",textureSide:"clay",textureBottom:"clay",uiColor:"#8ea2b7"},mud:{id:13,key:"mud",label:"Mud",solid:!0,mineable:!0,placeable:!0,mineDurationMs:820,textureTop:"mud",textureSide:"mud",textureBottom:"mud",uiColor:"#4f463c"},grass_plant:{id:14,key:"grass_plant",label:"Tall Grass",solid:!1,mineable:!0,placeable:!0,mineDurationMs:280,textureTop:"grass_plant",textureSide:"grass_plant",textureBottom:"grass_plant",transparent:!0,plant:!0,uiColor:"#6cab58"},flower_red:{id:15,key:"flower_red",label:"Red Flower",solid:!1,mineable:!0,placeable:!0,mineDurationMs:260,textureTop:"flower_red",textureSide:"flower_red",textureBottom:"flower_red",transparent:!0,plant:!0,uiColor:"#d3504f"}},Lc=new Map(Object.values(fg).map(s=>[s.id,s])),Bn=s=>{const e=Lc.get(s);if(!e)throw new Error(`Unknown block id ${s}`);return e},Ps=s=>Bn(s).label,Ti=s=>s===null?"transparent":Lc.get(s)?.uiColor??"#000",pg=s=>Bn(s).mineDurationMs,Fn=s=>Bn(s).solid,Or=s=>Bn(s).mineable,mg=s=>Bn(s).placeable,Ks=s=>Bn(s).liquid===!0,El=s=>Bn(s).plant===!0,Mt=De.colliderWidth/2,ts=De.colliderHeight,gg=(s,e)=>{const t=Math.floor(e[0]-Mt),n=Math.floor(e[0]+Mt),i=Math.floor(e[1]),r=Math.floor(e[1]+ts-.001),a=Math.floor(e[2]-Mt),o=Math.floor(e[2]+Mt);for(let l=t;l<=n;l+=1)for(let c=i;c<=r;c+=1)for(let d=a;d<=o;d+=1)if(Fn(s.getBlock(l,c,d)))return!0;return!1},wl=(s,e,t=.06)=>{const n=Math.floor(e[1]-t),i=Math.max(.02,Mt-.03),r=[[0,0],[-i,-i],[i,-i],[-i,i],[i,i]];for(const[a,o]of r){const l=Math.floor(e[0]+a),c=Math.floor(e[2]+o);if(Fn(s.getBlock(l,n,c)))return!0}return!1},zr=(s,e,t,n)=>{let i=!1,r=0;for(;gg(s,e)&&r<8;){if(i=!0,n===0)if(t[0]>0){const a=Math.floor(e[0]+Mt);e[0]=a-Mt-.001}else if(t[0]<0){const a=Math.floor(e[0]-Mt);e[0]=a+1+Mt+.001}else break;else if(n===1)if(t[1]>0){const a=Math.floor(e[1]+ts);e[1]=a-ts-.001}else if(t[1]<0){const a=Math.floor(e[1]);e[1]=a+1}else break;else if(t[2]>0){const a=Math.floor(e[2]+Mt);e[2]=a-Mt-.001}else if(t[2]<0){const a=Math.floor(e[2]-Mt);e[2]=a+1+Mt+.001}else break;r+=1}return i};class Rn{static simulate(e,t,n,i){const r=[...t],a=[...n];let o=!1;return r[0]+=a[0]*i,zr(e,r,a,0)&&(a[0]=0),r[2]+=a[2]*i,zr(e,r,a,2)&&(a[2]=0),r[1]+=a[1]*i,zr(e,r,a,1)?(o=a[1]<=0,a[1]=0):o=wl(e,r),{position:r,velocity:a,grounded:o}}static wouldCollideWithBlock(e,t,n,i){const r=e[0]-Mt,a=e[0]+Mt,o=e[1],l=e[1]+ts,c=e[2]-Mt,d=e[2]+Mt;return!(a<=t||r>=t+1||l<=n||o>=n+1||d<=i||c>=i+1)}static sampleWater(e,t){const n=Math.floor(t[0]),i=Math.floor(t[2]),r=Math.floor(t[1]);let a=0;for(let o=0;o<=Math.ceil(ts);o+=1)Ks(e.getBlock(n,r+o,i))&&(a+=1);return{inWater:a>0,depthBlocks:a}}static hasGroundSupport(e,t){return wl(e,t)}}class Tl{state;grounded=!1;crouched=!1;sprinting=!1;sprintToggle=!1;inWater=!1;jumpCooldownMs=0;groundedDurationMs=0;coyoteTimeMs=0;jumpBufferMs=0;sprintCarryInAir=!1;allowHeldJump=!1;waterSurfaceRiseLockMs=0;moveVector=new F;upAxis=new F(0,1,0);lookEuler=new tn(0,0,0,"YXZ");constructor(e){this.state=e}update(e,t,n,i){const r=e*1e3,a=e/De.mcTickSeconds;this.jumpCooldownMs=Math.max(0,this.jumpCooldownMs-r),this.coyoteTimeMs=Math.max(0,this.coyoteTimeMs-r),this.jumpBufferMs=Math.max(0,this.jumpBufferMs-r),this.waterSurfaceRiseLockMs=Math.max(0,this.waterSurfaceRiseLockMs-r),this.grounded?(this.groundedDurationMs+=r,this.coyoteTimeMs=De.coyoteTimeMs):this.groundedDurationMs=0;const o=t.consumeLookDelta();this.state.yaw-=o.x*De.mouseSensitivity,this.state.pitch=sn(this.state.pitch-o.y*De.mouseSensitivity,-Math.PI/2+.01,Math.PI/2-.01);const l=Number(t.isAnyKeyDown([i.moveLeft.primary,i.moveLeft.secondary])),c=Number(t.isAnyKeyDown([i.moveRight.primary,i.moveRight.secondary])),d=Number(t.isAnyKeyDown([i.moveForward.primary,i.moveForward.secondary])),h=Number(t.isAnyKeyDown([i.moveBackward.primary,i.moveBackward.secondary])),u=c-l,p=d-h;this.crouched=t.isAnyKeyDown([i.crouch.primary,i.crouch.secondary]);const g=t.isAnyKeyDown([i.sprint.primary,i.sprint.secondary]),v=t.consumeAnyJustPressed([i.sprint.primary,i.sprint.secondary]),m=t.isAnyKeyDown([i.jump.primary,i.jump.secondary]),f=t.consumeAnyJustPressed([i.jump.primary,i.jump.secondary]);f&&(this.jumpBufferMs=De.jumpBufferMs),m||(this.allowHeldJump=!1);const E=this.inWater,b=Rn.sampleWater(n,this.state.position);this.inWater=b.inWater,this.inWater||(this.waterSurfaceRiseLockMs=0);const A=new F(u,0,-p);A.lengthSq()>1&&A.normalize();const C=A.lengthSq()>0;C?this.moveVector.copy(A).applyAxisAngle(this.upAxis,this.state.yaw):this.moveVector.set(0,0,0);const w=this.grounded&&this.state.velocity[1]<=.04,R=p>0,U=w&&R&&!m&&C?this.hasSprintObstacle(n,this.moveVector):!1;v&&R&&!this.crouched&&!U&&(this.sprintToggle=!0),this.sprintToggle&&(!C||h>0||this.crouched)&&(this.sprintToggle=!1);const M=(g||this.sprintToggle)&&R&&!this.crouched&&!U;if(this.inWater?(this.sprinting=!1,this.sprintToggle=!1,this.sprintCarryInAir=!1):w?(this.sprinting=M,this.sprintCarryInAir=M):(M&&(this.sprintCarryInAir=!0),(h>0||this.crouched)&&(this.sprintCarryInAir=!1),this.sprinting=this.sprintCarryInAir),C&&(this.sprinting&&R&&Math.abs(u)>0&&(A.x*=w?De.groundSprintForwardStrafeScale:De.airSprintForwardStrafeScale,A.normalize()),this.moveVector.copy(A).applyAxisAngle(this.upAxis,this.state.yaw)),this.inWater){const z=this.crouched?De.crouchSpeed:this.sprinting?De.sprintSpeed:De.walkSpeed,ie=!this.grounded&&this.sprinting&&Math.abs(A.x)>0?De.walkSpeed:z,ae=new F(A.x*ie*.62,0,A.z*z*.62);ae.applyAxisAngle(this.upAxis,this.state.yaw),this.state.velocity[0]=ae.x,this.state.velocity[2]=ae.z;const pe=b.depthBlocks>=2?5.2:2.1,Ie=!E&&this.inWater,qe=b.depthBlocks<=1;if(Ie&&m&&qe&&this.state.velocity[1]<=0&&(this.waterSurfaceRiseLockMs=140),m&&qe&&this.waterSurfaceRiseLockMs>0){const Be=this.crouched?-2.15:-.95;this.state.velocity[1]=Math.min(this.state.velocity[1],Be)}else if(m)this.state.velocity[1]=Math.min(4.1,this.state.velocity[1]+12*e);else{const Be=this.crouched?2.4:0;this.state.velocity[1]=Math.max(this.state.velocity[1]-(pe+Be)*e,-4.5)}(b.depthBlocks>=2||!m)&&(this.waterSurfaceRiseLockMs=0),this.state.velocity[1]*=.96}else{const z=w?De.groundFrictionTick:De.airFrictionTick,ie=Math.pow(z,a);this.state.velocity[0]*=ie,this.state.velocity[2]*=ie;const ae=Math.hypot(this.state.velocity[0],this.state.velocity[2]);if(C){let Ve=w?this.crouched?De.groundCrouchAccelerationTick:this.sprinting?De.groundSprintAccelerationTick:De.groundWalkAccelerationTick:this.sprinting?De.airSprintAccelerationTick:De.airWalkAccelerationTick;!w&&Math.abs(u)>0&&(this.sprinting?Ve*=p>0?De.airSprintSideControlPenalty:De.airStrafePenalty:R||(Ve*=De.airStrafePenalty));const Be=Ve*(1/De.mcTickSeconds);this.state.velocity[0]+=this.moveVector.x*Be*a,this.state.velocity[2]+=this.moveVector.z*Be*a}if(!w&&this.state.velocity[1]<0&&Math.abs(u)>0&&p<=0){const Ve=Math.hypot(this.state.velocity[0],this.state.velocity[2]),Be=Math.max(ae,De.fallStrafeBaseControlSpeed);if(Ve>Be&&Ve>1e-4){const X=Be/Ve;this.state.velocity[0]*=X,this.state.velocity[2]*=X}}const pe=w?this.crouched?De.crouchSpeed:this.sprinting?De.sprintSpeed:De.walkSpeed:this.sprinting?De.airborneSprintSpeed:De.airborneWalkSpeed,Ie=Math.min(De.maxHorizontalSpeed,pe),qe=Math.hypot(this.state.velocity[0],this.state.velocity[2]);if(qe>Ie&&qe>1e-4){const Ve=Ie/qe;this.state.velocity[0]*=Ve,this.state.velocity[2]*=Ve}this.crouched&&w&&!m&&this.applyCrouchEdgeClamp(n,e),this.state.velocity[1]-=De.gravity*e,this.state.velocity[1]*=Math.pow(De.verticalDragTick,a),this.state.velocity[1]=Math.max(this.state.velocity[1],-22)}if(!this.inWater&&this.state.velocity[1]<-4.2){const[z,ie,ae]=this.state.position,pe=Math.min(e,De.landingProbeSeconds),Ie=[z,ie+this.state.velocity[1]*pe,ae];Rn.hasGroundSupport(n,Ie)&&(this.state.velocity[1]*=De.landingApproachDamping)}let P=!1;const k=m&&!f&&this.allowHeldJump&&this.groundedDurationMs>=De.autoJumpGroundedDelayMs,H=this.jumpBufferMs>0||k,Y=w||this.coyoteTimeMs>0;if(!this.inWater&&Y&&H&&this.jumpCooldownMs<=0&&(this.state.velocity[1]=De.jumpVelocity,this.grounded=!1,P=!0,this.groundedDurationMs=0,this.coyoteTimeMs=0,this.jumpBufferMs=0,this.jumpCooldownMs=De.jumpRepeatDelayMs,this.allowHeldJump=!1,this.sprinting&&R)){const z=new F(0,0,-1).applyAxisAngle(this.upAxis,this.state.yaw);this.state.velocity[0]+=z.x*De.sprintJumpBoost,this.state.velocity[2]+=z.z*De.sprintJumpBoost}const K=this.grounded,W=this.state.velocity[1],Q=Rn.simulate(n,this.state.position,this.state.velocity,e);return this.state.position=Q.position,this.state.velocity=Q.velocity,this.grounded=Q.grounded,!K&&this.grounded&&(this.groundedDurationMs=0,this.allowHeldJump=W<-.2,this.coyoteTimeMs=De.coyoteTimeMs,this.jumpCooldownMs=Math.max(this.jumpCooldownMs,De.landingJumpCooldownMs)),this.grounded||(this.groundedDurationMs=0,this.coyoteTimeMs<=0&&(this.allowHeldJump=!1),(h>0||this.crouched)&&(this.sprintCarryInAir=!1)),this.state.position[1]<-16&&this.respawn(),{jumped:P,sprinting:this.sprinting,moving:C}}respawn(){this.state.position=[...this.state.spawnPoint],this.state.velocity=[0,0,0],this.sprintCarryInAir=!1,this.waterSurfaceRiseLockMs=0}setSelectedSlot(e){this.state.selectedSlot=e}getState(){return{...this.state,position:[...this.state.position],velocity:[...this.state.velocity],spawnPoint:[...this.state.spawnPoint]}}getPosition(){return[...this.state.position]}getCameraPosition(){return{x:this.state.position[0],y:this.state.position[1]+(this.crouched?De.crouchEyeHeight:De.eyeHeight),z:this.state.position[2]}}getRotation(){return{yaw:this.state.yaw,pitch:this.state.pitch}}getLookDirection(){const e=new F(0,0,-1);return this.lookEuler.set(this.state.pitch,this.state.yaw,0,"YXZ"),e.applyEuler(this.lookEuler),{x:e.x,y:e.y,z:e.z}}canOccupyBlock(e,t,n){return!Rn.wouldCollideWithBlock(this.state.position,e,t,n)}isCrouched(){return this.crouched}isGrounded(){return this.grounded}isInWater(){return this.inWater}applyCrouchEdgeClamp(e,t){const[n,i,r]=this.state.position;if(!Rn.hasGroundSupport(e,[n,i,r]))return;const a=n+this.state.velocity[0]*t,o=r+this.state.velocity[2]*t;if(Rn.hasGroundSupport(e,[a,i,o]))return;const l=Rn.hasGroundSupport(e,[a,i,r]),c=Rn.hasGroundSupport(e,[n,i,o]);l||(this.state.velocity[0]=0),c||(this.state.velocity[2]=0)}hasSprintObstacle(e,t){const[n,i,r]=this.state.position,a=t.clone().normalize(),o=new F(-a.z,0,a.x),l=.45,c=n+a.x*l,d=r+a.z*l,h=Math.floor(i+.08),u=Math.floor(i+(this.crouched?1.05:1.4)),p=Math.floor(i+(this.crouched?1.45:1.72));for(const g of[-.16,0,.16]){const v=Math.floor(c+o.x*g),m=Math.floor(d+o.z*g);if(Fn(e.getBlock(v,h,m))||Fn(e.getBlock(v,u,m))||Fn(e.getBlock(v,p,m)))return!0}return!1}}class Cl{static resolve(e){for(let t=0;t<=8;t+=1)for(let n=-t;n<=t;n+=1)for(let i=-t;i<=t;i+=1){const a=e.getTopSolidBlockY(n,i)+1;if(e.getBlock(n,a,i)===0&&e.getBlock(n,a+1,i)===0)return[n+.5,a,i+.5]}return[.5,48,.5]}}const Rt=({x:s,z:e})=>`${s},${e}`,_g=s=>{const[e,t]=s.split(",").map(n=>Number.parseInt(n,10));return{x:e,z:t}},Hr=(s,e)=>({x:yl(s,He.chunkSizeX),z:yl(e,He.chunkSizeZ)}),Rl=(s,e,t)=>({x:bl(s,He.chunkSizeX),y:e,z:bl(t,He.chunkSizeZ)}),Ni=s=>s.x*He.chunkSizeX,Fi=s=>s.z*He.chunkSizeZ,vg=[{normal:[1,0,0],corners:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]],texture:"side"},{normal:[-1,0,0],corners:[[0,0,1],[0,1,1],[0,1,0],[0,0,0]],texture:"side"},{normal:[0,1,0],corners:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],texture:"top"},{normal:[0,-1,0],corners:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],texture:"bottom"},{normal:[0,0,1],corners:[[1,0,1],[1,1,1],[0,1,1],[0,0,1]],texture:"side"},{normal:[0,0,-1],corners:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]],texture:"side"}];class bi{static buildGeometry(e,t,n){const i=[],r=[],a=[],o=Ni(e.coord),l=Fi(e.coord);for(let d=0;d<96;d+=1)for(let h=0;h<16;h+=1)for(let u=0;u<16;u+=1){const p=e.getBlock(u,d,h);if(p!==0){if(El(p)){const g=bi.getFaceTextureRect(p,"side",n);bi.pushPlantCross(i,r,a,u,d,h,g);continue}for(const g of vg){const v=t.getBlock(o+u+g.normal[0],d+g.normal[1],l+h+g.normal[2]);if(Ks(p)&&Ks(v)||Fn(v)&&!El(v))continue;const m=bi.getFaceTextureRect(p,g.texture,n),f=[[m.u0,m.v1],[m.u0,m.v0],[m.u1,m.v0],[m.u1,m.v1]],E=[0,1,2,0,2,3];for(const b of E){const[A,C,w]=g.corners[b];i.push(u+A,d+C,h+w),r.push(...g.normal),a.push(...f[b])}}}}const c=new An;return c.setAttribute("position",new zt(i,3)),c.setAttribute("normal",new zt(r,3)),c.setAttribute("uv",new zt(a,2)),c.computeBoundingSphere(),c}static pushPlantCross(e,t,n,i,r,a,o){[[[i+.14,r,a+.14],[i+.86,r,a+.86],[i+.86,r+.92,a+.86],[i+.14,r+.92,a+.14],[.7,0,.7]],[[i+.86,r,a+.14],[i+.14,r,a+.86],[i+.14,r+.92,a+.86],[i+.86,r+.92,a+.14],[-.7,0,.7]]].forEach(([u,p,g,v,m])=>{bi.pushQuadDoubleSided(e,t,n,u,p,g,v,m,o)})}static pushQuadDoubleSided(e,t,n,i,r,a,o,l,c){const d=[[c.u0,c.v1],[c.u1,c.v1],[c.u1,c.v0],[c.u0,c.v0]],h=[0,1,2,0,2,3],u=[0,2,1,0,3,2],p=[i,r,a,o];h.forEach(g=>{const v=p[g];e.push(v[0],v[1],v[2]),t.push(l[0],l[1],l[2]),n.push(...d[g])}),u.forEach(g=>{const v=p[g];e.push(v[0],v[1],v[2]),t.push(-l[0],-l[1],-l[2]),n.push(...d[g])})}static getFaceTextureRect(e,t,n){const i=Bn(e);return t==="top"?n.getTileRect(i.textureTop??i.textureSide??"dirt"):t==="bottom"?n.getTileRect(i.textureBottom??i.textureSide??i.textureTop??"dirt"):n.getTileRect(i.textureSide??i.textureTop??"dirt")}}const Sg=s=>{const e=new uo("#e8f4ff",.3),t=new bd("#bfe3ff","#4f5b3f",.9),n=new qs("#ffe8b9",1.45),i=new vt;return n.castShadow=!0,n.shadow.mapSize.set(1536,1536),n.shadow.camera.near=1,n.shadow.camera.far=190,n.shadow.camera.left=-58,n.shadow.camera.right=58,n.shadow.camera.top=58,n.shadow.camera.bottom=-58,n.shadow.bias=-25e-5,n.shadow.normalBias=.02,n.target=i,s.add(e,t,n,i),{ambient:e,skyBounce:t,sun:n,sunTarget:i}},Pl=(s,e,t)=>{s.sun.position.set(e+52,78,t+34),s.sunTarget.position.set(e,12,t),s.sunTarget.updateMatrixWorld()},St=64,Mg=()=>{const s=document.createElement("canvas");s.width=St,s.height=St;const e=s.getContext("2d");return e&&(e.clearRect(0,0,St,St),e.fillStyle="#d9ab84",e.fillRect(8,8,8,8),e.fillRect(20,20,8,12),e.fillStyle="#5a86c8",e.fillRect(44,20,4,12),e.fillRect(36,52,4,12),e.fillStyle="#3a4f78",e.fillRect(4,20,4,12),e.fillRect(20,52,4,12)),s},Dl=s=>{const e=new yc(s);return e.magFilter=It,e.minFilter=It,e.colorSpace=xt,e.wrapS=vn,e.wrapT=vn,e.generateMipmaps=!1,e.needsUpdate=!0,e},Ba=(s,e,t,n,i)=>{const r=s.getImageData(e,t,n,i);for(let a=0;a<n;a+=1)for(let o=0;o<i;o+=1){const l=(a+o*n)*4;if(r.data[l+3]!==255)return!0}return!1},xg=(s,e,t,n,i)=>{const r=s.getImageData(e,t,n,i);for(let a=0;a<n;a+=1)for(let o=0;o<i;o+=1){const l=(a+o*n)*4;if(!(r.data[l+0]===0&&r.data[l+1]===0&&r.data[l+2]===0&&r.data[l+3]===255))return!1}return!0},Ag=(s,e,t,n,i)=>{const r=s.getImageData(e,t,n,i);for(let a=0;a<n;a+=1)for(let o=0;o<i;o+=1){const l=(a+o*n)*4;if(!(r.data[l+0]===255&&r.data[l+1]===255&&r.data[l+2]===255&&r.data[l+3]===255))return!1}return!0},mo=s=>s/64,Il=(s,e,t)=>{if(t){if(Ba(s,0,0,e,e))return}else if(Ba(s,0,0,e,e/2))return;const n=mo(e),i=(r,a,o,l)=>{s.clearRect(r*n,a*n,o*n,l*n)};i(40,0,8,8),i(48,0,8,8),i(32,8,8,8),i(40,8,8,8),i(48,8,8,8),i(56,8,8,8),t&&(i(4,32,4,4),i(8,32,4,4),i(0,36,4,12),i(4,36,4,12),i(8,36,4,12),i(12,36,4,12),i(20,32,8,4),i(28,32,8,4),i(16,36,4,12),i(20,36,8,12),i(28,36,4,12),i(32,36,8,12),i(44,32,4,4),i(48,32,4,4),i(40,36,4,12),i(44,36,4,12),i(48,36,4,12),i(52,36,12,12),i(4,48,4,4),i(8,48,4,4),i(0,52,4,12),i(4,52,4,12),i(8,52,4,12),i(12,52,4,12),i(52,48,4,4),i(56,48,4,4),i(48,52,4,12),i(52,52,4,12),i(56,52,4,12),i(60,52,4,12))},yg=(s,e)=>{s.save(),s.scale(-1,1);const t=mo(e),n=(i,r,a,o,l,c)=>{s.drawImage(s.canvas,i*t,r*t,a*t,o*t,-l*t,c*t,-a*t,o*t)};n(4,16,4,4,20,48),n(8,16,4,4,24,48),n(0,20,4,12,24,52),n(4,20,4,12,20,52),n(8,20,4,12,16,52),n(12,20,4,12,28,52),n(44,16,4,4,36,48),n(48,16,4,4,40,48),n(40,20,4,12,40,52),n(44,20,4,12,36,52),n(48,20,4,12,32,52),n(52,20,4,12,44,52),s.restore()},bg=s=>{const e=mo(s.width),t=s.getContext("2d",{willReadFrequently:!0});if(!t)return"classic";const n=(o,l,c,d)=>Ba(t,o*e,l*e,c*e,d*e),i=(o,l,c,d)=>xg(t,o*e,l*e,c*e,d*e),r=(o,l,c,d)=>Ag(t,o*e,l*e,c*e,d*e);return n(50,16,2,4)||n(54,20,2,12)||n(42,48,2,4)||n(46,52,2,12)||i(50,16,2,4)&&i(54,20,2,12)&&i(42,48,2,4)&&i(46,52,2,12)||r(50,16,2,4)&&r(54,20,2,12)&&r(42,48,2,4)&&r(46,52,2,12)?"slim":"classic"},Eg=async s=>new Promise((e,t)=>{const n=new Image;n.onload=()=>e(n),n.onerror=()=>t(new Error("Skin image load error")),n.src=s}),wg=s=>{const e=document.createElement("canvas");e.width=St,e.height=St;const t=e.getContext("2d",{willReadFrequently:!0});if(!t)return{canvas:e,model:"classic"};t.imageSmoothingEnabled=!1,t.clearRect(0,0,St,St);const n=s.width===s.height*2;if(!n&&s.width!==s.height)throw new Error(`Bad skin size: ${s.width}x${s.height}`);return n?(t.drawImage(s,0,0,St,St/2),yg(t,St),Il(t,St,!1)):(t.drawImage(s,0,0,St,St),Il(t,St,!0)),{canvas:e,model:bg(e)}},Mi=(s,e,t,n,i,r)=>[new Xe(s/i,1-n/r),new Xe(t/i,1-n/r),new Xe(t/i,1-e/r),new Xe(s/i,1-e/r)],Tg=(s,e,t,n,i,r,a,o)=>{const l=Mi(e+r,t,e+n+r,t+r,a,o),c=Mi(e+n+r,t,e+n*2+r,t+r,a,o),d=Mi(e,t+r,e+r,t+r+i,a,o),h=Mi(e+r,t+r,e+n+r,t+r+i,a,o),u=Mi(e+n+r,t+r,e+n+r*2,t+i+r,a,o),p=Mi(e+n+r*2,t+r,e+n*2+r*2,t+i+r,a,o),g=[u[3],u[2],u[0],u[1]],v=[d[3],d[2],d[0],d[1]],m=[l[3],l[2],l[0],l[1]],f=[c[0],c[1],c[3],c[2]],E=[h[3],h[2],h[0],h[1]],b=[p[3],p[2],p[0],p[1]],A=[];for(const w of[g,v,m,f,E,b])for(const R of w)A.push(R.x,R.y);const C=s.getAttribute("uv");C.set(new Float32Array(A)),C.needsUpdate=!0},Cg=(s,e,t,n,i,r)=>{Tg(s,e,t,n,i,r,St,St)},Ds=.42,xi=.01,Rg=16,Uc=s=>{const e=s.image;if(!(e instanceof HTMLCanvasElement))return null;const t=e.getContext("2d",{willReadFrequently:!0});if(!t)return null;const n=t.getImageData(0,0,e.width,e.height);return{width:e.width,height:e.height,data:n.data}},Pg=(s,e,t)=>{if(e<0||t<0||e>=s.width||t>=s.height)return{r:0,g:0,b:0,a:0};const n=(t*s.width+e)*4;return{r:s.data[n],g:s.data[n+1],b:s.data[n+2],a:s.data[n+3]}},Dg=(s,e,t,n)=>new Qs({color:s<<16|e<<8|t,transparent:n<255,opacity:Math.max(.02,n/255),alphaTest:.02,side:ln,depthWrite:n>=254}),Ig=(s,e,t,n,i)=>({top:{x:s+i,y:e,w:t,h:i},bottom:{x:s+t+i,y:e,w:t,h:i},left:{x:s,y:e+i,w:i,h:n},front:{x:s+i,y:e+i,w:t,h:n},right:{x:s+t+i,y:e+i,w:i,h:n},back:{x:s+t+i*2,y:e+i,w:t,h:n}}),Lg=(s,e,t,n,i,r=[])=>{const a=new Yt;if(!s)return a;const o=Ig(i[0],i[1],e,t,n),l=new Set(r),c=new Map,d=Ds/2,h=new Ht(Ds/16,1/16,1/16),u=new Ht(1/16,Ds/16,1/16),p=new Ht(1/16,1/16,Ds/16),g=(v,m,f)=>{const E=t/2-f-.5;switch(v){case"front":return{x:-e/2+m+.5,y:E,z:n/2+d+xi,geometry:p};case"back":return{x:e/2-m-.5,y:E,z:-n/2-d-xi,geometry:p};case"right":return{x:e/2+d+xi,y:E,z:n/2-m-.5,geometry:h};case"left":return{x:-e/2-d-xi,y:E,z:-n/2+m+.5,geometry:h};case"top":return{x:-e/2+m+.5,y:t/2+d+xi,z:-n/2+f+.5,geometry:u};default:return{x:-e/2+m+.5,y:-t/2-d-xi,z:n/2-f-.5,geometry:u}}};return Object.keys(o).forEach(v=>{if(l.has(v))return;const m=o[v];for(let f=0;f<m.h;f+=1)for(let E=0;E<m.w;E+=1){const b=m.x+E,A=m.y+f,{r:C,g:w,b:R,a:U}=Pg(s,b,A);if(U<Rg)continue;const x=C<<24|w<<16|R<<8|U;let M=c.get(x);M||(M=Dg(C,w,R,U),c.set(x,M));const P=g(v,E,f),k=new _t(P.geometry,M);k.position.set(P.x/16,P.y/16,P.z/16),k.castShadow=!0,k.receiveShadow=!0,a.add(k)}}),a},Ug=(s,e,t,n,i,r)=>{const a=new Ht(s/16,e/16,t/16);Cg(a,n,i,s,e,t);const o=new Qs({map:r,side:ln,transparent:!1}),l=new _t(a,o);return l.castShadow=!0,l.receiveShadow=!0,l},Zn=(s,e)=>{const t=new Yt,n=Ug(e.width,e.height,e.depth,e.innerUv[0],e.innerUv[1],e.texture),i=Lg(e.sampler,e.width,e.height,e.depth,e.outerUv,e.hiddenOverlayFaces);t.add(n,i),t.position.set(...e.position),s.add(t)},Ci=async s=>{if(!s){const n=Mg();return{texture:Dl(n),model:"classic"}}const e=await Eg(s),t=wg(e);return{texture:Dl(t.canvas),model:t.model}},Ng=(s,e="classic")=>{const t=new Yt,n=e==="slim"?3:4,i=e==="slim"?5.5/16:6/16,r=Uc(s);return Zn(t,{width:8,height:8,depth:8,innerUv:[0,0],outerUv:[32,0],sampler:r,position:[0,28/16,0],texture:s}),Zn(t,{width:8,height:12,depth:4,innerUv:[16,16],outerUv:[16,32],sampler:r,hiddenOverlayFaces:["left","right"],position:[0,18/16,0],texture:s}),Zn(t,{width:n,height:12,depth:4,innerUv:[40,16],outerUv:[40,32],sampler:r,hiddenOverlayFaces:["right","top"],position:[-i,18/16,0],texture:s}),Zn(t,{width:n,height:12,depth:4,innerUv:[32,48],outerUv:[48,48],sampler:r,hiddenOverlayFaces:["left","top"],position:[i,18/16,0],texture:s}),Zn(t,{width:4,height:12,depth:4,innerUv:[0,16],outerUv:[0,32],sampler:r,hiddenOverlayFaces:["right"],position:[-2/16,6/16,-.1/16],texture:s}),Zn(t,{width:4,height:12,depth:4,innerUv:[16,48],outerUv:[0,48],sampler:r,hiddenOverlayFaces:["left"],position:[2/16,6/16,-.1/16],texture:s}),t},Fg=(s,e="classic")=>{const t=e==="slim"?3:4,n=new Yt,i=new Yt,r=Uc(s);return Zn(i,{width:t,height:12,depth:4,innerUv:[40,16],outerUv:[40,32],sampler:r,position:[0,0,0],texture:s}),i.rotation.set(Math.PI,Math.PI,0),n.add(i),n.position.x=.12,n.position.y=-.01,n.position.z=.045,n.rotation.x=-.14,n.rotation.y=-.8,n.rotation.z=.44,n.scale.set(1.25,1.25,1.25),n},Oa=s=>{const e=new Set,t=new Set,n=new Set;s.traverse(i=>{const r=i;if(r.geometry){const a=r.geometry;e.has(a)||(a.dispose(),e.add(a))}r.material&&(Array.isArray(r.material)?r.material:[r.material]).forEach(o=>{const l=o;l.map&&!n.has(l.map)&&(l.map.dispose(),n.add(l.map)),t.has(l)||(l.dispose(),t.add(l))})})};class kg{group=new Yt;constructor(){const e=new xn({side:Et,uniforms:{topColor:{value:new Ne("#7eb8f7")},horizonColor:{value:new Ne("#c9e6ff")},bottomColor:{value:new Ne("#f7ddb1")},sunDirection:{value:{x:.28,y:.82,z:.46}}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,fragmentShader:`
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDirection;
        varying vec3 vWorldPosition;
        void main() {
          vec3 dir = normalize(vWorldPosition);
          float h = dir.y * 0.5 + 0.5;
          vec3 color = mix(bottomColor, horizonColor, smoothstep(0.0, 0.45, h));
          color = mix(color, topColor, smoothstep(0.45, 1.0, h));
          float sunDot = max(dot(dir, normalize(sunDirection)), 0.0);
          float sunDisc = smoothstep(0.992, 0.9994, sunDot);
          float halo = pow(sunDot, 26.0);
          float rays = pow(sunDot, 9.0) * (0.5 + 0.5 * sin(atan(dir.x - sunDirection.x, dir.y - sunDirection.y) * 16.0));
          color += vec3(1.0, 0.88, 0.62) * sunDisc * 0.95;
          color += vec3(1.0, 0.82, 0.48) * halo * 0.3;
          color += vec3(1.0, 0.86, 0.65) * rays * 0.08;
          gl_FragColor = vec4(color, 1.0);
        }
      `,depthWrite:!1}),t=new _t(new lo(280,24,16),e);t.frustumCulled=!1,this.group.add(t);const n=new Li({color:"#ffffff",transparent:!0,opacity:.18,depthWrite:!1}),i=new Ht(10,2.4,6);[[-70,54,-50],[48,60,-20],[96,58,36],[-108,62,18],[8,56,88],[-34,64,104]].forEach(([a,o,l],c)=>{const d=new _t(i,n);d.position.set(a,o,l),d.scale.set(1.4+c%3*.24,1,1.15+c%2*.18),d.rotation.y=c*.28,this.group.add(d)})}update(e,t){this.group.position.set(e,0,t)}}const be=16,Is=4,Ll=["grass_top","grass_side","dirt","stone","wood_side","wood_top","leaves","bedrock","planks","crafting_table_top","crafting_table_side","stone_bricks","water","sand","clay","mud","grass_plant","flower_red"],Ki=(s,e,t)=>{let n=Math.imul(s+t*157,374761393)^Math.imul(e+t*311,668265263);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967295},za=(s,e)=>s[Math.min(s.length-1,Math.floor(e*s.length))],Ct=(s,e,t,n,i)=>{for(let r=0;r<be;r+=1)for(let a=0;a<be;a+=1)s.fillStyle=za(n,Ki(a,r,i)),s.fillRect(e+a,t+r,1,1)},Yi=(s,e,t,n,i,r=.25)=>{const a=s.createLinearGradient(0,t,0,t+be);a.addColorStop(0,n),a.addColorStop(1,i),s.globalAlpha=r,s.fillStyle=a,s.fillRect(e,t,be,be),s.globalAlpha=1},$t=(s,e,t,n,i,r)=>{s.fillStyle=n;for(let a=0;a<be;a+=1)for(let o=0;o<be;o+=1)Ki(o,a,i)>r&&s.fillRect(e+o,t+a,1,1)};class Bg{material;tileMap=new Map;constructor(){const e=document.createElement("canvas");e.width=Is*be,e.height=Math.ceil(Ll.length/Is)*be;const t=e.getContext("2d");if(!t)throw new Error("Unable to create texture atlas.");t.imageSmoothingEnabled=!1,Ll.forEach((i,r)=>{const a=r%Is,o=Math.floor(r/Is),l=a*be,c=o*be;this.drawTile(t,i,l,c);const d=.5;this.tileMap.set(i,{u0:(l+d)/e.width,v0:(c+d)/e.height,u1:(l+be-d)/e.width,v1:(c+be-d)/e.height})});const n=new yc(e);n.magFilter=It,n.minFilter=It,n.colorSpace=xt,n.generateMipmaps=!1,n.flipY=!1,this.material=new Qs({map:n,transparent:!0,alphaTest:.35})}getTileRect(e){const t=this.tileMap.get(e);if(!t)throw new Error(`Unknown atlas tile ${e}`);return t}drawTile(e,t,n,i){switch(t){case"grass_top":Ct(e,n,i,["#4b8038","#5a9441","#67a74a","#79bb58"],11),$t(e,n,i,"#8ecb69",12,.9),$t(e,n,i,"#3f6f31",13,.92),Yi(e,n,i,"#fef08a","#000000",.08);break;case"grass_side":Ct(e,n,i,["#71462a","#7b4d2e","#845735","#8d5f3c"],21);for(let r=0;r<5;r+=1)for(let a=0;a<be;a+=1){const o=Ki(a,r,22);e.fillStyle=za(["#4f873a","#5d9842","#6aad4e","#7bbe60"],o),e.fillRect(n+a,i+r,1,1)}e.fillStyle="#5f9d45";for(let r=1;r<be;r+=2){const a=1+Math.floor(Ki(r,6,23)*3);e.fillRect(n+r,i+5,1,a)}break;case"dirt":Ct(e,n,i,["#6d4327","#78492c","#845233","#915b3a"],31),$t(e,n,i,"#ab774f",32,.93),$t(e,n,i,"#59361f",33,.94);break;case"stone":Ct(e,n,i,["#6f7379","#7d8289","#8c9299","#999fa6"],41),e.fillStyle="#60646a";for(let r=3;r<be;r+=5)e.fillRect(n,i+r,be,1);$t(e,n,i,"#b2b7bf",42,.94);break;case"wood_side":Ct(e,n,i,["#6f4929","#7b5330","#885d36","#956844"],51),e.fillStyle="#5f3f24";for(let r=1;r<be;r+=3)e.fillRect(n+r,i,1,be);Yi(e,n,i,"#f5d7a6","#000000",.1);break;case"wood_top":for(let r=0;r<be;r+=1)for(let a=0;a<be;a+=1){const o=a-7.5,l=r-7.5,d=(Math.sin(Math.hypot(o,l)*1.8+Ki(a,r,61)*.8)*.5+.5)*.8+.2;e.fillStyle=za(["#7b522d","#8b6238","#9f7546","#b28653"],d),e.fillRect(n+a,i+r,1,1)}e.fillStyle="#5e3f22",e.fillRect(n+7,i,1,be),e.fillRect(n,i+7,be,1);break;case"leaves":Ct(e,n,i,["#356937","#3e7840","#4e8b4e","#5f9f5b"],71),$t(e,n,i,"#2d572e",72,.91),$t(e,n,i,"#78bb71",73,.93);break;case"bedrock":Ct(e,n,i,["#2c2f33","#34383d","#3d4247","#474c52"],81),e.fillStyle="#1d2024",e.fillRect(n+2,i+4,11,1),e.fillRect(n+4,i+9,8,1);break;case"planks":Ct(e,n,i,["#b5834c","#bf8b52","#cb9861","#d7a56e"],91),e.fillStyle="#8a5d34";for(let r=4;r<be;r+=6)e.fillRect(n,i+r,be,1);Yi(e,n,i,"#f9d7a1","#000000",.09);break;case"crafting_table_top":Ct(e,n,i,["#6d4b2c","#7a5632","#87603a","#946e43"],101),e.fillStyle="#c99d66",e.fillRect(n+1,i+1,be-2,1),e.fillRect(n+1,i+be-2,be-2,1),e.fillRect(n+1,i+1,1,be-2),e.fillRect(n+be-2,i+1,1,be-2),e.fillStyle="#5f3f24",e.fillRect(n+4,i+4,be-8,be-8);break;case"crafting_table_side":Ct(e,n,i,["#79512f","#865b36","#93653d","#9f7249"],111),e.fillStyle="#5d3c22",e.fillRect(n+2,i+2,be-4,be-4),e.fillStyle="#b78c57",e.fillRect(n+4,i+4,be-8,3),e.fillRect(n+4,i+9,be-8,3);break;case"stone_bricks":Ct(e,n,i,["#7b7f85","#878c93","#949aa2","#a0a6ad"],121),e.fillStyle="#5e6268",e.fillRect(n,i+5,be,1),e.fillRect(n,i+11,be,1),e.fillRect(n+6,i,1,6),e.fillRect(n+12,i+5,1,7),$t(e,n,i,"#c0c5cd",122,.95);break;case"water":Ct(e,n,i,["#356eb5","#3f7dc6","#4f90db","#5ca2ea"],131),Yi(e,n,i,"#d6f2ff","#0c2f66",.22),e.fillStyle="rgba(255,255,255,0.24)";for(let r=2;r<be;r+=5)e.fillRect(n,i+r,be,1);break;case"sand":Ct(e,n,i,["#c6b172","#d1bb7d","#dbc78e","#e4d49f"],141),$t(e,n,i,"#b29d63",142,.92);break;case"clay":Ct(e,n,i,["#7f93a8","#8ea2b7","#9eb1c5","#aebfd0"],151),$t(e,n,i,"#6a7e95",152,.93);break;case"mud":Ct(e,n,i,["#3f382f","#4a4238","#564d42","#62584b"],161),Yi(e,n,i,"#8f7d65","#261f18",.17),$t(e,n,i,"#746652",162,.93);break;case"grass_plant":e.fillStyle="#00000000",e.fillRect(n,i,be,be),e.fillStyle="#5ca246";for(let r=be-1;r>=4;r-=1){const a=3+Math.floor((be-r)/4),o=be-a-1;e.fillRect(n+a,i+r,1,1),e.fillRect(n+o,i+r,1,1)}e.fillStyle="#7ec960",e.fillRect(n+7,i+4,2,be-4);break;case"flower_red":e.fillStyle="#00000000",e.fillRect(n,i,be,be),e.fillStyle="#5e9f49",e.fillRect(n+7,i+6,2,be-6),e.fillStyle="#dd5a52",e.fillRect(n+4,i+2,8,5),e.fillStyle="#f2d7a5",e.fillRect(n+7,i+4,2,2);break;default:e.fillStyle="#ff00ff",e.fillRect(n,i,be,be)}}}const Ls=75,Og=4.65,zg=5.45,Ul=.98,Nl=-.93,Fl=-.96,kl=-.28,Bl=-.34,Ol=-.09,Vr=1.15,Hg=.01,Vg=12,zl={bobSpeed:3.8,walkBobX:.036,walkBobY:.018,walkBobZ:.009,swingDuration:.24,swingPitch:.62,swingYaw:.23,swingRoll:.41,swingForward:.09,swingRight:.11,mineSpeed:9.2,minePitch:1.12,mineYaw:.36,mineRoll:.58,mineForward:.16},Gg={bobSpeed:3.4,walkBobX:.026,walkBobY:.014,walkBobZ:.007,swingDuration:.22,swingPitch:.42,swingYaw:.18,swingRoll:.29,swingForward:.065,swingRight:.08,mineSpeed:7.1,minePitch:.68,mineYaw:.24,mineRoll:.31,mineForward:.09};class Wg{scene=new Ys;camera=new Dt(Ls,1,.1,500);handScene=new Ys;handCamera=new Dt(Ls,1,Hg,Vg);atlas=new Bg;sky=new kg;renderer;chunkMeshes=new Map;droppedItems=new Map;breakParticles=[];lights;miningOverlay;handRig=new Yt;handModel=null;handPhase=0;miningPhase=0;miningBlend=0;wasMiningActive=!1;actionTimer=0;actionStrength=0;jumpTimer=0;jumpStrength=0;handAnimationProfile={...zl};skinRequestId=0;constructor(e){this.renderer=new po({canvas:e,antialias:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.25)),this.renderer.setSize(e.clientWidth||window.innerWidth,e.clientHeight||window.innerHeight,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=tc,this.renderer.outputColorSpace=xt,this.renderer.toneMapping=nc,this.renderer.toneMappingExposure=1.03,this.renderer.setClearColor(new Ne(He.skyColor)),this.scene.background=new Ne(He.skyColor),this.scene.fog=new ao(new Ne("#95b9dd"),60,190),this.scene.add(this.sky.group),this.scene.add(this.camera),this.handScene.add(this.handCamera),this.handCamera.add(this.handRig),this.handRig.position.set(Ul,Nl,Fl),this.handRig.rotation.set(kl,Bl,Ol),this.handRig.scale.set(Vr,Vr,Vr);const t=new uo("#ffffff",.6),n=new qs("#fff2db",.95);n.position.set(1.6,2.2,2.1),this.handScene.add(t,n),this.lights=Sg(this.scene),Pl(this.lights,0,0),this.setPlayerSkin(null),this.miningOverlay=new _t(new Ht(1.01,1.01,1.01),new Li({color:"#111317",transparent:!0,opacity:0,depthWrite:!1})),this.miningOverlay.visible=!1,this.miningOverlay.renderOrder=10,this.scene.add(this.miningOverlay)}resize(e,t){this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.handCamera.aspect=e/t,this.handCamera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(e,t,!1)}setCameraTransform(e,t,n){this.camera.position.set(e.x,e.y,e.z),this.camera.rotation.order="YXZ",this.camera.rotation.y=t,this.camera.rotation.x=n,this.sky.update(e.x,e.z),Pl(this.lights,e.x,e.z)}upsertChunkMesh(e,t,n){const i=this.chunkMeshes.get(e);if(t.getAttribute("position").count===0){t.dispose(),i&&(this.scene.remove(i),i.geometry.dispose(),this.chunkMeshes.delete(e));return}if(i){i.geometry.dispose(),i.geometry=t,i.position.set(n.x,0,n.z);return}const r=new _t(t,this.atlas.material);r.position.set(n.x,0,n.z),r.castShadow=!0,r.receiveShadow=!0,this.scene.add(r),this.chunkMeshes.set(e,r)}removeChunkMesh(e){const t=this.chunkMeshes.get(e);t&&(this.scene.remove(t),t.geometry.dispose(),this.chunkMeshes.delete(e))}clearChunks(){for(const e of[...this.chunkMeshes.keys()])this.removeChunkMesh(e)}setPlayerSkin(e){this.applyPlayerSkin(e)}setFirstPersonHandVisible(e){this.handRig.visible=e}setFirstPersonAnimationPreset(e){this.handAnimationProfile=e==="item"?{...Gg}:{...zl}}setFirstPersonAnimationProfile(e){this.handAnimationProfile={...this.handAnimationProfile,...e}}triggerFirstPersonAction(e=1){const t=Math.max(.25,Math.min(1.6,e));this.actionStrength=Math.max(this.actionStrength,t),this.actionTimer=this.handAnimationProfile.swingDuration}triggerFirstPersonJump(e=1){const t=Math.max(.3,Math.min(1,e));this.jumpStrength=Math.max(this.jumpStrength,t),this.jumpTimer=.16}updateHand(e,t,n){const i=this.handAnimationProfile;this.handPhase+=e*(i.bobSpeed+t*4.4);const r=Math.max(0,t-.04),a=Math.sin(this.handPhase),o=a*(r*i.walkBobX),l=(1-Math.cos(this.handPhase*2))*.5*r*i.walkBobY*.42,c=a*r*i.walkBobZ*.22;this.actionTimer>0&&(this.actionTimer=Math.max(0,this.actionTimer-e));const d=i.swingDuration>0?1-this.actionTimer/i.swingDuration:1,h=Math.max(0,Math.min(1,d)),u=Math.sin(h*Math.PI)*Math.min(1,this.actionStrength);this.actionTimer<=0&&(this.actionStrength=Math.max(0,this.actionStrength-e*8)),this.jumpTimer>0&&(this.jumpTimer=Math.max(0,this.jumpTimer-e));const p=1-this.jumpTimer/.16,g=Math.max(0,Math.min(1,p)),m=(this.jumpTimer>0?Math.sin(g*Math.PI):0)*this.jumpStrength;this.jumpTimer<=0&&(this.jumpStrength=Math.max(0,this.jumpStrength-e*7.5)),n&&!this.wasMiningActive&&(this.miningPhase=0,this.miningBlend=0);const f=n?1:0,E=n?26:7;this.miningBlend+=(f-this.miningBlend)*Math.min(1,e*E);const b=.9+this.miningBlend*1.9;this.miningPhase+=e*i.mineSpeed*b;const A=(Math.sin(this.miningPhase)+1)*.5,C=(Math.sin(this.miningPhase*2+.35)+1)*.5,w=this.miningBlend*(A*.78+C*.22);this.wasMiningActive=n;const R=w+u;this.handRig.position.x=Ul+o+R*.11,this.handRig.position.y=Nl-l-R*.058-m*.018,this.handRig.position.z=Fl+c+-R*i.mineForward+m*.01,this.handRig.rotation.x=kl-t*.022-R*i.minePitch-m*.06,this.handRig.rotation.y=Bl+R*i.mineYaw,this.handRig.rotation.z=Ol-R*i.mineRoll+m*.024}updateSpeedFov(e,t,n,i){const r=t&&n?Ls+(i?Og:zg):Ls,a=1-Math.exp(-e*10),o=this.camera.fov+(r-this.camera.fov)*a;Math.abs(o-this.camera.fov)>.01&&(this.camera.fov=o,this.camera.updateProjectionMatrix(),this.handCamera.fov=o,this.handCamera.updateProjectionMatrix())}spawnDroppedItem(e,t,n,i,r){const a=this.droppedItems.get(e);a&&(this.scene.remove(a),a.geometry.dispose(),a.material.dispose());const o=new _t(new Ht(.26,.26,.26),new Qs({color:new Ne(t)}));o.position.set(n,i,r),o.castShadow=!0,o.receiveShadow=!0,this.scene.add(o),this.droppedItems.set(e,o)}updateDroppedItem(e,t,n,i,r,a){const o=this.droppedItems.get(e);o&&(o.position.set(t,n+a,i),o.rotation.y=r)}removeDroppedItem(e){const t=this.droppedItems.get(e);t&&(this.scene.remove(t),t.geometry.dispose(),t.material.dispose(),this.droppedItems.delete(e))}clearDroppedItems(){for(const e of[...this.droppedItems.keys()])this.removeDroppedItem(e)}spawnBreakParticles(e,t,n,i){for(let r=0;r<11;r+=1){const a=new _t(new Ht(.08,.08,.08),new Li({color:new Ne(e),transparent:!0,opacity:.9}));a.position.set(t+.5+(Math.random()-.5)*.6,n+.5+(Math.random()-.5)*.6,i+.5+(Math.random()-.5)*.6),this.scene.add(a),this.breakParticles.push({mesh:a,velocity:new F((Math.random()-.5)*4.5,Math.random()*3.2+1.2,(Math.random()-.5)*4.5),lifeMs:360+Math.random()*260,maxLifeMs:360+Math.random()*260})}}updateTransientEffects(e){const t=e*1e3;for(let n=this.breakParticles.length-1;n>=0;n-=1){const i=this.breakParticles[n];i.lifeMs-=t,i.velocity.y-=12.5*e,i.mesh.position.x+=i.velocity.x*e,i.mesh.position.y+=i.velocity.y*e,i.mesh.position.z+=i.velocity.z*e,i.mesh.rotation.x+=e*8,i.mesh.rotation.y+=e*10;const r=Math.max(0,i.lifeMs/i.maxLifeMs),a=i.mesh.material;a.opacity=r,i.mesh.scale.setScalar(Math.max(.2,r)),i.lifeMs<=0&&(this.scene.remove(i.mesh),i.mesh.geometry.dispose(),a.dispose(),this.breakParticles.splice(n,1))}}setMiningOverlay(e,t){if(!e||t<=0){this.miningOverlay.visible=!1;return}const n=this.miningOverlay.material,i=Math.max(0,Math.min(1,t));n.opacity=.08+i*.4,this.miningOverlay.scale.setScalar(1.005+i*.02),this.miningOverlay.position.set(e.blockWorldX+.5,e.blockWorldY+.5,e.blockWorldZ+.5),this.miningOverlay.visible=!0}render(){this.renderer.autoClear=!0,this.renderer.render(this.scene,this.camera),this.handRig.visible&&(this.renderer.autoClear=!1,this.renderer.clearDepth(),this.renderer.render(this.handScene,this.handCamera),this.renderer.autoClear=!0)}async applyPlayerSkin(e){const t=++this.skinRequestId;let n=await Ci(null);if(e)try{n=await Ci(e)}catch{n=await Ci(null)}if(t!==this.skinRequestId){n.texture.dispose();return}this.handModel&&(this.handRig.remove(this.handModel),Oa(this.handModel),this.handModel=null),this.handModel=Fg(n.texture,n.model),this.handRig.add(this.handModel)}}const Ha=(s,e)=>e.some(t=>s instanceof t);let Hl,Vl;function Xg(){return Hl||(Hl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Yg(){return Vl||(Vl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Va=new WeakMap,Gr=new WeakMap,tr=new WeakMap;function qg(s){const e=new Promise((t,n)=>{const i=()=>{s.removeEventListener("success",r),s.removeEventListener("error",a)},r=()=>{t(ti(s.result)),i()},a=()=>{n(s.error),i()};s.addEventListener("success",r),s.addEventListener("error",a)});return tr.set(e,s),e}function Kg(s){if(Va.has(s))return;const e=new Promise((t,n)=>{const i=()=>{s.removeEventListener("complete",r),s.removeEventListener("error",a),s.removeEventListener("abort",a)},r=()=>{t(),i()},a=()=>{n(s.error||new DOMException("AbortError","AbortError")),i()};s.addEventListener("complete",r),s.addEventListener("error",a),s.addEventListener("abort",a)});Va.set(s,e)}let Ga={get(s,e,t){if(s instanceof IDBTransaction){if(e==="done")return Va.get(s);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ti(s[e])},set(s,e,t){return s[e]=t,!0},has(s,e){return s instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in s}};function Nc(s){Ga=s(Ga)}function jg(s){return Yg().includes(s)?function(...e){return s.apply(Wa(this),e),ti(this.request)}:function(...e){return ti(s.apply(Wa(this),e))}}function $g(s){return typeof s=="function"?jg(s):(s instanceof IDBTransaction&&Kg(s),Ha(s,Xg())?new Proxy(s,Ga):s)}function ti(s){if(s instanceof IDBRequest)return qg(s);if(Gr.has(s))return Gr.get(s);const e=$g(s);return e!==s&&(Gr.set(s,e),tr.set(e,s)),e}const Wa=s=>tr.get(s);function Zg(s,e,{blocked:t,upgrade:n,blocking:i,terminated:r}={}){const a=indexedDB.open(s,e),o=ti(a);return n&&a.addEventListener("upgradeneeded",l=>{n(ti(a.result),l.oldVersion,l.newVersion,ti(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),o.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),o}const Jg=["get","getKey","getAll","getAllKeys","count"],Qg=["put","add","delete","clear"],Wr=new Map;function Gl(s,e){if(!(s instanceof IDBDatabase&&!(e in s)&&typeof e=="string"))return;if(Wr.get(e))return Wr.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=Qg.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||Jg.includes(t)))return;const r=async function(a,...o){const l=this.transaction(a,i?"readwrite":"readonly");let c=l.store;return n&&(c=c.index(o.shift())),(await Promise.all([c[t](...o),i&&l.done]))[0]};return Wr.set(e,r),r}Nc(s=>({...s,get:(e,t,n)=>Gl(e,t)||s.get(e,t,n),has:(e,t)=>!!Gl(e,t)||s.has(e,t)}));const e_=["continue","continuePrimaryKey","advance"],Wl={},Xa=new WeakMap,Fc=new WeakMap,t_={get(s,e){if(!e_.includes(e))return s[e];let t=Wl[e];return t||(t=Wl[e]=function(...n){Xa.set(this,Fc.get(this)[e](...n))}),t}};async function*n_(...s){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...s)),!e)return;e=e;const t=new Proxy(e,t_);for(Fc.set(t,e),tr.set(t,Wa(e));e;)yield t,e=await(Xa.get(t)||e.continue()),Xa.delete(t)}function Xl(s,e){return e===Symbol.asyncIterator&&Ha(s,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&Ha(s,[IDBIndex,IDBObjectStore])}Nc(s=>({...s,get(e,t,n){return Xl(e,t)?n_:s.get(e,t,n)},has(e,t){return Xl(e,t)||s.has(e,t)}}));const Ya=()=>({blocksMined:0,blocksPlaced:0,distanceTravelled:0,playTimeMs:0,jumps:0,craftedItems:0}),js=()=>({totalBlocksMined:0,totalBlocksPlaced:0,totalDistanceTravelled:0,totalPlayTimeMs:0,totalJumps:0,totalCraftedItems:0,worldsCreated:0}),dt=s=>typeof s=="number"&&Number.isFinite(s),kc=s=>dt(s)&&Number.isInteger(s)&&s>=0&&s<=15,Xr=s=>Array.isArray(s)&&s.length===3&&s.every(e=>dt(e)),$s=s=>s===null||typeof s=="string",Hs=s=>typeof s=="string"&&s.length>0,Bc=s=>{if(!s||typeof s!="object")return!1;const e=s;return dt(e.blocksMined)&&dt(e.blocksPlaced)&&dt(e.distanceTravelled)&&dt(e.playTimeMs)&&dt(e.jumps)&&dt(e.craftedItems)},Oc=s=>Array.isArray(s)&&s.every(e=>e&&typeof e=="object"&&dt(e.count)&&(e.blockId===null||kc(e.blockId))),zc=s=>{if(!s||typeof s!="object")return!1;const e=s;return Xr(e.position)&&Xr(e.velocity)&&Xr(e.spawnPoint)&&dt(e.yaw)&&dt(e.pitch)&&dt(e.selectedSlot)},Pn=s=>{if(!s||typeof s!="object")return!1;const e=s;return e.schemaVersion===5&&typeof e.id=="string"&&e.id.length>0&&typeof e.worldId=="string"&&e.worldId.length>0&&typeof e.name=="string"&&e.name.length>0&&typeof e.seed=="string"&&Hs(e.createdAt)&&Hs(e.updatedAt)&&Hs(e.lastPlayedAt)&&zc(e.player)&&Oc(e.inventory)&&Bc(e.worldStats)},i_=s=>{if(!s||typeof s!="object")return!1;const e=s;return e.schemaVersion===4&&e.worldId==="default-world"&&typeof e.seed=="string"&&Hs(e.createdAt)&&zc(e.player)&&Oc(e.inventory)&&Bc(e.worldStats)},Hc=s=>{if(!s||typeof s!="object")return!1;const e=s;return typeof e.chunkKey=="string"&&typeof e.revision=="number"&&Array.isArray(e.changes)&&e.changes.every(t=>t&&typeof t=="object"&&dt(t.index)&&kc(t.blockId))},Yr=s=>{if(!Hc(s))return!1;const e=s;return typeof e.id=="string"&&e.id.length>0&&typeof e.worldId=="string"&&e.worldId.length>0},s_=s=>{if(!s||typeof s!="object")return!1;const e=s;return e.schemaVersion!==1||!e.keyBindings||typeof e.keyBindings!="object"?!1:Vs.every(n=>{const i=e.keyBindings[n];return i&&typeof i=="object"&&typeof i.primary=="string"&&$s(i.secondary)})&&$s(e.skinDataUrl)},Yl=s=>{if(!s||typeof s!="object")return!1;const e=s;return e.schemaVersion===1&&dt(e.totalBlocksMined)&&dt(e.totalBlocksPlaced)&&dt(e.totalDistanceTravelled)&&dt(e.totalPlayTimeMs)&&dt(e.totalJumps)&&dt(e.totalCraftedItems)&&dt(e.worldsCreated)},qr=s=>{if(!s||typeof s!="object")return!1;const e=s;return e.schemaVersion===1&&$s(e.activeWorldId)&&$s(e.lastWorldId)},ql={schemaVersion:1,activeWorldId:null,lastWorldId:null},Us=s=>[...s].sort((e,t)=>{const n=Date.parse(e.lastPlayedAt||e.updatedAt||e.createdAt);return Date.parse(t.lastPlayedAt||t.updatedAt||t.createdAt)-n}),Kn=s=>({id:s.id,name:s.name,seed:s.seed,createdAt:s.createdAt,updatedAt:s.updatedAt,lastPlayedAt:s.lastPlayedAt,worldStats:{...s.worldStats}}),r_=s=>s.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,32);class a_{dbPromise=null;migrationPromise=null;getDb(){return this.dbPromise||(this.dbPromise=Zg("mineblow",ut.databaseVersion,{upgrade(e){e.objectStoreNames.contains("meta")||e.createObjectStore("meta"),e.objectStoreNames.contains("chunkDiffs")||e.createObjectStore("chunkDiffs"),e.objectStoreNames.contains("settings")||e.createObjectStore("settings"),e.objectStoreNames.contains("globalStats")||e.createObjectStore("globalStats"),e.objectStoreNames.contains("worlds")||e.createObjectStore("worlds")}})),this.dbPromise}async hasContinueState(){return await this.ensureMigrated(),await(await this.getDb()).count("worlds")>0}async listWorlds(){await this.ensureMigrated();const t=await(await this.getDb()).getAll("worlds");return Us(t.filter(Pn).map(n=>Kn(n)))}async loadWorld(e){await this.ensureMigrated();const t=await this.getDb(),n=e??await this.getPreferredWorldId(t);if(!n)return null;const i=t.transaction(["worlds","chunkDiffs","meta"],"readwrite"),r=i.objectStore("worlds"),a=await r.get(n);if(!Pn(a))return await i.done,null;const o=new Date().toISOString(),l={...a,updatedAt:o,lastPlayedAt:o};await r.put(l,l.id),await i.objectStore("meta").put({schemaVersion:1,activeWorldId:l.id,lastWorldId:l.id},ut.appMetaKey);const c=new Map,d=await i.objectStore("chunkDiffs").getAll();for(const h of d)Yr(h)&&h.worldId===l.id&&c.set(h.chunkKey,{chunkKey:h.chunkKey,revision:h.revision,changes:h.changes});return await i.done,{save:l,chunkDiffs:c}}async loadWorldSummary(e){await this.ensureMigrated();const t=await this.getDb(),n=e??await this.getPreferredWorldId(t);if(!n)return null;const i=await t.get("worlds",n);return Pn(i)?Kn(i):null}async createNewWorld(e,t,n,i,r){await this.ensureMigrated();const a=await this.getDb(),o=new Date().toISOString(),l=await this.createUniqueWorldId(e),c=e.trim()||`New World ${new Date().toLocaleDateString("en-CA")}`,d={schemaVersion:ut.schemaVersion,id:l,worldId:l,name:c,seed:t,createdAt:o,updatedAt:o,lastPlayedAt:o,player:n,inventory:i,worldStats:r},h=a.transaction(["worlds","meta","globalStats"],"readwrite");await h.objectStore("worlds").put(d,d.id),await h.objectStore("meta").put({schemaVersion:1,activeWorldId:d.id,lastWorldId:d.id},ut.appMetaKey);const u=await h.objectStore("globalStats").get("global"),p=Yl(u)?u:{schemaVersion:1,...js()};return await h.objectStore("globalStats").put({...p,worldsCreated:p.worldsCreated+1},"global"),await h.done,d}async renameWorld(e,t){await this.ensureMigrated();const n=await this.getDb(),i=await n.get("worlds",e);if(!Pn(i))return null;const r=t.trim();if(!r)return Kn(i);const a={...i,name:r,updatedAt:new Date().toISOString()};return await n.put("worlds",a,a.id),Kn(a)}async deleteWorld(e){await this.ensureMigrated();const t=await this.getDb(),n=(await t.getAll("worlds")).filter(Pn),i=await this.loadAppMeta(t),r=n.filter(u=>u.id!==e),a=Us(r.map(u=>Kn(u)))[0]?.id??null,o=t.transaction(["worlds","chunkDiffs","meta"],"readwrite");await o.objectStore("worlds").delete(e);const l=o.objectStore("chunkDiffs"),c=await l.getAllKeys(),d=await l.getAll();for(let u=0;u<d.length;u+=1){const p=d[u],g=c[u];Yr(p)&&p.worldId===e&&typeof g=="string"&&await l.delete(g)}const h={schemaVersion:1,activeWorldId:i.activeWorldId===e?a:i.activeWorldId,lastWorldId:i.lastWorldId===e?a:i.lastWorldId};h.activeWorldId&&!r.some(u=>u.id===h.activeWorldId)&&(h.activeWorldId=a),h.lastWorldId&&!r.some(u=>u.id===h.lastWorldId)&&(h.lastWorldId=a),await o.objectStore("meta").put(h,ut.appMetaKey),await o.done}async savePlayer(e,t,n,i){await this.ensureMigrated();const r=await this.getDb(),a=await r.get("worlds",e);Pn(a)&&await r.put("worlds",{...a,player:t,inventory:n,worldStats:i,updatedAt:new Date().toISOString()},a.id)}async saveChunkDiffs(e,t){if(await this.ensureMigrated(),t.length===0)return;const i=(await this.getDb()).transaction("chunkDiffs","readwrite"),r=i.objectStore("chunkDiffs");for(const a of t){const o=this.getChunkRecordKey(e,a.chunkKey);a.changes.length===0?await r.delete(o):await r.put({id:o,worldId:e,chunkKey:a.chunkKey,revision:a.revision,changes:a.changes},o)}await i.done}async clear(){const t=(await this.getDb()).transaction(["worlds","chunkDiffs","meta"],"readwrite");await t.objectStore("worlds").clear(),await t.objectStore("chunkDiffs").clear(),await t.objectStore("meta").delete(ut.appMetaKey),await t.objectStore("meta").delete(ut.legacyWorldId),await t.done}async loadSettings(){const t=await(await this.getDb()).get("settings","settings");if(s_(t))return{keyBindings:t.keyBindings,skinDataUrl:t.skinDataUrl};const n=Gs();return await this.saveSettings(n),n}async saveSettings(e){await(await this.getDb()).put("settings",{schemaVersion:1,...e},"settings")}async loadGlobalStats(){const t=await(await this.getDb()).get("globalStats","global");if(Yl(t))return{totalBlocksMined:t.totalBlocksMined,totalBlocksPlaced:t.totalBlocksPlaced,totalDistanceTravelled:t.totalDistanceTravelled,totalPlayTimeMs:t.totalPlayTimeMs,totalJumps:t.totalJumps,totalCraftedItems:t.totalCraftedItems,worldsCreated:t.worldsCreated};const n=js();return await this.saveGlobalStats(n),n}async saveGlobalStats(e){await(await this.getDb()).put("globalStats",{schemaVersion:1,...e},"global")}async ensureMigrated(){this.migrationPromise||(this.migrationPromise=this.runMigration()),await this.migrationPromise}async runMigration(){const e=await this.getDb(),t=(await e.getAll("worlds")).filter(Pn),n=await e.get("meta",ut.appMetaKey);if(t.length>0){if(!qr(n)){const d=Us(t.map(h=>Kn(h)))[0]?.id??null;await e.put("meta",{schemaVersion:1,activeWorldId:d,lastWorldId:d},ut.appMetaKey)}return}const i=await e.get("meta",ut.legacyWorldId);if(!i_(i)){qr(n)||await e.put("meta",ql,ut.appMetaKey);return}const r={schemaVersion:ut.schemaVersion,id:ut.legacyWorldId,worldId:ut.legacyWorldId,name:"Imported World",seed:i.seed,createdAt:i.createdAt,updatedAt:i.createdAt,lastPlayedAt:i.createdAt,player:i.player,inventory:i.inventory,worldStats:i.worldStats},a=e.transaction(["worlds","chunkDiffs","meta"],"readwrite");await a.objectStore("worlds").put(r,r.id);const o=a.objectStore("chunkDiffs"),l=await o.getAllKeys(),c=await o.getAll();for(let d=0;d<c.length;d+=1){const h=c[d],u=l[d];if(!Hc(h)||Yr(h))continue;const p=this.getChunkRecordKey(r.id,h.chunkKey);await o.put({id:p,worldId:r.id,chunkKey:h.chunkKey,revision:h.revision,changes:h.changes},p),typeof u=="string"&&u!==p&&await o.delete(u)}await a.objectStore("meta").put({schemaVersion:1,activeWorldId:r.id,lastWorldId:r.id},ut.appMetaKey),await a.objectStore("meta").delete(ut.legacyWorldId),await a.done}async createUniqueWorldId(e){const t=await this.getDb(),n=r_(e)||"world";let i=n,r=1;for(;await t.get("worlds",i);)r+=1,i=`${n}-${r}`;return i}async getPreferredWorldId(e){const t=await this.loadAppMeta(e);if(t.activeWorldId)return t.activeWorldId;if(t.lastWorldId)return t.lastWorldId;const n=(await e.getAll("worlds")).filter(Pn).map(i=>Kn(i));return Us(n)[0]?.id??null}async loadAppMeta(e){const t=await e.get("meta",ut.appMetaKey);return qr(t)?t:ql}getChunkRecordKey(e,t){return`${e}:${t}`}}const o_=(s,e)=>{let t;return(...n)=>{t!==void 0&&window.clearTimeout(t),t=window.setTimeout(()=>{t=void 0,s(...n)},e)}};class l_{root=document.createElement("div");panel=document.createElement("div");visible=!1;constructor(e){this.root.className="debug-layer",this.panel.className="debug-panel",this.root.append(this.panel),e.append(this.root),this.setVisible(!1)}toggle(){this.setVisible(!this.visible)}setVisible(e){this.visible=e,this.root.style.display=e?"":"none"}update(e){this.panel.textContent=e}}class c_{root=document.createElement("div");crosshair=document.createElement("div");generationLabel=document.createElement("div");fpsLabel=document.createElement("div");healthFill=document.createElement("div");healthLabel=document.createElement("div");levelFill=document.createElement("div");levelLabel=document.createElement("div");hotbar=document.createElement("div");slotElements=[];constructor(e){this.root.className="hud-layer",this.crosshair.className="crosshair",this.generationLabel.className="generation-label",this.generationLabel.textContent="Generating...",this.generationLabel.style.display="none",this.fpsLabel.className="fps-label",this.fpsLabel.textContent="FPS 0";const t=document.createElement("div");t.className="status-bars";const n=document.createElement("div");n.className="status-bar health",this.healthFill.className="status-fill",this.healthLabel.className="status-label",this.healthLabel.textContent="HP 20/20",n.append(this.healthFill,this.healthLabel);const i=document.createElement("div");i.className="status-bar level",this.levelFill.className="status-fill",this.levelLabel.className="status-label",this.levelLabel.textContent="LVL 1",i.append(this.levelFill,this.levelLabel),t.append(n,i),this.hotbar.className="hotbar";for(let r=0;r<9;r+=1){const a=document.createElement("div");a.className="hotbar-slot";const o=document.createElement("div");o.className="slot-preview";const l=document.createElement("div");l.className="slot-count",l.style.display="none",a.append(o,l),this.hotbar.append(a),this.slotElements.push(a)}this.root.append(this.crosshair,this.generationLabel,this.fpsLabel,t,this.hotbar),e.append(this.root),this.setHealth(20,20),this.setLevel(1,0)}setVisible(e){this.root.style.display=e?"":"none"}setTargetLabel(e){}setGenerating(e){this.generationLabel.style.display=e?"":"none"}setFps(e){this.fpsLabel.textContent=`FPS ${e}`}setMiningProgress(e){if(e<=0){this.crosshair.classList.remove("mining");return}this.crosshair.classList.add("mining")}setHealth(e,t){const n=Math.max(1,t),i=Math.max(0,Math.min(1,e/n));this.healthFill.style.width=`${i*100}%`,this.healthLabel.textContent=`HP ${Math.round(e)}/${n}`}setLevel(e,t){const n=Math.max(0,Math.min(1,t));this.levelFill.style.width=`${n*100}%`,this.levelLabel.textContent=`LVL ${Math.max(1,Math.floor(e))}`}setHandSkin(e){}updateHand(e,t,n){}updateHotbar(e,t){e.forEach((n,i)=>{const r=this.slotElements[i],a=r.children[0],o=r.children[1];r.classList.toggle("selected",i===t),a.style.background=Ti(n.blockId),n.count>0?(o.textContent=String(n.count),o.style.display=""):o.style.display="none"})}}class qa{constructor(e){this.container=e,this.renderer=new po({antialias:!1,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setClearColor(new Ne("#000000"),0),this.renderer.domElement.className="paperdoll-canvas",this.container.append(this.renderer.domElement),this.camera.position.set(0,1.6,3.1),this.scene.add(new uo("#dbe9ff",.6));const t=new qs("#ffe9bd",1.1);t.position.set(3.2,4,2.4),this.scene.add(t);const n=new qs("#8ab8ff",.38);n.position.set(-3,2.2,-1.8),this.scene.add(n),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container),this.resize(),this.animate(),this.setSkin(null)}scene=new Ys;camera=new Dt(38,1,.1,20);renderer;clock=new Tc;resizeObserver;model=null;rafId=0;skinRequestId=0;disposed=!1;async setSkin(e){const t=++this.skinRequestId;let n=await Ci(null);if(e)try{n=await Ci(e)}catch{n=await Ci(null)}if(this.disposed||t!==this.skinRequestId){n.texture.dispose();return}this.model&&(this.scene.remove(this.model),Oa(this.model),this.model=null),this.model=Ng(n.texture,n.model),this.model.position.y=0,this.scene.add(this.model)}dispose(){this.disposed=!0,this.resizeObserver.disconnect(),cancelAnimationFrame(this.rafId),this.model&&(this.scene.remove(this.model),Oa(this.model),this.model=null),this.renderer.dispose()}resize(){const e=Math.max(20,this.container.clientWidth),t=Math.max(20,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(e,t,!1)}animate=()=>{this.rafId=requestAnimationFrame(this.animate);const e=this.clock.getDelta();this.model&&(this.model.rotation.y+=e*.55,this.model.position.y=Math.sin(performance.now()*.0018)*.03),this.renderer.render(this.scene,this.camera)}}class h_{constructor(e,t){this.handlers=t,this.root.className="inventory-layer",this.root.addEventListener("mousemove",x=>{this.pointerX=x.clientX,this.pointerY=x.clientY,this.positionHoverLabel()});const n=document.createElement("div");n.className="inventory-panel";const i=document.createElement("div");i.className="inventory-rail",i.append(this.createFilterButton("craftable","Craftable"),this.createFilterButton("all","All"));const r=document.createElement("div");r.className="inventory-sidebar",this.title.className="inventory-title",this.status.className="inventory-status",this.recipeList.className="recipe-list";const a=document.createElement("div");a.className="inventory-workspace";const o=document.createElement("div");o.className="inventory-board";const l=document.createElement("div");l.className="inventory-board-header";const c=document.createElement("h3");c.className="inventory-section-title",c.textContent="Storage";const d=document.createElement("span");d.textContent="Left click swap, right click split, shift click quick-move.",l.append(c,d);const h=document.createElement("section");h.className="inventory-section",this.mainGrid.className="inventory-grid inventory-grid-main";const u=document.createElement("section");u.className="inventory-section inventory-hotbar-section";const p=document.createElement("h3");p.className="inventory-section-title",p.textContent="Hotbar",this.hotbarGrid.className="inventory-grid inventory-grid-hotbar";for(let x=0;x<36;x+=1){const M=document.createElement("button");M.type="button",M.className=`inventory-slot${x>=27?" hotbar":""}`,M.addEventListener("click",H=>{this.handlers.onSlotInteract({index:x,button:"left",shift:H.shiftKey})}),M.addEventListener("contextmenu",H=>{H.preventDefault(),this.handlers.onSlotInteract({index:x,button:"right",shift:H.shiftKey})}),M.addEventListener("mouseenter",()=>{this.hoveredSlotIndex=x,this.renderHoverLabel()}),M.addEventListener("mouseleave",()=>{this.hoveredSlotIndex=null,this.renderHoverLabel()});const P=document.createElement("div");P.className="inventory-slot-preview";const k=document.createElement("div");k.className="inventory-slot-count",M.append(P,k),x<27?this.mainGrid.append(M):this.hotbarGrid.append(M),this.slotButtons.push(M)}h.append(this.mainGrid),u.append(p,this.hotbarGrid),this.cursorLabel.className="inventory-cursor",this.hoverLabel.className="inventory-hover",o.append(l,h,u,this.cursorLabel);const g=document.createElement("div");g.className="inventory-preview";const v=document.createElement("div");v.className="inventory-side-card";const m=document.createElement("h3");m.className="inventory-section-title",m.textContent="Character";const f=document.createElement("div");f.className="paperdoll",f.innerHTML=`
      <div class="paperdoll-scale">3D player preview</div>
      <div class="paperdoll-stage"></div>
    `;const E=f.querySelector(".paperdoll-stage");if(!E)throw new Error("Paperdoll stage missing");this.skinViewer=new qa(E);const b=document.createElement("label");b.className="skin-loader",b.textContent="Load skin (64x64 PNG)",this.skinInput.type="file",this.skinInput.accept="image/png",this.skinInput.addEventListener("change",()=>{const x=this.skinInput.files?.[0];if(!x)return;const M=new FileReader;M.onload=()=>{typeof M.result=="string"&&(this.loadedSkinDataUrl=M.result,this.skinViewer.setSkin(M.result),this.handlers.onSkinChange(M.result))},M.readAsDataURL(x),this.skinInput.value=""}),b.append(this.skinInput),v.append(m,f,b);const A=document.createElement("div");A.className="inventory-side-card";const C=document.createElement("h3");C.className="inventory-section-title",C.textContent="Equipment";const w=document.createElement("p");w.className="inventory-side-note",w.textContent="Reserved vertical slots for future armor/equipment.";const R=document.createElement("div");R.className="equipment-slot-column";for(let x=0;x<4;x+=1){const M=document.createElement("div");M.className="equipment-slot",M.textContent="Soon",R.append(M)}A.append(C,w,R);const U=document.createElement("button");U.type="button",U.className="inventory-close",U.textContent="Close",U.addEventListener("click",()=>this.handlers.onClose()),r.append(this.title,this.status,this.recipeList),a.append(o,U),g.append(v,A),n.append(i,r,a,g,this.hoverLabel),this.root.append(n),e.append(this.root),this.setVisible(!1)}root=document.createElement("div");title=document.createElement("h2");status=document.createElement("div");recipeList=document.createElement("div");mainGrid=document.createElement("div");hotbarGrid=document.createElement("div");cursorLabel=document.createElement("div");hoverLabel=document.createElement("div");skinInput=document.createElement("input");slotButtons=[];filterButtons=new Map;skinViewer;visible=!1;loadedSkinDataUrl=null;hoveredSlotIndex=null;pointerX=0;pointerY=0;latestState=null;recipeFilter="craftable";setVisible(e){this.visible=e,this.root.style.display=e?"grid":"none",e||(this.hoveredSlotIndex=null,this.renderHoverLabel())}isVisible(){return this.visible}dispose(){this.skinViewer.dispose()}render(e){this.latestState=e,this.title.textContent=e.mode==="crafting_table"?"Crafting Table":"Inventory";const t=this.recipeFilter==="craftable"?e.recipes.filter(i=>e.craftableRecipeIds.has(i.id)):e.recipes,n=e.recipes.filter(i=>e.craftableRecipeIds.has(i.id)).length;if(this.status.textContent=e.mode==="crafting_table"?`${n} recipe(s) available on the table.`:`${n} recipe(s) available from the player inventory.`,this.filterButtons.forEach((i,r)=>{i.classList.toggle("active",r===this.recipeFilter)}),this.loadedSkinDataUrl!==e.skinDataUrl&&(this.loadedSkinDataUrl=e.skinDataUrl,this.skinViewer.setSkin(e.skinDataUrl)),this.recipeList.replaceChildren(),t.length===0){const i=document.createElement("div");i.className="recipe-empty",i.textContent=this.recipeFilter==="craftable"?"Nothing craftable right now.":"No recipes available in this mode.",this.recipeList.append(i)}else t.forEach(i=>{const r=e.craftableRecipeIds.has(i.id),a=document.createElement("button");a.type="button",a.className="recipe-card",a.disabled=!r,a.addEventListener("click",()=>this.handlers.onRecipeCraft(i.id));const o=document.createElement("div");o.className="recipe-icon",o.style.background=Ti(i.output.blockId);const l=document.createElement("div");l.className="recipe-card-body";const c=document.createElement("strong");c.textContent=i.label;const d=document.createElement("span");d.textContent=i.description;const h=document.createElement("div");h.className="recipe-ingredients",i.ingredients.forEach(u=>{const p=document.createElement("div");p.className="recipe-chip",p.innerHTML=`<b style="background:${Ti(u.blockId)}"></b>${u.count} x ${Ps(u.blockId)}`,h.append(p)}),l.append(c,d,h),a.append(o,l),this.recipeList.append(a)});e.slots.forEach((i,r)=>{const a=this.slotButtons[r],o=a.children[0],l=a.children[1],c=r-27;a.classList.toggle("selected",c===e.selectedHotbarIndex&&c>=0),a.classList.toggle("filled",i.blockId!==null&&i.count>0),o.style.background=Ti(i.blockId),o.textContent=i.blockId===null?"":Ps(i.blockId).slice(0,1).toUpperCase(),l.textContent=i.count>0?String(i.count):"",l.style.display=i.count>0?"":"none"}),e.cursor.blockId===null||e.cursor.count===0?this.cursorLabel.textContent="Cursor: empty":this.cursorLabel.textContent=`Cursor: ${e.cursor.count} x ${Ps(e.cursor.blockId)}`,this.renderHoverLabel()}createFilterButton(e,t){const n=document.createElement("button");return n.type="button",n.className="inventory-filter-button",n.textContent=t,n.addEventListener("click",()=>{this.recipeFilter=e,this.latestState&&this.render(this.latestState)}),this.filterButtons.set(e,n),n}renderHoverLabel(){if(!this.latestState||this.hoveredSlotIndex===null){this.hoverLabel.style.visibility="hidden",this.hoverLabel.textContent="";return}const e=this.latestState.slots[this.hoveredSlotIndex];if(!e||e.blockId===null||e.count<=0){this.hoverLabel.style.visibility="hidden",this.hoverLabel.textContent="";return}this.hoverLabel.style.visibility="visible",this.hoverLabel.textContent=`${Ps(e.blockId)} x${e.count}`,this.positionHoverLabel()}positionHoverLabel(){if(this.hoverLabel.style.visibility!=="visible")return;const e=14,t=18;this.hoverLabel.style.left=`${this.pointerX+e}px`,this.hoverLabel.style.top=`${this.pointerY+t}px`}}const Ka=["boys","girls"],d_=Object.assign({}),u_=Object.entries(d_).map(([s,e])=>{const t=s.match(/assets\/skins\/([^/]+)\/([^/]+)\.png$/);if(!t)return null;const[,n,i]=t;return Ka.includes(n)?{category:n,name:i,url:e}:null}).filter(s=>s!==null).sort((s,e)=>s.name.localeCompare(e.name)),Kl=s=>u_.filter(e=>e.category===s),f_=[new URL("/assets/panorama_0-DmLF9aJ6.png",import.meta.url).href,new URL("/assets/panorama_1-DSp8sqoU.png",import.meta.url).href,new URL("/assets/panorama_2-ClhO2pNg.png",import.meta.url).href,new URL("/assets/panorama_3-BratZAIM.png",import.meta.url).href,new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFUW+nUnCnVHGnWXevWnivAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqZgEwwAAAAlwSFlzAAAOwAAADsABataJCQAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC41ZYUyZQAABI1JREFUeF7tnNtC6kAQBOXo/3/zASmvEEiyc9nYXS8NITu7U64BRH3598VJkS8BHFDjUwD35fgQwF09rgK4o8i7AG5LchbALVFexPs/vZCyZAp4I6fGO4CUxQJIWSyAlOWRgEM8jY3iHUDKYgGkLBZAymIBpCwWQMpiAaQsFkDK0iXgbZb32t4B5Ay07ArvAPJvsGMLWQApiwWQslgAKYsFkLJYACmLBZCyWAD5t1j7pujtzTvAAkhZLICcidKfjXoHkLJYACmLBZDzUfRc4B1AymIBpCwWQMpiAaQsFkDKYgGkLBZAymIBpCwWQMpiAaQsFkDKYgGkLKsElH5eXYx3ACmLBZCyTC8g+wJsAaQsFkC20/ViyzuAlGVGAaVrmk/AyxluVjCdgEv/lQZmE3Dt/wz3P8l6lphLAM2/w6FsphJA6x9wNJeZBND3FxxPZR4BNP0DHspkGgG0/BsezWMSAbR7B05IYw4BNHsXTsliCgG0ugRn5TCBANp8ACem0C+AJh/CqRm0C6DFJ3ByAs0C6G8FDAinVwDNrYIh0XQKoLPVMGwXi28mGwXQ1gYYuIfF/1bZJoCetsHYSLoE0NFmGB5HkwDa2QEFwmgRQC/7oEYUHQLoZIHXV24sQJEoGgTQyF6oEkW5ANrYD3WiqBZAFyNQKYhaAbQwBrWCKBVAB6NQLYZCASx/HOrFUCeA1QdAwRjKBLD4CKgYQ5EAlh4ERUOoEcDCo6BqCCUCWHcYlA2hQACrjoTKEaQLYMmxUDuCbAGsOBiKR5AsgAVHQ/UIUgWw3ASYIID1pbb/lhKLzYAZAsgUcAgDgS5vYbEZMMM4FkDmwGozYIZhLIDMgcVmwAzDbCi057d1WW0CTDDMtdCe3lbBajNghlEsgMyC1Ubx7WMzJhjluAKCVn4wAd9hhkHSBTz7sHcAphgjW8D0W8ACyDRYbAbMMEa6gDQDlB/FAsg8WG8wFB8nX0CGASpHcEgBFA7hiAKoG0OBgGADFI3icAKoGcbRBFAyjmMJoGAkFQLCDFAulAMJoNhdFv8g5CnHEUCtaEoERBigUjgHEUCdBGoEjBqgSgZHEECNHA4ggBJJ5JS/fVKimR1QIIuiHbDbAKPzKBOwSwEjMykUsN0A41KJmmTVS1H6WgujcqncAWdobQ2MyKZUwPktC909hyHpFO+A1XuAs/MpF7BKAWdW0CDguQHOK6FDwBMFnFNEj4BHBjijiiYBywZ4vIwuAQsKeKyQPgH3DPBIJY0Cbg1wvJROAb8McLCYVgE/FHBkO/s/E7jQLOBTAffqmUTA2FdxhHcBfdNfuP36X5ZTtaT2HbCEvIAqLICUpV9A7xXYO8ACSFmEBVwvPt4BZAO9V/8PvANIWSyAlCVYQPPr2h0ccgdEWrYAUpY1Ao73jb0B7wBSFgsgZZlNQPn11juAlMUCSFksgCxkrhfWuQLu9qokYAXd77R8DSBlsQBSFgsgZbEAUhYLIP8aq19fWgApiwWQslgAKYsFkLJsEzDXj/NCmGgH9Nj1twApiwWQslgAKYsFkLJYACnK6fQfV8rrcQym40QAAAAASUVORK5CYII=",import.meta.url).href,new URL("/assets/panorama_5-DPTwu-70.png",import.meta.url).href];class Zs{constructor(e){this.container=e,this.renderer=new po({antialias:!1,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setClearColor(0,0),this.renderer.outputColorSpace=xt,this.renderer.domElement.className="menu-panorama-canvas",this.container.append(this.renderer.domElement);const t=new yd;this.materials=f_.map(n=>{const i=t.load(n);return i.colorSpace=xt,i.generateMipmaps=!0,i.magFilter=Qt,i.minFilter=In,new Li({map:i,side:Et})}),this.buildPanorama(),this.scene.add(this.root),this.camera.position.set(0,0,0),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container),this.resize(),this.animate()}scene=new Ys;camera=new Dt(85,1,.05,10);renderer;resizeObserver;clock=new Tc;root=new Yt;planes=[];materials;baseQuaternion=new Nn().setFromAxisAngle(new F(1,0,0),Math.PI);pitchQuaternion=new Nn;yawQuaternion=new Nn;rafId=0;disposed=!1;dispose(){this.disposed=!0,cancelAnimationFrame(this.rafId),this.resizeObserver.disconnect(),this.planes.forEach(e=>{e.geometry.dispose()}),this.materials.forEach(e=>{e.map?.dispose(),e.dispose()}),this.renderer.dispose(),this.renderer.domElement.remove()}resize(){const e=Math.max(20,this.container.clientWidth),t=Math.max(20,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(e,t,!1)}animate=()=>{if(this.disposed)return;this.rafId=requestAnimationFrame(this.animate);const e=this.clock.getElapsedTime(),t=(25+Math.sin(e*.02)*5)*Math.PI/180,n=-e*2*Math.PI/180;this.root.quaternion.copy(this.baseQuaternion).multiply(this.pitchQuaternion.setFromAxisAngle(Zs.X_AXIS,t)).multiply(this.yawQuaternion.setFromAxisAngle(Zs.Y_AXIS,n)),this.renderer.render(this.scene,this.camera)};buildPanorama(){this.addFace(this.materials[0],0,0,1,0,0,0),this.addFace(this.materials[1],1,0,0,0,-Math.PI/2,0),this.addFace(this.materials[2],0,0,-1,0,Math.PI,0),this.addFace(this.materials[3],-1,0,0,0,Math.PI/2,0),this.addFace(this.materials[4],0,-1,0,Math.PI/2,0,0),this.addFace(this.materials[5],0,1,0,-Math.PI/2,0,0)}addFace(e,t,n,i,r,a,o){const l=new _t(new as(2.01,2.01),e);l.position.set(t,n,i),l.rotation.set(r,a,o),l.frustumCulled=!1,this.planes.push(l),this.root.add(l)}static X_AXIS=new F(1,0,0);static Y_AXIS=new F(0,1,0)}class p_{constructor(e,t){this.handlers=t,this.root.className="menu-layer",this.panoramaHost.className="menu-panorama",this.panel.className="menu-panel",this.panorama=new Zs(this.panoramaHost),this.panoramaHost.dataset.panorama=this.panorama?"ready":"off";const n=this.buildHomeView(),i=this.buildSingleplayerView(),r=this.buildSettingsView(),a=this.buildStatsView(),o=this.buildPauseView(),l=this.buildWardrobeView();this.views.set("home",n),this.views.set("singleplayer",i),this.views.set("settings",r),this.views.set("stats",a),this.views.set("pause",o),this.views.set("wardrobe",l),this.panel.append(n,i,r,a,o,l);const c=document.createElement("div");c.className="menu-vignette",this.root.append(this.panoramaHost,c,this.panel),e.append(this.root),this.handleKeyCapture=this.handleKeyCapture.bind(this),window.addEventListener("keydown",this.handleKeyCapture),this.renderBindings(),this.syncSkinSelectionFromSettings(),this.renderWorldSelection(),this.renderStatsView(),this.renderWardrobe(),this.renderPauseView(),this.updateViewerSkins(),this.showScreen("home"),this.hide()}root=document.createElement("div");panoramaHost=document.createElement("div");panel=document.createElement("div");panorama;views=new Map;bindingButtons=new Map;wardrobeCategoryButtons=new Map;globalStatsList=document.createElement("dl");selectedStatsList=document.createElement("dl");worldList=document.createElement("div");worldDetailTitle=document.createElement("h3");worldDetailMeta=document.createElement("div");worldDetailStats=document.createElement("dl");renameInput=document.createElement("input");createNameInput=document.createElement("input");createSeedInput=document.createElement("input");playWorldButton=document.createElement("button");renameWorldButton=document.createElement("button");deleteWorldButton=document.createElement("button");wardrobeGallery=document.createElement("div");wardrobeSelectedName=document.createElement("div");wardrobeImportInput=document.createElement("input");wardrobeEmptyLabel=document.createElement("div");pauseTitle=document.createElement("h2");pauseMeta=document.createElement("div");pauseStats=document.createElement("dl");settingsResumeButton=document.createElement("button");settingsQuitButton=document.createElement("button");settingsBackButton=document.createElement("button");homeSkinLabel=document.createElement("div");homeSkinViewer;wardrobeSkinViewer;mode="boot";settings=Gs();globalStats=js();worlds=[];selectedWorldId=null;listeningBinding=null;pauseWorld=null;selectedWardrobeCategory="boys";selectedSkinUrl=null;selectedSkinName="Default";setSettings(e){this.settings={keyBindings:Jn(e.keyBindings),skinDataUrl:e.skinDataUrl},this.renderBindings(),this.syncSkinSelectionFromSettings(),this.renderWardrobe(),this.updateViewerSkins()}setGlobalStats(e){this.globalStats={...e},this.renderStatsView()}setWorlds(e){this.worlds=[...e],(!this.selectedWorldId||!this.worlds.some(t=>t.id===this.selectedWorldId))&&(this.selectedWorldId=this.worlds[0]?.id??null),this.renderWorldSelection(),this.renderStatsView()}setSelectedWorld(e){e&&this.worlds.some(t=>t.id===e)?this.selectedWorldId=e:e===null&&(this.selectedWorldId=null),this.renderWorldSelection(),this.renderStatsView()}setPauseWorld(e){this.pauseWorld=e?{id:e.id,name:e.name,seed:e.seed,worldStats:{...e.worldStats}}:null,this.renderPauseView(),this.renderStatsView()}showBoot(){this.mode="boot",this.root.style.display="grid",this.showScreen("home")}showPause(){this.mode="pause",this.root.style.display="grid",this.showScreen("pause")}hide(){this.root.style.display="none",this.listeningBinding=null,this.renderBindings()}isVisible(){return this.root.style.display!=="none"}getMode(){return this.mode}buildHomeView(){const e=document.createElement("section");e.className="menu-view home-view";const t=document.createElement("div");t.className="home-layout";const n=document.createElement("div");n.className="home-left-column";const i=document.createElement("div");i.className="title-masthead";const r=document.createElement("h1");r.textContent="Mineblow";const a=document.createElement("div");a.className="menu-splash",a.textContent="Beta!!!";const o=document.createElement("p");o.textContent="Voxel sandbox. Solo worlds. Pause menu. Inventory. Wardrobe.",i.append(r,a,o);const l=document.createElement("div");l.className="title-actions",l.append(this.buildMainButton("Solo",()=>this.showScreen("singleplayer")),this.buildMainButton("Multijoueur (soon !)",()=>{},!0),this.buildMainButton("Stats",()=>this.showScreen("stats")),this.buildMainButton("Settings",()=>this.showScreen("settings"))),n.append(i,l);const c=document.createElement("div");c.className="home-right-column menu-well";const d=document.createElement("h3");d.textContent="Player",this.homeSkinLabel.className="menu-label";const h=document.createElement("div");h.className="menu-player-stage",this.homeSkinViewer=new qa(h);const u=document.createElement("button");return u.type="button",u.className="menu-square-button",u.textContent="Vestiaire",u.addEventListener("click",()=>this.showScreen("wardrobe")),c.append(d,h,this.homeSkinLabel,u),t.append(n,c),e.append(t),e}buildSingleplayerView(){const e=document.createElement("section");e.className="menu-view classic-view",e.append(this.buildHeader("Select World","Choose a world, then play, create, rename or delete it.",()=>this.showScreen("home")));const t=document.createElement("div");t.className="classic-layout singleplayer-layout";const n=document.createElement("div");n.className="menu-well world-browser";const i=document.createElement("div");i.className="well-title",i.textContent="Saved Worlds",this.worldList.className="world-list",n.append(i,this.worldList);const r=document.createElement("div");r.className="menu-well world-detail-well";const a=document.createElement("div");a.className="well-title",a.textContent="World Details",this.worldDetailMeta.className="world-detail-meta",this.worldDetailStats.className="stats-list";const o=document.createElement("div");o.className="field-stack";const l=document.createElement("label");l.className="field-label",l.textContent="Rename selected world",this.renameInput.type="text",this.renameInput.placeholder="World name",this.renameWorldButton.type="button",this.renameWorldButton.className="menu-button",this.renameWorldButton.textContent="Rename",this.renameWorldButton.addEventListener("click",()=>{const g=this.getSelectedWorld();g&&this.handlers.onRenameWorld(g.id,this.renameInput.value.trim())}),o.append(l,this.renameInput,this.renameWorldButton);const c=document.createElement("div");c.className="field-stack";const d=document.createElement("label");d.className="field-label",d.textContent="Create a new world",this.createNameInput.type="text",this.createNameInput.placeholder="World name",this.createNameInput.value="New World",this.createSeedInput.type="text",this.createSeedInput.placeholder="Seed (optional)",c.append(d,this.createNameInput,this.createSeedInput),r.append(a,this.worldDetailTitle,this.worldDetailMeta,this.worldDetailStats,o,c),t.append(n,r);const h=document.createElement("div");h.className="classic-footer",this.playWorldButton.type="button",this.playWorldButton.className="menu-button",this.playWorldButton.textContent="Play Selected World",this.playWorldButton.addEventListener("click",()=>{this.selectedWorldId&&this.handlers.onPlayWorld(this.selectedWorldId)});const u=document.createElement("button");u.type="button",u.className="menu-button",u.textContent="Create New World",u.addEventListener("click",()=>{this.handlers.onCreateWorld(this.createNameInput.value.trim(),this.createSeedInput.value.trim()),this.createSeedInput.value=""}),this.deleteWorldButton.type="button",this.deleteWorldButton.className="menu-button",this.deleteWorldButton.textContent="Delete",this.deleteWorldButton.addEventListener("click",()=>{const g=this.getSelectedWorld();g&&window.confirm(`Delete "${g.name}"?`)&&this.handlers.onDeleteWorld(g.id)});const p=document.createElement("button");return p.type="button",p.className="menu-button secondary",p.textContent="Cancel",p.addEventListener("click",()=>this.showScreen("home")),h.append(this.playWorldButton,u,this.deleteWorldButton,p),e.append(t,h),e}buildSettingsView(){const e=document.createElement("section");e.className="menu-view classic-view",e.append(this.buildHeader("Controls","Click a slot, then press a key.",()=>this.showScreen(this.mode==="pause"?"pause":"home")));const t=document.createElement("div");t.className="menu-well settings-well";const n=document.createElement("div");n.className="binding-list",Vs.forEach(a=>{const o=document.createElement("div");o.className="binding-row";const l=document.createElement("div");l.className="binding-label",l.textContent=jc[a];const c=document.createElement("div");c.className="binding-buttons";const d=document.createElement("button");d.type="button",d.className="binding-button",d.addEventListener("click",()=>this.startBindingCapture(a,"primary")),this.bindingButtons.set(`${a}:primary`,d);const h=document.createElement("button");h.type="button",h.className="binding-button",h.addEventListener("click",()=>this.startBindingCapture(a,"secondary")),this.bindingButtons.set(`${a}:secondary`,h),c.append(d,h),o.append(l,c),n.append(o)}),t.append(n);const i=document.createElement("div");i.className="classic-footer",this.settingsBackButton.type="button",this.settingsBackButton.className="menu-button secondary",this.settingsBackButton.textContent="Back",this.settingsBackButton.addEventListener("click",()=>this.showScreen(this.mode==="pause"?"pause":"home"));const r=document.createElement("button");return r.type="button",r.className="menu-button",r.textContent="Reset Defaults",r.addEventListener("click",()=>{this.settings=Gs(),this.renderBindings(),this.handlers.onSettingsChange({keyBindings:Jn(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl})}),this.settingsResumeButton.type="button",this.settingsResumeButton.className="menu-button",this.settingsResumeButton.textContent="Back to Game",this.settingsResumeButton.addEventListener("click",()=>{this.hide(),this.handlers.onResume()}),this.settingsQuitButton.type="button",this.settingsQuitButton.className="menu-button",this.settingsQuitButton.textContent="Quitter la partie",this.settingsQuitButton.addEventListener("click",()=>this.handlers.onQuitToTitle()),i.append(this.settingsBackButton,r,this.settingsResumeButton,this.settingsQuitButton),e.append(t,i),e}buildStatsView(){const e=document.createElement("section");e.className="menu-view classic-view",e.append(this.buildHeader("Statistics","Global stats and selected world stats.",()=>this.showScreen("home")));const t=document.createElement("div");t.className="classic-layout stats-layout";const n=document.createElement("div");n.className="menu-well";const i=document.createElement("div");i.className="well-title",i.textContent="Global Stats",this.globalStatsList.className="stats-list",n.append(i,this.globalStatsList);const r=document.createElement("div");r.className="menu-well";const a=document.createElement("div");a.className="well-title",a.textContent="Selected World",this.selectedStatsList.className="stats-list",r.append(a,this.selectedStatsList),t.append(n,r);const o=document.createElement("div");o.className="classic-footer";const l=document.createElement("button");return l.type="button",l.className="menu-button secondary",l.textContent="Back",l.addEventListener("click",()=>this.showScreen("home")),o.append(l),e.append(t,o),e}buildPauseView(){const e=document.createElement("section");e.className="menu-view pause-view";const t=document.createElement("div");t.className="menu-well pause-well",this.pauseMeta.className="menu-label",this.pauseStats.className="stats-list";const n=document.createElement("div");return n.className="title-actions",n.append(this.buildMainButton("Back to Game",()=>{this.hide(),this.handlers.onResume()}),this.buildMainButton("Settings",()=>this.showScreen("settings")),this.buildMainButton("Quitter la partie",()=>this.handlers.onQuitToTitle())),t.append(this.pauseTitle,this.pauseMeta,this.pauseStats,n),e.append(t),e}buildWardrobeView(){const e=document.createElement("section");e.className="menu-view classic-view",e.append(this.buildHeader("Wardrobe","Choose a skin category or import a custom PNG.",()=>this.showScreen("home")));const t=document.createElement("div");t.className="classic-layout wardrobe-layout";const n=document.createElement("div");n.className="menu-well";const i=document.createElement("div");i.className="well-title",i.textContent="Categories";const r=document.createElement("div");r.className="wardrobe-category-list",Ka.forEach(g=>{const v=document.createElement("button");v.type="button",v.className="menu-button wardrobe-category-button",v.textContent=g,v.addEventListener("click",()=>{this.selectedWardrobeCategory=g,this.renderWardrobe()}),this.wardrobeCategoryButtons.set(g,v),r.append(v)}),n.append(i,r);const a=document.createElement("div");a.className="menu-well";const o=document.createElement("div");o.className="well-title",o.textContent="Skin Gallery",this.wardrobeGallery.className="wardrobe-gallery",this.wardrobeEmptyLabel.className="empty-worlds",a.append(o,this.wardrobeGallery,this.wardrobeEmptyLabel);const l=document.createElement("div");l.className="menu-well wardrobe-preview-well";const c=document.createElement("div");c.className="well-title",c.textContent="Selected Skin";const d=document.createElement("div");d.className="menu-player-stage wardrobe-stage",this.wardrobeSkinViewer=new qa(d),this.wardrobeSelectedName.className="menu-label";const h=document.createElement("label");h.className="menu-button wardrobe-import-button",h.textContent="Import PNG",this.wardrobeImportInput.type="file",this.wardrobeImportInput.accept="image/png",this.wardrobeImportInput.addEventListener("change",()=>{const g=this.wardrobeImportInput.files?.[0];if(!g)return;const v=new FileReader;v.onload=()=>{typeof v.result=="string"&&(this.selectedSkinUrl=v.result,this.selectedSkinName=g.name.replace(/\.[^.]+$/,""),this.commitSkinSelection(v.result),this.renderWardrobe(),this.updateViewerSkins())},v.readAsDataURL(g),this.wardrobeImportInput.value=""}),h.append(this.wardrobeImportInput),l.append(c,d,this.wardrobeSelectedName,h),t.append(n,a,l);const u=document.createElement("div");u.className="classic-footer";const p=document.createElement("button");return p.type="button",p.className="menu-button secondary",p.textContent="Back",p.addEventListener("click",()=>this.showScreen("home")),u.append(p),e.append(t,u),e}buildHeader(e,t,n){const i=document.createElement("div");i.className="menu-screen-header";const r=document.createElement("div");r.className="screen-title-wrap";const a=document.createElement("h2");a.textContent=e;const o=document.createElement("p");o.textContent=t,r.append(a,o);const l=document.createElement("button");return l.type="button",l.className="menu-button secondary",l.textContent="Back",l.addEventListener("click",n),i.append(r,l),i}buildMainButton(e,t,n=!1){const i=document.createElement("button");return i.type="button",i.className="menu-button menu-button-large",i.textContent=e,i.disabled=n,i.addEventListener("click",t),i}showScreen(e){this.panel.dataset.mode=this.mode,this.panel.dataset.screen=e,this.views.forEach((t,n)=>{t.style.display=n===e?"grid":"none"}),this.settingsResumeButton.style.display=this.mode==="pause"?"":"none",this.settingsQuitButton.style.display=this.mode==="pause"?"":"none",this.renderPauseView(),this.renderStatsView(),this.renderWardrobe()}getSelectedWorld(){return this.worlds.find(e=>e.id===this.selectedWorldId)??null}renderWorldSelection(){if(this.worldList.replaceChildren(),this.worlds.length===0){const t=document.createElement("div");t.className="empty-worlds",t.textContent="No worlds yet. Create one on the right.",this.worldList.append(t)}else this.worlds.forEach(t=>{const n=document.createElement("button");n.type="button",n.className="world-card",n.classList.toggle("selected",t.id===this.selectedWorldId),n.addEventListener("click",()=>{this.selectedWorldId=t.id,this.renderWorldSelection(),this.renderStatsView()}),n.addEventListener("dblclick",()=>this.handlers.onPlayWorld(t.id));const i=document.createElement("strong");i.textContent=t.name;const r=document.createElement("span");r.textContent=`${this.formatDate(t.lastPlayedAt)} | Seed ${t.seed}`;const a=document.createElement("em");a.textContent=`${this.formatDuration(t.worldStats.playTimeMs)} | ${t.worldStats.blocksMined.toLocaleString()} mined`,n.append(i,r,a),this.worldList.append(n)});const e=this.getSelectedWorld();if(!e){this.worldDetailTitle.textContent="No world selected",this.worldDetailMeta.textContent="Pick a world from the list or create a new one.",this.worldDetailStats.replaceChildren(...this.buildStatEntries([["Stats","No data"],["Seed","N/A"]])),this.playWorldButton.disabled=!0,this.renameWorldButton.disabled=!0,this.deleteWorldButton.disabled=!0,this.renameInput.value="";return}this.worldDetailTitle.textContent=e.name,this.worldDetailMeta.textContent=`Created ${this.formatDate(e.createdAt)} | Last played ${this.formatDate(e.lastPlayedAt)} | Seed ${e.seed}`,this.worldDetailStats.replaceChildren(...this.buildStatEntries([["Play Time",this.formatDuration(e.worldStats.playTimeMs)],["Blocks Mined",e.worldStats.blocksMined.toLocaleString()],["Blocks Placed",e.worldStats.blocksPlaced.toLocaleString()],["Distance",`${Math.round(e.worldStats.distanceTravelled).toLocaleString()} m`],["Jumps",e.worldStats.jumps.toLocaleString()],["Crafted",e.worldStats.craftedItems.toLocaleString()]])),this.playWorldButton.disabled=!1,this.renameWorldButton.disabled=!1,this.deleteWorldButton.disabled=!1,(document.activeElement!==this.renameInput||this.renameInput.dataset.worldId!==e.id)&&(this.renameInput.value=e.name,this.renameInput.dataset.worldId=e.id)}renderStatsView(){this.globalStatsList.replaceChildren(...this.buildStatEntries([["Worlds",this.worlds.length.toString()],["Play Time",this.formatDuration(this.globalStats.totalPlayTimeMs)],["Blocks Mined",this.globalStats.totalBlocksMined.toLocaleString()],["Blocks Placed",this.globalStats.totalBlocksPlaced.toLocaleString()],["Distance",`${Math.round(this.globalStats.totalDistanceTravelled).toLocaleString()} m`],["Jumps",this.globalStats.totalJumps.toLocaleString()],["Crafted",this.globalStats.totalCraftedItems.toLocaleString()]]));const e=this.pauseWorld??this.getSelectedWorld();if(!e){this.selectedStatsList.replaceChildren(...this.buildStatEntries([["Selected World","No world selected"],["Seed","N/A"]]));return}this.selectedStatsList.replaceChildren(...this.buildStatEntries([["World",e.name],["Seed",e.seed],["Play Time",this.formatDuration(e.worldStats.playTimeMs)],["Blocks Mined",e.worldStats.blocksMined.toLocaleString()],["Blocks Placed",e.worldStats.blocksPlaced.toLocaleString()],["Distance",`${Math.round(e.worldStats.distanceTravelled).toLocaleString()} m`],["Jumps",e.worldStats.jumps.toLocaleString()],["Crafted",e.worldStats.craftedItems.toLocaleString()]]))}renderPauseView(){const e=this.pauseWorld??{name:"Game Paused",seed:"N/A",worldStats:Ya()};this.pauseTitle.textContent=e.name,this.pauseMeta.textContent=`Seed ${e.seed}`,this.pauseStats.replaceChildren(...this.buildStatEntries([["Play Time",this.formatDuration(e.worldStats.playTimeMs)],["Blocks Mined",e.worldStats.blocksMined.toLocaleString()],["Blocks Placed",e.worldStats.blocksPlaced.toLocaleString()],["Distance",`${Math.round(e.worldStats.distanceTravelled).toLocaleString()} m`]]))}renderWardrobe(){this.wardrobeCategoryButtons.forEach((t,n)=>{t.classList.toggle("active",n===this.selectedWardrobeCategory)});const e=Kl(this.selectedWardrobeCategory);this.wardrobeGallery.replaceChildren(),e.forEach(t=>{const n=document.createElement("button");n.type="button",n.className="wardrobe-skin-card",n.classList.toggle("selected",t.url===this.selectedSkinUrl),n.addEventListener("click",()=>this.selectCatalogSkin(t));const i=document.createElement("span");i.textContent=t.name,n.append(i),this.wardrobeGallery.append(n)}),this.wardrobeEmptyLabel.style.display=e.length===0?"":"none",this.wardrobeEmptyLabel.textContent=`Drop PNG skins into assets/skins/${this.selectedWardrobeCategory}.`,this.wardrobeSelectedName.textContent=`Selected: ${this.selectedSkinName}`}selectCatalogSkin(e){this.selectedWardrobeCategory=e.category,this.selectedSkinUrl=e.url,this.selectedSkinName=e.name,this.commitSkinSelection(e.url),this.renderWardrobe(),this.updateViewerSkins()}syncSkinSelectionFromSettings(){const e=this.settings.skinDataUrl,t=e===null?null:Ka.flatMap(n=>Kl(n)).find(n=>n.url===e)??null;t?(this.selectedWardrobeCategory=t.category,this.selectedSkinUrl=t.url,this.selectedSkinName=t.name):e?(this.selectedSkinUrl=e,this.selectedSkinName="Imported skin"):(this.selectedSkinUrl=null,this.selectedSkinName="Default"),this.homeSkinLabel.textContent=`Skin: ${this.selectedSkinName}`}updateViewerSkins(){this.homeSkinViewer.setSkin(this.settings.skinDataUrl),this.wardrobeSkinViewer.setSkin(this.settings.skinDataUrl),this.homeSkinLabel.textContent=`Skin: ${this.selectedSkinName}`}commitSkinSelection(e){this.settings={keyBindings:Jn(this.settings.keyBindings),skinDataUrl:e},this.handlers.onSettingsChange({keyBindings:Jn(this.settings.keyBindings),skinDataUrl:e})}startBindingCapture(e,t){this.listeningBinding={action:e,slot:t},this.renderBindings()}handleKeyCapture(e){if(!this.isVisible()||!this.listeningBinding)return;e.preventDefault();const{action:t,slot:n}=this.listeningBinding;if(e.code==="Escape"){this.listeningBinding=null,this.renderBindings();return}n==="secondary"&&(e.code==="Backspace"||e.code==="Delete")?this.settings.keyBindings[t].secondary=null:n==="primary"?this.settings.keyBindings[t].primary=e.code:this.settings.keyBindings[t].secondary=e.code,this.listeningBinding=null,this.renderBindings(),this.handlers.onSettingsChange({keyBindings:Jn(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl})}renderBindings(){Vs.forEach(e=>{["primary","secondary"].forEach(t=>{const n=this.bindingButtons.get(`${e}:${t}`);if(!n)return;const i=this.settings.keyBindings[e][t],r=this.listeningBinding?.action===e&&this.listeningBinding.slot===t;n.textContent=r?"Press key...":Zc(i),n.classList.toggle("listening",r)})})}buildStatEntries(e){const t=[];return e.forEach(([n,i])=>{const r=document.createElement("dt");r.textContent=n;const a=document.createElement("dd");a.textContent=i,t.push(r,a)}),t}formatDate(e){const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("en-GB",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)}formatDuration(e){const t=Math.max(0,Math.floor(e/1e3)),n=Math.floor(t/3600),i=Math.floor(t%3600/60),r=t%60;return n>0?`${n}h ${i}m`:i>0?`${i}m ${r}s`:`${r}s`}}class m_{static cast(e,t,n,i){let r=Math.floor(t.x),a=Math.floor(t.y),o=Math.floor(t.z);const l=n.x>0?1:n.x<0?-1:0,c=n.y>0?1:n.y<0?-1:0,d=n.z>0?1:n.z<0?-1:0,h=l===0?Number.POSITIVE_INFINITY:Math.abs(1/n.x),u=c===0?Number.POSITIVE_INFINITY:Math.abs(1/n.y),p=d===0?Number.POSITIVE_INFINITY:Math.abs(1/n.z),g=w=>w-Math.floor(w);let v=l>0?(1-g(t.x))*h:l<0?g(t.x)*h:Number.POSITIVE_INFINITY,m=c>0?(1-g(t.y))*u:c<0?g(t.y)*u:Number.POSITIVE_INFINITY,f=d>0?(1-g(t.z))*p:d<0?g(t.z)*p:Number.POSITIVE_INFINITY,E=0,b=0,A=0,C=0;for(;E<=i;){const w=e.getBlock(r,a,o);if(w!==0)return{blockWorldX:r,blockWorldY:a,blockWorldZ:o,placeWorldX:r+b,placeWorldY:a+A,placeWorldZ:o+C,normalX:b,normalY:A,normalZ:C,blockId:w,distance:E};v<m&&v<f?(r+=l,E=v,v+=h,b=-l,A=0,C=0):m<f?(a+=c,E=m,m+=u,b=0,A=-c,C=0):(o+=d,E=f,f+=p,b=0,A=0,C=-d)}return null}}class kn{key;coord;blocks;baseBlocks;dirty=!0;revision=0;constructor(e,t,n){this.coord=e,this.blocks=t,this.baseBlocks=n||t.slice(),this.key=Rt(e)}static getIndex(e,t,n){return e+n*He.chunkSizeX+t*He.chunkSizeX*He.chunkSizeZ}getBlock(e,t,n){return this.blocks[kn.getIndex(e,t,n)]}setBlock(e,t,n,i){const r=kn.getIndex(e,t,n);return this.blocks[r]===i?!1:(this.blocks[r]=i,this.dirty=!0,this.revision+=1,!0)}}class g_{chunks=new Map;set(e){this.chunks.set(e.key,e)}get(e){return this.chunks.get(e)}delete(e){return this.chunks.delete(e)}has(e){return this.chunks.has(e)}values(){return this.chunks.values()}entries(){return this.chunks.entries()}get size(){return this.chunks.size}clear(){this.chunks.clear()}}const Ns=(s,e,t)=>{let n=s^e*374761393^t*668265263;return n=(n^n>>>13)*1274126177,n^=n>>>16,(n>>>0)/4294967295},Nt=s=>{let e=2166136261;for(let t=0;t<s.length;t+=1)e^=s.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0};class Zt{constructor(e){this.seed=e}sample(e,t){const n=Math.floor(e),i=Math.floor(t),r=n+1,a=i+1,o=Al(0,1,e-n),l=Al(0,1,t-i),c=Ns(this.seed,n,i),d=Ns(this.seed,r,i),h=Ns(this.seed,n,a),u=Ns(this.seed,r,a),p=Br(c,d,o),g=Br(h,u,o);return Br(p,g,l)*2-1}fractal(e,t,n,i,r){let a=1,o=0,l=0,c=i;for(let d=0;d<n;d+=1)l+=this.sample(e*c,t*c)*a,o+=a,a*=r,c*=2;return o===0?0:l/o}}const __=.986,jl=(s,e,t)=>{let n=s^Math.imul(e,73428767)^Math.imul(t,912931);return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967295};class v_{constructor(e){this.worldSeed=e}seed=Nt("tree");shouldSpawnTree(e,t){const n=Nt(this.worldSeed)^this.seed;return jl(n,e,t)>__}getTreeHeight(e,t){const n=Nt(this.worldSeed)^this.seed<<1;return 4+Math.floor(jl(n,e,t)*3)}applyTrees(e,t,n,i,r){const a=Ni(t),o=Fi(t);for(let l=a-2;l<a+He.chunkSizeX+2;l+=1)for(let c=o-2;c<o+He.chunkSizeZ+2;c+=1){if(!this.shouldSpawnTree(l,c))continue;const d=n(l,c);if(d<1||d>=He.chunkSizeY-8||!r(l,c,d)||i(l,d,c)!==1)continue;const h=this.getTreeHeight(l,c);this.placeTrunk(e,t,l,c,d,h),this.placeLeaves(e,t,l,c,d+h,h)}}placeTrunk(e,t,n,i,r,a){for(let o=1;o<=a;o+=1)this.setIfInsideChunk(e,t,n,r+o,i,4)}placeLeaves(e,t,n,i,r,a){const l=r+1;for(let c=r-1;c<=l;c+=1)for(let d=n-2;d<=n+2;d+=1)for(let h=i-2;h<=i+2;h+=1){const u=Math.abs(d-n),p=Math.abs(h-i),g=c-r,v=u===2&&p===2,m=g===1&&u+p>2;v||m||this.setIfInsideChunk(e,t,d,c,h,5)}a>=6&&this.setIfInsideChunk(e,t,n,l+1,i,5)}setIfInsideChunk(e,t,n,i,r,a){if(i<0||i>=He.chunkSizeY)return;const o=n-Ni(t),l=r-Fi(t);if(o<0||o>=He.chunkSizeX||l<0||l>=He.chunkSizeZ)return;const c=kn.getIndex(o,i,l);e[c]===0&&(e[c]=a)}}class S_{continentalNoise;hillNoise;detailNoise;peakMaskNoise;peakRidgeNoise;stonePatchNoise;riverNoiseA;riverNoiseB;riverWarpNoise;coverNoise;sedimentNoise;treeGenerator;columnCache=new Map;constructor(e){this.continentalNoise=new Zt(Nt(`${e}:continental`)),this.hillNoise=new Zt(Nt(`${e}:hills`)),this.detailNoise=new Zt(Nt(`${e}:detail`)),this.peakMaskNoise=new Zt(Nt(`${e}:peak-mask`)),this.peakRidgeNoise=new Zt(Nt(`${e}:peak-ridge`)),this.stonePatchNoise=new Zt(Nt(`${e}:stone-patch`)),this.riverNoiseA=new Zt(Nt(`${e}:river-a`)),this.riverNoiseB=new Zt(Nt(`${e}:river-b`)),this.riverWarpNoise=new Zt(Nt(`${e}:river-warp`)),this.coverNoise=new Zt(Nt(`${e}:cover`)),this.sedimentNoise=new Zt(Nt(`${e}:sediment`)),this.treeGenerator=new v_(e)}getSurfaceHeight(e,t){return this.sampleColumn(e,t).surfaceHeight}getTerrainBlock(e,t,n){if(t<=0)return 6;const i=this.sampleColumn(e,n);if(t>i.surfaceHeight)return t<=i.waterLevel&&i.riverStrength>.04?10:0;const r=this.getDirtDepth(i),a=i.riverStrength>.04&&i.surfaceHeight<=i.waterLevel;return t===i.surfaceHeight?a?this.sedimentToBlock(i.sediment):i.rockySurface?3:1:t>=i.surfaceHeight-r?a&&t>=i.surfaceHeight-Math.max(1,r-1)&&i.sediment==="mud"?13:2:3}generateChunk(e){const t=new Uint8Array(He.chunkSizeX*He.chunkSizeY*He.chunkSizeZ),n=Ni(e),i=Fi(e);for(let r=0;r<He.chunkSizeX;r+=1)for(let a=0;a<He.chunkSizeZ;a+=1){const o=n+r,l=i+a,c=this.sampleColumn(o,l),d=Math.min(He.chunkSizeY-1,Math.max(c.surfaceHeight,c.waterLevel));for(let h=0;h<=d;h+=1){const u=this.getTerrainBlock(o,h,l);u!==0&&(t[kn.getIndex(r,h,a)]=u)}}return this.treeGenerator.applyTrees(t,e,this.getSurfaceHeight.bind(this),this.getTerrainBlock.bind(this),(r,a,o)=>this.canSpawnTreeAt(r,a,o)),this.applyGroundCover(t,e),new kn(e,t)}findSpawnPoint(){for(let e=0;e<=14;e+=1)for(let t=-e;t<=e;t+=1)for(let n=-e;n<=e;n+=1){const i=this.sampleColumn(t,n);if(i.surfaceHeight<He.chunkSizeY-8&&i.riverStrength<.06&&i.slope<=1.2)return[t+.5,i.surfaceHeight+1,n+.5]}return[.5,40,.5]}canSpawnTreeAt(e,t,n){const i=this.sampleColumn(e,t);return i.surfaceHeight!==n?!1:i.biome!=="peaks"&&i.riverStrength<.08&&!i.rockySurface&&i.slope<1.9}applyGroundCover(e,t){const n=Ni(t),i=Fi(t);for(let r=0;r<He.chunkSizeX;r+=1)for(let a=0;a<He.chunkSizeZ;a+=1){const o=n+r,l=i+a,c=this.sampleColumn(o,l),d=c.surfaceHeight;if(d<2||d>=He.chunkSizeY-2||c.riverStrength>.09||c.rockySurface||c.biome==="peaks"||this.getTerrainBlock(o,d,l)!==1)continue;const h=this.coverNoise.fractal(o,l,2,.16,.5);if(h<.48)continue;const u=d+1,p=kn.getIndex(r,u,a);e[p]===0&&(e[p]=h>.82?15:14)}}getDirtDepth(e){return e.rockySurface?1:e.biome==="rolling"?3:e.slope<.9?4:3}sedimentToBlock(e){switch(e){case"sand":return 11;case"clay":return 12;case"mud":return 13;default:return 2}}sampleColumn(e,t){const n=`${e},${t}`,i=this.columnCache.get(n);if(i)return i;const r=this.sampleRiver(e,t),a=this.sampleBaseHeight(e,t),o=sn(Math.round(a-r.depth),4,He.chunkSizeY-8),l=this.estimateSlope(e,t,o),c=this.hillNoise.fractal(e,t,3,.0095,.56),d=sn((this.peakMaskNoise.fractal(e,t,3,.0025,.54)-.46)/.4,0,1),h=1-Math.abs(this.peakRidgeNoise.fractal(e,t,4,.0085,.56)),u=d*Math.pow(sn((h-.57)/.43,0,1),1.5),p=this.stonePatchNoise.fractal(e,t,2,.03,.5);let g="plains";r.strength>.11&&o<=r.waterLevel+1?g="river":u>.24?g="peaks":(c>.2||l>1.2)&&(g="rolling");const v=g==="peaks"||o>=56||l>=2.4||l>=1.9&&p>.26||p>.81,m=this.sedimentNoise.fractal(e,t,2,.02,.52),f=m>.36?"clay":m<-.36?"mud":r.widthNoise>.62?"sand":"dirt",E={surfaceHeight:o,biome:g,rockySurface:v,slope:l,riverStrength:r.strength,riverDepth:r.depth,waterLevel:r.waterLevel,sediment:f};return this.columnCache.size>16384&&this.columnCache.clear(),this.columnCache.set(n,E),E}sampleBaseHeight(e,t){const n=this.continentalNoise.fractal(e,t,3,.0038,.56)*3.8,i=this.hillNoise.fractal(e,t,4,.0115,.55)*5.9,r=this.detailNoise.fractal(e,t,2,.04,.5)*1.4,a=sn((this.peakMaskNoise.fractal(e,t,3,.0025,.54)-.48)/.38,0,1),o=1-Math.abs(this.peakRidgeNoise.fractal(e,t,4,.0085,.56)),l=Math.pow(sn((o-.58)/.42,0,1),1.8),c=a*(6+l*18);return 30+n+i+r+c}sampleRiver(e,t){const n=this.riverWarpNoise.fractal(e,t,2,.0035,.55)*18,i=e+n,r=t-n*.72,a=Math.abs(this.riverNoiseA.fractal(i,r,3,.0047,.56)),o=Math.abs(this.riverNoiseB.fractal(i*1.21,r*1.21,2,.0088,.53)),l=Math.min(a,o*.82+.055),c=sn((this.riverNoiseB.fractal(e-340,t+410,2,.0029,.5)+1)*.5,0,1),d=.046+c*.1,h=sn((d-l)/d,0,1),u=sn((this.detailNoise.fractal(e+820,t-700,2,.01,.55)+1)*.5,0,1),p=1.6+(1-c)*2.8+u*1.8,g=Math.pow(h,1.45)*p,v=30+Math.round(this.continentalNoise.fractal(e+1200,t-1200,2,.0018,.5)*2);return{strength:h,depth:g,widthNoise:c,waterLevel:v}}estimateSlope(e,t,n){const i=Math.abs(this.sampleBaseHeight(e+1,t)-n),r=Math.abs(this.sampleBaseHeight(e-1,t)-n),a=Math.abs(this.sampleBaseHeight(e,t+1)-n),o=Math.abs(this.sampleBaseHeight(e,t-1)-n);return Math.max(i,r,a,o)}}class $l{constructor(e,t){if(this.seed=e,this.generator=new S_(e),t)for(const[n,i]of t.entries())this.chunkDiffs.set(n,new Map(i.changes.map(r=>[r.index,r.blockId])))}generator;chunkStore=new g_;queuedKeys=new Set;generationQueue=[];meshDirtyKeys=new Set;meshQueue=[];removedKeys=new Set;chunkDiffs=new Map;diffDirtyKeys=new Set;getChunkCount(){return this.chunkStore.size}hasPendingGeneration(){return this.generationQueue.length>0}hasPendingMeshes(){return this.meshQueue.length>0}getPlayerChunkCoord(e,t){return Hr(Math.floor(e),Math.floor(t))}enqueueStreamingAround(e,t){const n=this.getPlayerChunkCoord(e,t),i=new Set,r=[];for(let o=n.x-He.preloadRadius;o<=n.x+He.preloadRadius;o+=1)for(let l=n.z-He.preloadRadius;l<=n.z+He.preloadRadius;l+=1){const c={x:o,z:l},d=Rt(c);i.add(d),!this.chunkStore.has(d)&&!this.queuedKeys.has(d)&&r.push({coord:c,distance:ug(o,l,n.x,n.z)})}const a=this.generationQueue.filter(o=>{const l=Rt(o);return i.has(l)&&!this.chunkStore.has(l)});this.generationQueue.length=0,this.generationQueue.push(...a),this.queuedKeys.clear(),a.forEach(o=>{this.queuedKeys.add(Rt(o))}),r.sort((o,l)=>o.distance-l.distance).forEach(({coord:o})=>{this.generationQueue.push(o),this.queuedKeys.add(Rt(o))});for(const[o,l]of this.chunkStore.entries())i.has(o)||(this.chunkStore.delete(o),this.removedKeys.add(o),this.markNeighborsDirty(l.coord))}processGenerationBudget(e=He.generationBudgetPerFrame){for(let t=0;t<e;t+=1){const n=this.generationQueue.shift();if(!n)return;const i=Rt(n);this.queuedKeys.delete(i),!this.chunkStore.has(i)&&(this.chunkStore.set(this.createChunk(n)),this.queueMeshUpdate(i),this.markNeighborsDirty(n))}}primeAround(e,t,n=2){const i=this.getPlayerChunkCoord(e,t);for(let r=i.x-n;r<=i.x+n;r+=1)for(let a=i.z-n;a<=i.z+n;a+=1){const o={x:r,z:a},l=Rt(o);this.chunkStore.has(l)||(this.chunkStore.set(this.createChunk(o)),this.queueMeshUpdate(l))}}getBlock(e,t,n){if(t<0||t>=He.chunkSizeY)return 0;const i=Hr(e,n),r=this.chunkStore.get(Rt(i));if(!r)return 0;const a=Rl(e,t,n);return r.getBlock(a.x,a.y,a.z)}setBlock(e,t,n,i){if(t<0||t>=He.chunkSizeY)return!1;const r=Hr(e,n),a=this.chunkStore.get(Rt(r));if(!a)return!1;const o=Rl(e,t,n);if(!a.setBlock(o.x,o.y,o.z,i))return!1;const c=kn.getIndex(o.x,o.y,o.z),d=this.chunkDiffs.get(a.key)??new Map;return a.baseBlocks[c]===i?d.delete(c):d.set(c,i),d.size===0?this.chunkDiffs.delete(a.key):this.chunkDiffs.set(a.key,d),this.queueMeshUpdate(a.key),this.diffDirtyKeys.add(a.key),this.markBoundaryNeighborsDirty(r,o.x,o.z),!0}getTopSolidBlockY(e,t){return this.generator.getSurfaceHeight(e,t)}getChunkByKey(e){return this.chunkStore.get(e)}getChunkOrigin(e){const t=_g(e);return{x:Ni(t),z:Fi(t)}}drainMeshUpdates(e=He.meshBudgetPerFrame){const t=[];for(let n=0;n<e;n+=1){const i=this.meshQueue.shift();if(!i)break;this.meshDirtyKeys.delete(i);const r=this.chunkStore.get(i);r&&t.push(r)}return t}drainRemovedChunkKeys(){const e=[...this.removedKeys];return this.removedKeys.clear(),e}drainDirtyDiffs(){const e=[];for(const t of this.diffDirtyKeys)e.push(this.getChunkDiffRecord(t));return this.diffDirtyKeys.clear(),e}getAllDiffRecords(){return[...this.chunkDiffs.keys()].map(e=>this.getChunkDiffRecord(e))}createChunk(e){const t=Rt(e),n=this.generator.generateChunk(e),i=this.chunkDiffs.get(t);if(i)for(const[r,a]of i.entries())n.blocks[r]=a;return n}getChunkDiffRecord(e){const n=this.chunkStore.get(e)?.revision??0,r=[...(this.chunkDiffs.get(e)??new Map).entries()].sort((a,o)=>a[0]-o[0]).map(([a,o])=>({index:a,blockId:o}));return{chunkKey:e,changes:r,revision:n}}markNeighborsDirty(e){const t=[{x:e.x+1,z:e.z},{x:e.x-1,z:e.z},{x:e.x,z:e.z+1},{x:e.x,z:e.z-1}];for(const n of t){const i=Rt(n);this.chunkStore.has(i)&&this.queueMeshUpdate(i)}}markBoundaryNeighborsDirty(e,t,n){t===0&&this.queueMeshUpdate(Rt({x:e.x-1,z:e.z})),t===He.chunkSizeX-1&&this.queueMeshUpdate(Rt({x:e.x+1,z:e.z})),n===0&&this.queueMeshUpdate(Rt({x:e.x,z:e.z-1})),n===He.chunkSizeZ-1&&this.queueMeshUpdate(Rt({x:e.x,z:e.z+1}))}queueMeshUpdate(e){this.meshDirtyKeys.has(e)||(this.meshDirtyKeys.add(e),this.meshQueue.push(e))}}const Kr={blockId:null,count:0},Zl=120,Jl=0,M_=new URL("/assets/menu-Bu8EUnNp.mp3",import.meta.url).href,x_=3800;class A_{constructor(e){this.root=e,this.shell.className="mineblow-shell",this.canvas.className="mineblow-canvas",this.introSplash.className="intro-splash",this.introSplash.textContent="made by teddyfresnes",this.shell.append(this.canvas),this.shell.append(this.introSplash),this.root.append(this.shell),this.menuMusic.loop=!0,this.menuMusic.volume=.42,this.handleMenuMusicUnlock=this.handleMenuMusicUnlock.bind(this),this.renderer=new Wg(this.canvas),this.input=new th(this.canvas),this.hud=new c_(this.shell),this.debugOverlay=new l_(this.shell),this.inventoryScreen=new h_(this.shell,{onClose:()=>{this.closeInventory()},onSlotInteract:t=>{this.handleInventorySlotInteract(t)},onRecipeCraft:t=>{this.handleCraftRecipe(t)},onSkinChange:t=>{this.applySettings({keyBindings:Jn(this.settings.keyBindings),skinDataUrl:t})}}),this.menu=new p_(this.shell,{onPlayWorld:t=>{this.loadWorld(t)},onCreateWorld:(t,n)=>{this.startNewWorld(t,n)},onRenameWorld:(t,n)=>{this.renameWorld(t,n)},onDeleteWorld:t=>{this.deleteWorld(t)},onResume:()=>{this.resumeSession()},onQuitToTitle:()=>{this.quitToTitle()},onSettingsChange:t=>{this.applySettings(t)}}),this.gameLoop=new Jc(1/60,t=>this.update(t),()=>this.render()),this.handleResize=this.handleResize.bind(this),this.handleBeforeUnload=this.handleBeforeUnload.bind(this),this.handlePointerLockChange=this.handlePointerLockChange.bind(this),window.setTimeout(()=>{this.introSplash.remove()},x_)}shell=document.createElement("div");canvas=document.createElement("canvas");introSplash=document.createElement("div");renderer;input;menu;hud;debugOverlay;inventoryScreen;saveRepository=new a_;gameLoop;menuMusic=new Audio(M_);persistDirtyChunks=o_(()=>{this.saveDirtyChunks()},ut.worldSaveDebounceMs);session=null;settings=Gs();globalStats=js();miningTargetKey=null;miningProgressMs=0;targetHit=null;savePlayerElapsedMs=0;statsPanelRefreshElapsedMs=0;fpsFrames=0;fpsElapsedMs=0;fpsValue=0;lastRenderTime=performance.now();inventoryMode="player";inventoryCursor={...Kr};movementIntensity=0;primaryHoldMs=0;primaryPunchPending=!1;primaryPunchLockMs=0;wasPrimaryDown=!1;dropSequence=0;menuMusicUnlockRegistered=!1;droppedItems=new Map;async bootstrap(){this.input.connect(),this.input.setPointerLockListener(this.handlePointerLockChange),this.hud.setVisible(!1),this.handleResize(),window.addEventListener("resize",this.handleResize),window.addEventListener("beforeunload",this.handleBeforeUnload);const[e,t,n]=await Promise.all([this.saveRepository.loadSettings(),this.saveRepository.loadGlobalStats(),this.saveRepository.listWorlds()]);this.settings=e,this.globalStats=t,this.menu.setSettings(e),this.menu.setGlobalStats(t),this.menu.setWorlds(n),this.hud.setHandSkin(e.skinDataUrl),this.menu.showBoot(),this.playMenuMusic(),this.gameLoop.start()}async refreshMenuWorlds(e){const t=await this.saveRepository.listWorlds();this.menu.setWorlds(t),e!==void 0&&this.menu.setSelectedWorld(e)}async renameWorld(e,t){const n=await this.saveRepository.renameWorld(e,t);await this.refreshMenuWorlds(n?.id??e),this.session&&this.session.id===e&&n&&(this.session.name=n.name,this.updatePauseMenuSnapshot())}async deleteWorld(e){await this.saveRepository.deleteWorld(e),await this.refreshMenuWorlds()}updatePauseMenuSnapshot(){if(!this.session){this.menu.setPauseWorld(null);return}this.menu.setPauseWorld({id:this.session.id,name:this.session.name,seed:this.session.seed,worldStats:this.session.worldStats})}async quitToTitle(){this.session&&await this.flushSaves(),this.session=null,this.input.exitPointerLock(),this.inventoryScreen.setVisible(!1),this.inventoryCursor={...Kr},this.targetHit=null,this.miningTargetKey=null,this.miningProgressMs=0,this.primaryHoldMs=0,this.primaryPunchPending=!1,this.primaryPunchLockMs=0,this.wasPrimaryDown=!1,this.dropSequence=0,this.droppedItems.clear(),this.renderer.clearChunks(),this.renderer.clearDroppedItems(),this.renderer.setMiningOverlay(null,0),this.hud.setMiningProgress(0),this.hud.setVisible(!1),this.menu.setGlobalStats(this.globalStats),this.menu.setPauseWorld(null),await this.refreshMenuWorlds(),this.menu.showBoot(),this.playMenuMusic()}async startNewWorld(e,t){const n=t||`mineblow-${Date.now().toString(36)}`;this.renderer.clearChunks();const i=new $l(n);i.primeAround(0,0,1);const r=Cl.resolve(i),a={position:[...r],velocity:[0,0,0],yaw:0,pitch:0,selectedSlot:0,spawnPoint:[...r]},o=new yo,l=Ya(),c=await this.saveRepository.createNewWorld(e,n,a,o.snapshot(),l);this.globalStats=await this.saveRepository.loadGlobalStats(),this.menu.setGlobalStats(this.globalStats),await this.refreshMenuWorlds(c.id),await this.activateSession({id:c.id,name:c.name,seed:n,world:i,player:new Tl(a),inventory:o,worldStats:l})}async loadWorld(e){const t=await this.saveRepository.loadWorld(e);if(!t){await this.refreshMenuWorlds(),this.menu.showBoot();return}this.renderer.clearChunks(),await this.activateLoadedWorld(t)}async activateLoadedWorld(e){const t=new $l(e.save.seed,e.chunkDiffs);t.primeAround(e.save.player.position[0],e.save.player.position[2],1),t.primeAround(0,0,1);const n=this.createSafePlayerState(e.save.player,t),i=new yo(e.save.inventory,n.selectedSlot),r=this.normalizeWorldStats(e.save.worldStats);await this.refreshMenuWorlds(e.save.id),await this.activateSession({id:e.save.id,name:e.save.name,seed:e.save.seed,world:t,player:new Tl(n),inventory:i,worldStats:r})}async activateSession(e){this.session=e,this.stopMenuMusic(),this.savePlayerElapsedMs=0,this.statsPanelRefreshElapsedMs=0,this.miningTargetKey=null,this.miningProgressMs=0,this.targetHit=null,this.inventoryCursor={...Kr},this.movementIntensity=0,this.primaryHoldMs=0,this.primaryPunchPending=!1,this.primaryPunchLockMs=0,this.wasPrimaryDown=!1,this.dropSequence=0,this.droppedItems.clear(),this.renderer.clearDroppedItems(),this.renderer.setMiningOverlay(null,0),this.inventoryScreen.setVisible(!1),this.hud.setMiningProgress(0),this.hud.setHealth(20,20),this.updateLevelHud();const[t,,n]=e.player.getPosition();e.world.enqueueStreamingAround(t,n),this.syncChunkMeshes(),this.hud.setVisible(!0),this.hud.setHandSkin(this.settings.skinDataUrl),this.renderer.setPlayerSkin(this.settings.skinDataUrl),this.menu.setPauseWorld({id:e.id,name:e.name,seed:e.seed,worldStats:e.worldStats}),this.updateFirstPersonHandVisibility(e.inventory),this.hud.updateHotbar(e.inventory.getHotbarSlots(),e.inventory.getSelectedHotbarIndex()),this.hud.setGenerating(e.world.hasPendingGeneration()||e.world.hasPendingMeshes()),await this.resumeSession()}async resumeSession(){this.hud.setVisible(!0),this.menu.hide();try{await this.input.requestPointerLock()}catch{this.updatePauseMenuSnapshot(),this.menu.showPause()}}update(e){this.input.consumeAnyJustPressed([this.settings.keyBindings.debug.primary,this.settings.keyBindings.debug.secondary,"F3"])&&this.debugOverlay.toggle(),this.input.consumeAnyJustPressed([this.settings.keyBindings.inventory.primary,this.settings.keyBindings.inventory.secondary,"KeyI"])&&(this.inventoryScreen.isVisible()?this.closeInventory():this.session&&!this.menu.isVisible()&&this.openInventory("player"));const i=this.input.consumeAnyJustPressed([this.settings.keyBindings.pause.primary,this.settings.keyBindings.pause.secondary,"Escape"]);if(this.inventoryScreen.isVisible()&&i&&this.closeInventory(),!this.session){this.input.endFrame();return}const{world:r,player:a,inventory:o}=this.session;if(i&&this.input.isPointerLocked()&&!this.inventoryScreen.isVisible()&&!this.menu.isVisible()&&(this.input.exitPointerLock(),this.updatePauseMenuSnapshot(),this.menu.showPause(),this.hud.setVisible(!1)),!this.inventoryScreen.isVisible()){const u=this.input.consumeWheelSteps();u!==0&&(o.shiftSelectedHotbar(u),a.setSelectedSlot(o.getSelectedHotbarIndex()));const p=this.input.consumeNumberSlot();p!==null&&(o.setSelectedHotbarIndex(p),a.setSelectedSlot(o.getSelectedHotbarIndex()))}if(this.updateFirstPersonHandVisibility(o),this.input.isPointerLocked()&&!this.menu.isVisible()&&!this.inventoryScreen.isVisible()){this.primaryPunchLockMs=Math.max(0,this.primaryPunchLockMs-e*1e3);const u=this.input.isPrimaryDown();this.input.consumePrimaryClick()&&(u?(this.primaryPunchPending=!0,this.primaryHoldMs=0):(this.primaryPunchLockMs<=0&&(this.primaryPunchLockMs=Jl,this.renderer.triggerFirstPersonAction(1.55)),this.primaryPunchPending=!1,this.primaryHoldMs=0)),u&&this.primaryPunchPending&&(this.primaryHoldMs+=e*1e3);const g=a.getPosition(),v=a.update(e,this.input,r,this.settings.keyBindings);v.jumped&&this.renderer.triggerFirstPersonJump(.85);const m=a.getPosition();if(this.trackMovementStats(g,m,e,v),this.targetHit=m_.cast(r,a.getCameraPosition(),a.getLookDirection(),He.maxInteractionDistance),u&&this.primaryPunchPending&&this.primaryHoldMs>=Zl&&this.targetHit&&Or(this.targetHit.blockId)&&(this.primaryPunchPending=!1),!u&&this.wasPrimaryDown){const A=this.primaryPunchPending&&this.primaryPunchLockMs<=0;this.primaryPunchPending=!1,this.primaryHoldMs=0,A&&(this.primaryPunchLockMs=Jl,this.renderer.triggerFirstPersonAction(1.55))}const b=this.primaryPunchLockMs<=0&&u&&!this.primaryPunchPending&&this.primaryHoldMs>=Zl&&!!this.targetHit&&Or(this.targetHit.blockId);this.handleInteractions(e,b),this.wasPrimaryDown=u,this.updateDroppedItems(e),this.hud.updateHand(e,this.movementIntensity,this.miningProgressMs>0),this.renderer.updateHand(e,this.movementIntensity,this.miningProgressMs>0),this.renderer.updateSpeedFov(e,v.sprinting,v.moving,a.isGrounded())}else this.input.consumePrimaryClick(),this.primaryHoldMs=0,this.primaryPunchPending=!1,this.primaryPunchLockMs=0,this.wasPrimaryDown=!1,this.resetMining(),this.targetHit=null,this.renderer.setMiningOverlay(null,0),this.hud.setMiningProgress(0),this.hud.updateHand(e,0,!1),this.renderer.updateHand(e,0,!1),this.renderer.updateSpeedFov(e,!1,!1,!0);this.renderer.updateTransientEffects(e),r.enqueueStreamingAround(a.getPosition()[0],a.getPosition()[2]),r.processGenerationBudget(),this.syncChunkMeshes(),this.hud.updateHotbar(o.getHotbarSlots(),o.getSelectedHotbarIndex()),this.hud.setGenerating(r.hasPendingGeneration()||r.hasPendingMeshes()),this.hud.setFps(this.fpsValue),this.hud.setHealth(20,20),this.updateLevelHud(),this.inventoryScreen.isVisible()&&this.refreshInventoryScreen(),this.savePlayerElapsedMs+=e*1e3,this.savePlayerElapsedMs>=ut.playerSaveIntervalMs&&(this.savePlayerElapsedMs=0,this.persistProfile(!0)),this.statsPanelRefreshElapsedMs+=e*1e3,this.statsPanelRefreshElapsedMs>=500&&(this.statsPanelRefreshElapsedMs=0,this.menu.setGlobalStats(this.globalStats),this.updatePauseMenuSnapshot());const[c,d,h]=a.getPosition();this.updateDebugPanel(c,d,h),this.input.endFrame()}render(){if(this.session){const t=this.session.player.getCameraPosition(),n=this.session.player.getRotation();this.renderer.setCameraTransform(t,n.yaw,n.pitch)}const e=performance.now();this.fpsFrames+=1,this.fpsElapsedMs+=e-this.lastRenderTime,this.lastRenderTime=e,this.fpsElapsedMs>=500&&(this.fpsValue=Math.round(this.fpsFrames*1e3/this.fpsElapsedMs),this.fpsFrames=0,this.fpsElapsedMs=0),this.renderer.render()}handleInteractions(e,t){if(!this.session)return;const{world:n,player:i,inventory:r}=this.session;if(t&&this.targetHit&&Or(this.targetHit.blockId)){const a=`${this.targetHit.blockWorldX},${this.targetHit.blockWorldY},${this.targetHit.blockWorldZ}`;this.miningTargetKey!==a&&(this.miningTargetKey=a,this.miningProgressMs=0),this.miningProgressMs+=e*1e3;const o=pg(this.targetHit.blockId),l=Math.min(1,this.miningProgressMs/o);if(this.hud.setMiningProgress(l),this.renderer.setMiningOverlay(this.targetHit,l),this.miningProgressMs>=o){const c=this.targetHit.blockId;n.setBlock(this.targetHit.blockWorldX,this.targetHit.blockWorldY,this.targetHit.blockWorldZ,0)&&(this.spawnDroppedItem(c,this.targetHit.blockWorldX+.5,this.targetHit.blockWorldY+.5,this.targetHit.blockWorldZ+.5),this.renderer.spawnBreakParticles(Ti(c),this.targetHit.blockWorldX,this.targetHit.blockWorldY,this.targetHit.blockWorldZ),this.session.worldStats.blocksMined+=1,this.globalStats.totalBlocksMined+=1,this.persistDirtyChunks(),this.persistProfile(!0)),this.resetMining()}}else this.resetMining(),this.hud.setMiningProgress(0),this.renderer.setMiningOverlay(null,0);if(this.targetHit&&this.input.consumeSecondaryClick()){if(this.targetHit.blockId===8){this.openInventory("crafting_table");return}const a=r.getSelectedBlock();a!==null&&mg(a)&&n.getBlock(this.targetHit.placeWorldX,this.targetHit.placeWorldY,this.targetHit.placeWorldZ)===0&&i.canOccupyBlock(this.targetHit.placeWorldX,this.targetHit.placeWorldY,this.targetHit.placeWorldZ)&&n.setBlock(this.targetHit.placeWorldX,this.targetHit.placeWorldY,this.targetHit.placeWorldZ,a)&&(r.consumeSelectedBlock(),this.session.worldStats.blocksPlaced+=1,this.globalStats.totalBlocksPlaced+=1,this.persistDirtyChunks(),this.persistProfile(!0))}}openInventory(e){this.session&&(this.inventoryMode=e,this.inventoryScreen.setVisible(!0),this.hud.setVisible(!1),this.input.exitPointerLock(),this.refreshInventoryScreen())}async closeInventory(){if(this.session){if(this.inventoryCursor=this.session.inventory.returnCursor(this.inventoryCursor),this.inventoryCursor.blockId!==null&&this.inventoryCursor.count>0){this.refreshInventoryScreen();return}this.inventoryScreen.setVisible(!1),await this.persistProfile(!0),await this.resumeSession()}}refreshInventoryScreen(){if(!this.session)return;const e=bo(this.inventoryMode),t=new Set(e.filter(i=>Ql(this.session.inventory,i)).map(i=>i.id)),n={mode:this.inventoryMode,slots:this.session.inventory.getSlots(),selectedHotbarIndex:this.session.inventory.getSelectedHotbarIndex(),cursor:{...this.inventoryCursor},recipes:e,craftableRecipeIds:t,skinDataUrl:this.settings.skinDataUrl};this.inventoryScreen.render(n)}handleInventorySlotInteract(e){if(!this.session||!this.inventoryScreen.isVisible())return;const t=this.session.inventory,n=e.index;if(e.shift&&this.inventoryCursor.blockId===null){this.transferStackBetweenSections(t,n)&&this.refreshInventoryScreen();return}const i=t.getSlot(n);if(e.button==="left")if(this.inventoryCursor.blockId===null||this.inventoryCursor.count===0){if(i.blockId===null||i.count===0)return;this.inventoryCursor=t.pickUpSlot(n)}else this.inventoryCursor=t.placeCursor(n,this.inventoryCursor);else this.inventoryCursor=this.handleRightClickInventory(t,n,i,this.inventoryCursor);this.refreshInventoryScreen()}handleCraftRecipe(e){if(!this.session||!this.inventoryScreen.isVisible())return;const t=bo(this.inventoryMode).find(n=>n.id===e);t&&eh(this.session.inventory,t)&&(this.session.worldStats.craftedItems+=t.output.count,this.globalStats.totalCraftedItems+=t.output.count,this.refreshInventoryScreen(),this.hud.updateHotbar(this.session.inventory.getHotbarSlots(),this.session.inventory.getSelectedHotbarIndex()),this.persistProfile(!0))}syncChunkMeshes(){if(this.session){for(const e of this.session.world.drainRemovedChunkKeys())this.renderer.removeChunkMesh(e);for(const e of this.session.world.drainMeshUpdates()){const t=bi.buildGeometry(e,this.session.world,this.renderer.atlas);this.renderer.upsertChunkMesh(e.key,t,this.session.world.getChunkOrigin(e.key))}}}async saveDirtyChunks(){if(!this.session)return;const e=this.session.world.drainDirtyDiffs();e.length!==0&&await this.saveRepository.saveChunkDiffs(this.session.id,e)}resetMining(){this.miningTargetKey=null,this.miningProgressMs=0,this.hud.setMiningProgress(0)}updateDebugPanel(e,t,n){if(!this.session)return;const i=this.session.world.getPlayerChunkCoord(e,n);this.debugOverlay.update([`FPS: ${this.fpsValue}`,`POS: ${e.toFixed(2)}, ${t.toFixed(2)}, ${n.toFixed(2)}`,`CHUNK: ${i.x}, ${i.z}`,`LOADED: ${this.session.world.getChunkCount()}`,`STREAM: ${this.session.world.hasPendingGeneration()||this.session.world.hasPendingMeshes()?"busy":"steady"}`,`SEED: ${this.session.seed}`,`MODE: ${this.inventoryScreen.isVisible()?this.inventoryMode:"play"}`].join(`
`))}updateFirstPersonHandVisibility(e){const t=e.getSlot(e.getSelectedAbsoluteSlotIndex()),n=t.blockId===null||t.count<=0;this.renderer.setFirstPersonAnimationPreset(n?"hand":"item"),this.renderer.setFirstPersonHandVisible(n)}createSafePlayerState(e,t){const n=Cl.resolve(t),i=this.canStandAt(t,e.spawnPoint)?e.spawnPoint:n;return{position:[...this.canStandAt(t,e.position)?e.position:i],velocity:[0,0,0],yaw:Number.isFinite(e.yaw)?e.yaw:0,pitch:Number.isFinite(e.pitch)?Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e.pitch)):0,selectedSlot:Math.max(0,Math.min(8,e.selectedSlot|0)),spawnPoint:[...i]}}canStandAt(e,t){const[n,i,r]=t;if(!Number.isFinite(n)||!Number.isFinite(i)||!Number.isFinite(r)||i<1||i>He.chunkSizeY-2)return!1;const a=Math.floor(i),o=Math.floor(i+1),l=a-1,c=[[n,r],[n-.28,r-.28],[n+.28,r-.28],[n-.28,r+.28],[n+.28,r+.28]];return c.some(([h,u])=>Fn(e.getBlock(Math.floor(h),l,Math.floor(u))))?c.every(([h,u])=>{const p=Math.floor(h),g=Math.floor(u);return e.getBlock(p,a,g)===0&&e.getBlock(p,o,g)===0}):!1}handleResize(){this.renderer.resize(window.innerWidth,window.innerHeight)}handlePointerLockChange(e){if(this.session){if(e){this.menu.hide(),this.inventoryScreen.isVisible()||this.hud.setVisible(!0);return}this.inventoryScreen.isVisible()||this.menu.isVisible()||(this.menu.setGlobalStats(this.globalStats),this.updatePauseMenuSnapshot(),this.menu.showPause(),this.hud.setVisible(!1))}}handleBeforeUnload(){this.stopMenuMusic(),this.flushSaves()}async flushSaves(){this.session&&(await this.persistProfile(!0),await this.saveRepository.saveChunkDiffs(this.session.id,this.session.world.getAllDiffRecords()))}spawnDroppedItem(e,t,n,i){const r=`drop-${++this.dropSequence}`,a=[(Math.random()-.5)*2.6,2.5+Math.random()*1.6,(Math.random()-.5)*2.6],o={id:r,blockId:e,position:[t,n,i],velocity:a,ageMs:0};this.droppedItems.set(r,o),this.renderer.spawnDroppedItem(r,Ti(e),t,n,i)}updateDroppedItems(e){if(!this.session||this.droppedItems.size===0)return;const{world:t,player:n,inventory:i}=this.session,r=n.getPosition(),a=1.9*1.9,o=5.5,l=o*o,c=18;for(const[d,h]of this.droppedItems.entries()){h.ageMs+=e*1e3;const u=t.getBlock(Math.floor(h.position[0]),Math.floor(h.position[1]),Math.floor(h.position[2])),p=Ks(u);p?(h.velocity[0]*=.9,h.velocity[2]*=.9,h.velocity[1]-=3.5*e,h.velocity[1]<-1.4&&(h.velocity[1]=-1.4)):h.velocity[1]-=c*e,h.position[0]+=h.velocity[0]*e,h.position[1]+=h.velocity[1]*e,h.position[2]+=h.velocity[2]*e;const g=Math.floor(h.position[1]-.14),v=t.getBlock(Math.floor(h.position[0]),g,Math.floor(h.position[2]));Fn(v)&&h.velocity[1]<=0&&(h.position[1]=g+1+.14,h.velocity[1]=p?-.2:0,h.velocity[0]*=.72,h.velocity[2]*=.72);const m=r[0]-h.position[0],f=r[1]+.8-h.position[1],E=r[2]-h.position[2],b=m*m+f*f+E*E;if(h.ageMs>120&&b<l){const w=Math.max(1e-4,Math.sqrt(b)),R=Math.max(0,Math.min(1,(o-w)/o)),U=(p?5.6:11.5)*(.25+R*1.35),x=1/w;h.velocity[0]+=m*x*U*e,h.velocity[1]+=f*x*U*e*.58,h.velocity[2]+=E*x*U*e;const M=Math.hypot(h.velocity[0],h.velocity[2]),P=p?3.1:6.3;if(M>P){const k=P/M;h.velocity[0]*=k,h.velocity[2]*=k}}if(h.ageMs>180&&b<a&&i.addBlock(h.blockId)){this.droppedItems.delete(d),this.renderer.removeDroppedItem(d),this.hud.updateHotbar(i.getHotbarSlots(),i.getSelectedHotbarIndex());continue}if(h.ageMs>12e4){this.droppedItems.delete(d),this.renderer.removeDroppedItem(d);continue}const A=.08*Math.sin(h.ageMs*.008),C=h.ageMs*.0032;this.renderer.updateDroppedItem(d,h.position[0],h.position[1],h.position[2],C,A)}}trackMovementStats(e,t,n,i){if(!this.session)return;const r=t[0]-e[0],a=t[1]-e[1],o=t[2]-e[2],l=Math.hypot(r,a,o);this.movementIntensity=Math.max(0,Math.min(1.15,l/Math.max(1e-4,De.sprintSpeed*n))),this.session.worldStats.distanceTravelled+=l,this.globalStats.totalDistanceTravelled+=l,this.session.worldStats.playTimeMs+=n*1e3,this.globalStats.totalPlayTimeMs+=n*1e3,i.jumped&&(this.session.worldStats.jumps+=1,this.globalStats.totalJumps+=1)}updateLevelHud(){if(!this.session)return;const e=28,t=Math.floor(this.session.worldStats.blocksMined/e)+1,n=this.session.worldStats.blocksMined%e/e;this.hud.setLevel(t,n)}async persistProfile(e){this.session&&(await this.saveRepository.savePlayer(this.session.id,this.session.player.getState(),this.session.inventory.snapshot(),this.session.worldStats),e&&await this.saveRepository.saveGlobalStats(this.globalStats))}applySettings(e){this.settings={keyBindings:Jn(e.keyBindings),skinDataUrl:e.skinDataUrl},this.menu.setSettings(this.settings),this.hud.setHandSkin(this.settings.skinDataUrl),this.renderer.setPlayerSkin(this.settings.skinDataUrl),this.saveRepository.saveSettings(this.settings),this.inventoryScreen.isVisible()&&this.refreshInventoryScreen()}normalizeWorldStats(e){if(!e)return Ya();const t=n=>Number.isFinite(n)?Number(n):0;return{blocksMined:t(e.blocksMined),blocksPlaced:t(e.blocksPlaced),distanceTravelled:t(e.distanceTravelled),playTimeMs:t(e.playTimeMs),jumps:t(e.jumps),craftedItems:t(e.craftedItems)}}handleRightClickInventory(e,t,n,i){if(i.blockId===null||i.count<=0){if(n.blockId===null||n.count<=0)return{blockId:null,count:0};const o=Math.ceil(n.count/2);return e.setSlot(t,{blockId:n.blockId,count:n.count-o}),n.count-o<=0&&e.setSlot(t,{blockId:null,count:0}),{blockId:n.blockId,count:o}}if(n.blockId===null||n.count<=0){e.setSlot(t,{blockId:i.blockId,count:1});const o=i.count-1;return o>0?{blockId:i.blockId,count:o}:{blockId:null,count:0}}if(n.blockId!==i.blockId||n.count>=Xt)return i;e.setSlot(t,{blockId:n.blockId,count:Math.min(Xt,n.count+1)});const a=i.count-1;return a>0?{blockId:i.blockId,count:a}:{blockId:null,count:0}}transferStackBetweenSections(e,t){const n=e.getSlot(t);if(n.blockId===null||n.count<=0)return!1;const i=t<27?[27,35]:[0,26];let r=n.count;for(let a=i[0];a<=i[1];a+=1){const o=e.getSlot(a);if(o.blockId!==n.blockId||o.count>=Xt)continue;const l=Math.min(Xt-o.count,r);if(e.setSlot(a,{blockId:o.blockId,count:o.count+l}),r-=l,r===0)break}for(let a=i[0];a<=i[1]&&r>0;a+=1){const o=e.getSlot(a);if(o.blockId!==null&&o.count>0)continue;const l=Math.min(Xt,r);e.setSlot(a,{blockId:n.blockId,count:l}),r-=l}return r===n.count?!1:(r<=0?e.setSlot(t,{blockId:null,count:0}):e.setSlot(t,{blockId:n.blockId,count:r}),!0)}async playMenuMusic(){if(this.menuMusic.paused)try{await this.menuMusic.play(),this.unregisterMenuMusicUnlock()}catch{this.registerMenuMusicUnlock()}}stopMenuMusic(){this.menuMusic.pause(),this.menuMusic.currentTime=0,this.unregisterMenuMusicUnlock()}registerMenuMusicUnlock(){this.menuMusicUnlockRegistered||(this.menuMusicUnlockRegistered=!0,window.addEventListener("pointerdown",this.handleMenuMusicUnlock),window.addEventListener("keydown",this.handleMenuMusicUnlock))}unregisterMenuMusicUnlock(){this.menuMusicUnlockRegistered&&(this.menuMusicUnlockRegistered=!1,window.removeEventListener("pointerdown",this.handleMenuMusicUnlock),window.removeEventListener("keydown",this.handleMenuMusicUnlock))}handleMenuMusicUnlock(){this.playMenuMusic()}}const Vc=document.querySelector("#app");if(!Vc)throw new Error("App root not found.");const y_=new A_(Vc);y_.bootstrap();
