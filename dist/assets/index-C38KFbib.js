(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const Ge={chunkSizeX:16,chunkSizeY:96,chunkSizeZ:16,preloadRadius:4,maxInteractionDistance:6,generationBudgetPerFrame:1,meshBudgetPerFrame:1,skyColor:"#9cc7f5"},Ie={walkSpeed:4.45,sprintSpeed:6.25,crouchSpeed:1.72,jumpVelocity:7.2,gravity:24,colliderWidth:.6,colliderHeight:1.8,eyeHeight:1.62,crouchEyeHeight:1.15,mouseSensitivity:.0025,jumpRepeatDelayMs:86,landingJumpCooldownMs:54,autoJumpGroundedDelayMs:18,jumpBufferMs:95,coyoteTimeMs:80,groundFrictionTick:.56,airFrictionTick:.92,verticalDragTick:.984,groundWalkAccelerationTick:.11,groundSprintAccelerationTick:.17,groundCrouchAccelerationTick:.05,airWalkAccelerationTick:.022,airSprintAccelerationTick:.03,airStrafePenalty:.55,airSprintSideControlPenalty:.9,groundSprintForwardStrafeScale:.62,airSprintForwardStrafeScale:.76,fallStrafeBaseControlSpeed:2.35,airborneWalkSpeed:5.1,airborneSprintSpeed:6.55,sprintJumpBoost:.28,landingProbeSeconds:.09,landingApproachDamping:.74,maxHorizontalSpeed:7.25,mcTickSeconds:.05},ut={schemaVersion:5,databaseVersion:3,legacyWorldId:"default-world",appMetaKey:"app-meta",playerSaveIntervalMs:2e3,worldSaveDebounceMs:500},Vs=["moveForward","moveBackward","moveLeft","moveRight","jump","crouch","sprint","inventory","debug","pause"],ed={moveForward:"Move Forward",moveBackward:"Move Backward",moveLeft:"Strafe Left",moveRight:"Strafe Right",jump:"Jump",crouch:"Crouch",sprint:"Sprint",inventory:"Inventory",debug:"Debug Overlay",pause:"Pause Menu"},td={moveForward:{primary:"KeyW",secondary:"ArrowUp"},moveBackward:{primary:"KeyS",secondary:"ArrowDown"},moveLeft:{primary:"KeyA",secondary:"ArrowLeft"},moveRight:{primary:"KeyD",secondary:"ArrowRight"},jump:{primary:"ControlRight",secondary:"Space"},crouch:{primary:"Numpad0",secondary:"ControlLeft"},sprint:{primary:"ShiftLeft",secondary:"ShiftRight"},inventory:{primary:"KeyI",secondary:"Tab"},debug:{primary:"F3",secondary:null},pause:{primary:"Escape",secondary:null}},Ws=()=>({keyBindings:structuredClone(td),skinDataUrl:null,startFullscreen:!0}),sn=s=>{const e={};return Vs.forEach(t=>{e[t]={primary:s[t].primary,secondary:s[t].secondary}}),e},Eo={Escape:"Esc",Space:"Space",ControlLeft:"Ctrl Left",ControlRight:"Ctrl Right",ShiftLeft:"Shift Left",ShiftRight:"Shift Right",AltLeft:"Alt Left",AltRight:"Alt Right",ArrowUp:"Arrow Up",ArrowDown:"Arrow Down",ArrowLeft:"Arrow Left",ArrowRight:"Arrow Right",Numpad0:"Num 0",Numpad1:"Num 1",Numpad2:"Num 2",Numpad3:"Num 3",Numpad4:"Num 4",Numpad5:"Num 5",Numpad6:"Num 6",Numpad7:"Num 7",Numpad8:"Num 8",Numpad9:"Num 9"},nd=s=>s?Eo[s]?Eo[s]:s.startsWith("Key")?s.replace("Key","").toUpperCase():s.startsWith("Digit")?s.replace("Digit",""):s.startsWith("Mouse")?s.replace("Mouse","Mouse "):s:"Unbound";class id{constructor(e,t,n){this.fixedStepSeconds=e,this.update=t,this.render=n,this.tick=this.tick.bind(this)}running=!1;lastTime=0;accumulator=0;animationFrameId=0;start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.animationFrameId=window.requestAnimationFrame(this.tick))}stop(){this.running&&(this.running=!1,window.cancelAnimationFrame(this.animationFrameId))}tick(e){if(!this.running)return;const t=Math.min((e-this.lastTime)/1e3,.1);for(this.lastTime=e,this.accumulator+=t;this.accumulator>=this.fixedStepSeconds;)this.update(this.fixedStepSeconds),this.accumulator-=this.fixedStepSeconds;this.render(this.accumulator/this.fixedStepSeconds),this.animationFrameId=window.requestAnimationFrame(this.tick)}}const Xt=128,$a=27,Mi=9,rr=$a+Mi,Fi=$a,Hn=()=>({blockId:null,count:0});class wo{slots;selectedHotbarIndex=0;constructor(e,t=0){this.slots=Array.from({length:rr},(n,i)=>{const r=e?.[i];return r?{...r}:Hn()}),this.selectedHotbarIndex=Math.max(0,Math.min(Mi-1,t))}getSlots(){return this.slots.map(e=>({...e}))}getMainSlots(){return this.slots.slice(0,$a).map(e=>({...e}))}getHotbarSlots(){return this.slots.slice(Fi).map(e=>({...e}))}getSelectedHotbarIndex(){return this.selectedHotbarIndex}setSelectedHotbarIndex(e){e<0||e>=Mi||(this.selectedHotbarIndex=e)}shiftSelectedHotbar(e){this.selectedHotbarIndex=((this.selectedHotbarIndex+e)%Mi+Mi)%Mi}getSelectedBlock(){return this.slots[Fi+this.selectedHotbarIndex].blockId}getSelectedAbsoluteSlotIndex(){return Fi+this.selectedHotbarIndex}getSlot(e){return{...this.slots[e]}}setSlot(e,t){if(e<0||e>=rr)return;const n=t.blockId===null?0:Math.max(1,Math.min(Xt,t.count));this.slots[e]={blockId:t.blockId,count:n}}pickUpSlot(e){const t=this.getSlot(e);return this.slots[e]=Hn(),t}placeCursor(e,t){if(t.blockId===null||t.count<=0)return Hn();const n=this.slots[e];if(n.blockId===null||n.count===0)return this.slots[e]={...t},Hn();if(n.blockId===t.blockId){const i=Math.min(Xt-n.count,t.count);this.slots[e]={blockId:n.blockId,count:n.count+i};const r=t.count-i;return r>0?{blockId:t.blockId,count:r}:Hn()}return this.slots[e]={...t},{...n}}addBlock(e,t=1){if(!this.canAddBlock(e,t))return!1;let n=t;for(const i of this.iterateHotbarThenMain())if(i.blockId===e&&i.count<Xt){const r=Math.min(Xt-i.count,n);if(i.count+=r,n-=r,n===0)return!0}for(const i of this.iterateHotbarThenMain())if(i.blockId===null||i.count===0){const r=Math.min(Xt,n);if(i.blockId=e,i.count=r,n-=r,n===0)return!0}return n===0}canAddBlock(e,t=1){let n=t;for(const i of this.iterateHotbarThenMain())if(i.blockId===e?n-=Xt-i.count:(i.blockId===null||i.count===0)&&(n-=Xt),n<=0)return!0;return!1}removeBlock(e,t){if(this.getBlockCount(e)<t)return!1;let n=t;for(let i=0;i<this.slots.length;i+=1){const r=this.slots[i];if(r.blockId!==e)continue;const a=Math.min(r.count,n);if(r.count-=a,n-=a,r.count===0&&(r.blockId=null),n===0)return!0}return!1}consumeSelectedBlock(){const e=this.getSelectedAbsoluteSlotIndex(),t=this.slots[e];if(t.blockId===null||t.count<=0)return null;t.count-=1;const n=t.blockId;return t.count===0&&(t.blockId=null),n}getBlockCount(e){return this.slots.reduce((t,n)=>n.blockId!==e?t:t+n.count,0)}snapshot(){return this.getSlots()}returnCursor(e){return e.blockId===null||e.count===0||this.addBlock(e.blockId,e.count)?Hn():e}*iterateHotbarThenMain(){for(let e=Fi;e<rr;e+=1)yield this.slots[e];for(let e=0;e<Fi;e+=1)yield this.slots[e]}}const sd=[{id:"planks",label:"Planks x4",description:"Turn one log into four planks.",mode:"both",ingredients:[{blockId:4,count:1}],output:{blockId:7,count:4}},{id:"crafting_table",label:"Crafting Table",description:"Four planks form a workbench.",mode:"both",ingredients:[{blockId:7,count:4}],output:{blockId:8,count:1}},{id:"stone_bricks",label:"Stone Bricks x4",description:"Workbench recipe for a cleaner stone block.",mode:"crafting_table",ingredients:[{blockId:3,count:4}],output:{blockId:9,count:4}}],To=s=>sd.filter(e=>e.mode==="both"||e.mode===s),sc=(s,e)=>s.canAddBlock(e.output.blockId,e.output.count)?e.ingredients.every(t=>s.getBlockCount(t.blockId)>=t.count):!1,rd=(s,e)=>sc(s,e)?(e.ingredients.forEach(t=>{s.removeBlock(t.blockId,t.count)}),s.addBlock(e.output.blockId,e.output.count)):!1;class ad{constructor(e){this.canvas=e,this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseDown=this.handleMouseDown.bind(this),this.handleMouseUp=this.handleMouseUp.bind(this),this.handleWheel=this.handleWheel.bind(this),this.handlePointerLockChange=this.handlePointerLockChange.bind(this),this.handleContextMenu=this.handleContextMenu.bind(this)}pressedKeys=new Set;justPressedKeys=new Set;pointerLocked=!1;lookDeltaX=0;lookDeltaY=0;primaryDown=!1;primaryClicked=!1;secondaryClicked=!1;wheelSteps=0;pointerLockListener;connect(){window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("mousemove",this.handleMouseMove),window.addEventListener("mousedown",this.handleMouseDown),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("wheel",this.handleWheel,{passive:!1}),window.addEventListener("contextmenu",this.handleContextMenu),document.addEventListener("pointerlockchange",this.handlePointerLockChange)}dispose(){window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("mousemove",this.handleMouseMove),window.removeEventListener("mousedown",this.handleMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("wheel",this.handleWheel),window.removeEventListener("contextmenu",this.handleContextMenu),document.removeEventListener("pointerlockchange",this.handlePointerLockChange)}setPointerLockListener(e){this.pointerLockListener=e}requestPointerLock(){return this.canvas.requestPointerLock({unadjustedMovement:!0})}exitPointerLock(){document.pointerLockElement===this.canvas&&document.exitPointerLock()}isPointerLocked(){return this.pointerLocked}isKeyDown(e){return this.pressedKeys.has(e)}isAnyKeyDown(e){return e.some(t=>!!t&&this.pressedKeys.has(t))}consumeLookDelta(){const e={x:this.lookDeltaX,y:this.lookDeltaY};return this.lookDeltaX=0,this.lookDeltaY=0,e}isPrimaryDown(){return this.primaryDown}consumePrimaryClick(){const e=this.primaryClicked;return this.primaryClicked=!1,e}consumeSecondaryClick(){const e=this.secondaryClicked;return this.secondaryClicked=!1,e}consumeWheelSteps(){const e=this.wheelSteps;return this.wheelSteps=0,e}consumeJustPressedKey(e){const t=this.justPressedKeys.has(e);return t&&this.justPressedKeys.delete(e),t}consumeAnyJustPressed(e){for(const t of e)if(t&&this.consumeJustPressedKey(t))return!0;return!1}consumeNumberSlot(){for(let e=1;e<=9;e+=1)if(this.consumeJustPressedKey(`Digit${e}`))return e-1;return null}endFrame(){this.justPressedKeys.clear()}handleKeyDown(e){this.pressedKeys.has(e.code)||this.justPressedKeys.add(e.code),this.pressedKeys.add(e.code)}handleKeyUp(e){this.pressedKeys.delete(e.code)}handleMouseMove(e){this.pointerLocked&&(this.lookDeltaX+=e.movementX,this.lookDeltaY+=e.movementY)}handleMouseDown(e){e.button===0&&(this.primaryDown=!0,this.primaryClicked=!0),e.button===2&&(this.secondaryClicked=!0)}handleMouseUp(e){e.button===0&&(this.primaryDown=!1)}handleWheel(e){this.pointerLocked&&(e.preventDefault(),this.wheelSteps+=Math.sign(e.deltaY))}handleContextMenu(e){e.preventDefault()}handlePointerLockChange(){this.pointerLocked=document.pointerLockElement===this.canvas,this.pointerLockListener?.(this.pointerLocked)}}const Za="180",od=0,Co=1,ld=2,rc=1,ac=2,_n=3,cn=0,Pt=1,vn=2,Nn=0,bi=1,Ro=2,Po=3,Io=4,cd=5,Qn=100,dd=101,hd=102,ud=103,fd=104,pd=200,md=201,gd=202,Ad=203,Jr=204,Qr=205,_d=206,vd=207,Sd=208,Md=209,yd=210,xd=211,bd=212,Ed=213,wd=214,ea=0,ta=1,na=2,Ci=3,ia=4,sa=5,ra=6,aa=7,Ja=0,Td=1,Cd=2,Bn=0,Rd=1,Pd=2,Id=3,oc=4,Dd=5,Ld=6,Ud=7,lc=300,Ri=301,Pi=302,oa=303,la=304,Js=306,ca=1e3,Sn=1001,da=1002,It=1003,Nd=1004,ls=1005,Jt=1006,ar=1007,Un=1008,dn=1009,cc=1010,dc=1011,qi=1012,Qa=1013,ni=1014,Mn=1015,ts=1016,eo=1017,to=1018,Ki=1020,hc=35902,uc=35899,fc=1021,pc=1022,Qt=1023,ji=1026,$i=1027,mc=1028,no=1029,gc=1030,io=1031,so=1033,Bs=33776,ks=33777,Fs=33778,Os=33779,ha=35840,ua=35841,fa=35842,pa=35843,ma=36196,ga=37492,Aa=37496,_a=37808,va=37809,Sa=37810,Ma=37811,ya=37812,xa=37813,ba=37814,Ea=37815,wa=37816,Ta=37817,Ca=37818,Ra=37819,Pa=37820,Ia=37821,Da=36492,La=36494,Ua=36495,Na=36283,Ba=36284,ka=36285,Fa=36286,Bd=3200,kd=3201,Ac=0,Fd=1,Ln="",St="srgb",Ii="srgb-linear",Xs="linear",Je="srgb",ri=7680,Do=519,Od=512,zd=513,Gd=514,_c=515,Hd=516,Vd=517,Wd=518,Xd=519,Lo=35044,Uo="300 es",on=2e3,Ys=2001;class Ni{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],or=Math.PI/180,Oa=180/Math.PI;function ns(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xt[s&255]+xt[s>>8&255]+xt[s>>16&255]+xt[s>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]).toLowerCase()}function We(s,e,t){return Math.max(e,Math.min(t,s))}function Yd(s,e){return(s%e+e)%e}function lr(s,e,t){return(1-t)*s+t*e}function Oi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ut(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Xe{constructor(e=0,t=0){Xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class is{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==u||c!==p||h!==g){let m=1-o;const f=l*u+c*p+h*g+d*_,E=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const C=Math.sqrt(b),w=Math.atan2(C,f*E);m=Math.sin(m*w)/C,o=Math.sin(o*w)/C}const y=o*E;if(l=l*m+u*y,c=c*m+p*y,h=h*m+g*y,d=d*m+_*y,m===1-o){const C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*p-c*u,e[t+1]=l*g+h*u+c*d-o*p,e[t+2]=c*g+h*p+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(r/2),u=l(n/2),p=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-i)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(r-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-i)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,t=0,n=0){B.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(No.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(No.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=i+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return cr.copy(this).projectOnVector(e),this.sub(cr)}reflect(e){return this.sub(cr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const cr=new B,No=new is;class ke{constructor(e,t,n,i,r,a,o,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],E=i[1],b=i[4],y=i[7],C=i[2],w=i[5],R=i[8];return r[0]=a*_+o*E+l*C,r[3]=a*m+o*b+l*w,r[6]=a*f+o*y+l*R,r[1]=c*_+h*E+d*C,r[4]=c*m+h*b+d*w,r[7]=c*f+h*y+d*R,r[2]=u*_+p*E+g*C,r[5]=u*m+p*b+g*w,r[8]=u*f+p*y+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,p=c*r-a*l,g=t*d+n*u+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=u*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-o*t)*_,e[6]=p*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(dr.makeScale(e,t)),this}rotate(e){return this.premultiply(dr.makeRotation(-e)),this}translate(e,t){return this.premultiply(dr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const dr=new ke;function vc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function qs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function qd(){const s=qs("canvas");return s.style.display="block",s}const Bo={};function Zi(s){s in Bo||(Bo[s]=!0,console.warn(s))}function Kd(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const ko=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fo=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jd(){const s={enabled:!0,workingColorSpace:Ii,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Je&&(i.r=yn(i.r),i.g=yn(i.g),i.b=yn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Je&&(i.r=Ei(i.r),i.g=Ei(i.g),i.b=Ei(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ln?Xs:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Zi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Zi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Ii]:{primaries:e,whitePoint:n,transfer:Xs,toXYZ:ko,fromXYZ:Fo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:St},outputColorSpaceConfig:{drawingBufferColorSpace:St}},[St]:{primaries:e,whitePoint:n,transfer:Je,toXYZ:ko,fromXYZ:Fo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:St}}}),s}const je=jd();function yn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ei(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ai;class $d{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ai===void 0&&(ai=qs("canvas")),ai.width=e.width,ai.height=e.height;const i=ai.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ai}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=yn(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(yn(t[n]/255)*255):t[n]=yn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Zd=0;class ro{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=ns(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(hr(i[a].image)):r.push(hr(i[a]))}else r=hr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function hr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?$d.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Jd=0;const ur=new B;class Dt extends Ni{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,n=Sn,i=Sn,r=Jt,a=Un,o=Qt,l=dn,c=Dt.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=ns(),this.name="",this.source=new ro(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ur).x}get height(){return this.source.getSize(ur).y}get depth(){return this.source.getSize(ur).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ca:e.x=e.x-Math.floor(e.x);break;case Sn:e.x=e.x<0?0:1;break;case da:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ca:e.y=e.y-Math.floor(e.y);break;case Sn:e.y=e.y<0?0:1;break;case da:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=lc;Dt.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,n=0,i=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,y=(p+1)/2,C=(f+1)/2,w=(h+u)/4,R=(d+_)/4,U=(g+m)/4;return b>y&&b>C?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=w/n,r=R/n):y>C?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=w/i,r=U/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=R/r,i=U/r),this.set(n,i,r,t),this}let E=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(d-_)/E,this.z=(u-h)/E,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qd extends Ni{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const i={width:e,height:t,depth:n.depth},r=new Dt(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new ro(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends Qd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Sc extends Dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class eh extends Dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ss{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Yt):Yt.fromBufferAttribute(r,a),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cs.copy(n.boundingBox)),cs.applyMatrix4(e.matrixWorld),this.union(cs)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zi),ds.subVectors(this.max,zi),oi.subVectors(e.a,zi),li.subVectors(e.b,zi),ci.subVectors(e.c,zi),En.subVectors(li,oi),wn.subVectors(ci,li),Vn.subVectors(oi,ci);let t=[0,-En.z,En.y,0,-wn.z,wn.y,0,-Vn.z,Vn.y,En.z,0,-En.x,wn.z,0,-wn.x,Vn.z,0,-Vn.x,-En.y,En.x,0,-wn.y,wn.x,0,-Vn.y,Vn.x,0];return!fr(t,oi,li,ci,ds)||(t=[1,0,0,0,1,0,0,0,1],!fr(t,oi,li,ci,ds))?!1:(hs.crossVectors(En,wn),t=[hs.x,hs.y,hs.z],fr(t,oi,li,ci,ds))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const un=[new B,new B,new B,new B,new B,new B,new B,new B],Yt=new B,cs=new ss,oi=new B,li=new B,ci=new B,En=new B,wn=new B,Vn=new B,zi=new B,ds=new B,hs=new B,Wn=new B;function fr(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Wn.fromArray(s,r);const o=i.x*Math.abs(Wn.x)+i.y*Math.abs(Wn.y)+i.z*Math.abs(Wn.z),l=e.dot(Wn),c=t.dot(Wn),h=n.dot(Wn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const th=new ss,Gi=new B,pr=new B;class ao{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):th.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gi.subVectors(e,this.center);const t=Gi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Gi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gi.copy(e.center).add(pr)),this.expandByPoint(Gi.copy(e.center).sub(pr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const fn=new B,mr=new B,us=new B,Tn=new B,gr=new B,fs=new B,Ar=new B;class nh{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.origin).addScaledVector(this.direction,t),fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){mr.copy(e).add(t).multiplyScalar(.5),us.copy(t).sub(e).normalize(),Tn.copy(this.origin).sub(mr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(us),o=Tn.dot(this.direction),l=-Tn.dot(us),c=Tn.lengthSq(),h=Math.abs(1-a*a);let d,u,p,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,p=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(mr).addScaledVector(us,u),p}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const n=fn.dot(this.direction),i=fn.dot(fn)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,n,i,r){gr.subVectors(t,e),fs.subVectors(n,e),Ar.crossVectors(gr,fs);let a=this.direction.dot(Ar),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Tn.subVectors(this.origin,e);const l=o*this.direction.dot(fs.crossVectors(Tn,fs));if(l<0)return null;const c=o*this.direction.dot(gr.cross(Tn));if(c<0||l+c>a)return null;const h=-o*Tn.dot(Ar);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,n,i,r,a,o,l,c,h,d,u,p,g,_,m){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,d,u,p,g,_,m)}set(e,t,n,i,r,a,o,l,c,h,d,u,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/di.setFromMatrixColumn(e,0).length(),r=1/di.setFromMatrixColumn(e,1).length(),a=1/di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,p=a*d,g=o*h,_=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=u-_*c,t[9]=-o*l,t[2]=_-u*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,p=l*d,g=c*h,_=c*d;t[0]=u+_*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=_+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,p=l*d,g=c*h,_=c*d;t[0]=u-_*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,p=a*d,g=o*h,_=o*d;t[0]=l*h,t[4]=g*c-p,t[8]=u*c+_,t[1]=l*d,t[5]=_*c+u,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,p=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-u*d,t[8]=g*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*d+g,t[10]=u-_*d}else if(e.order==="XZY"){const u=a*l,p=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+_,t[5]=a*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ih,e,sh)}lookAt(e,t,n){const i=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),Cn.crossVectors(n,Ft),Cn.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),Cn.crossVectors(n,Ft)),Cn.normalize(),ps.crossVectors(Ft,Cn),i[0]=Cn.x,i[4]=ps.x,i[8]=Ft.x,i[1]=Cn.y,i[5]=ps.y,i[9]=Ft.y,i[2]=Cn.z,i[6]=ps.z,i[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],E=n[3],b=n[7],y=n[11],C=n[15],w=i[0],R=i[4],U=i[8],M=i[12],S=i[1],P=i[5],k=i[9],G=i[13],Y=i[2],K=i[6],W=i[10],Q=i[14],z=i[3],ie=i[7],ae=i[11],pe=i[15];return r[0]=a*w+o*S+l*Y+c*z,r[4]=a*R+o*P+l*K+c*ie,r[8]=a*U+o*k+l*W+c*ae,r[12]=a*M+o*G+l*Q+c*pe,r[1]=h*w+d*S+u*Y+p*z,r[5]=h*R+d*P+u*K+p*ie,r[9]=h*U+d*k+u*W+p*ae,r[13]=h*M+d*G+u*Q+p*pe,r[2]=g*w+_*S+m*Y+f*z,r[6]=g*R+_*P+m*K+f*ie,r[10]=g*U+_*k+m*W+f*ae,r[14]=g*M+_*G+m*Q+f*pe,r[3]=E*w+b*S+y*Y+C*z,r[7]=E*R+b*P+y*K+C*ie,r[11]=E*U+b*k+y*W+C*ae,r[15]=E*M+b*G+y*Q+C*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*l*d-i*c*d-r*o*u+n*c*u+i*o*p-n*l*p)+_*(+t*l*p-t*c*u+r*a*u-i*a*p+i*c*h-r*l*h)+m*(+t*c*d-t*o*p-r*a*d+n*a*p+r*o*h-n*c*h)+f*(-i*o*h-t*l*d+t*o*u+i*a*d-n*a*u+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],E=d*m*c-_*u*c+_*l*p-o*m*p-d*l*f+o*u*f,b=g*u*c-h*m*c-g*l*p+a*m*p+h*l*f-a*u*f,y=h*_*c-g*d*c+g*o*p-a*_*p-h*o*f+a*d*f,C=g*d*l-h*_*l-g*o*u+a*_*u+h*o*m-a*d*m,w=t*E+n*b+i*y+r*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return e[0]=E*R,e[1]=(_*u*r-d*m*r-_*i*p+n*m*p+d*i*f-n*u*f)*R,e[2]=(o*m*r-_*l*r+_*i*c-n*m*c-o*i*f+n*l*f)*R,e[3]=(d*l*r-o*u*r-d*i*c+n*u*c+o*i*p-n*l*p)*R,e[4]=b*R,e[5]=(h*m*r-g*u*r+g*i*p-t*m*p-h*i*f+t*u*f)*R,e[6]=(g*l*r-a*m*r-g*i*c+t*m*c+a*i*f-t*l*f)*R,e[7]=(a*u*r-h*l*r+h*i*c-t*u*c-a*i*p+t*l*p)*R,e[8]=y*R,e[9]=(g*d*r-h*_*r-g*n*p+t*_*p+h*n*f-t*d*f)*R,e[10]=(a*_*r-g*o*r+g*n*c-t*_*c-a*n*f+t*o*f)*R,e[11]=(h*o*r-a*d*r-h*n*c+t*d*c+a*n*p-t*o*p)*R,e[12]=C*R,e[13]=(h*_*i-g*d*i+g*n*u-t*_*u-h*n*m+t*d*m)*R,e[14]=(g*o*i-a*_*i-g*n*l+t*_*l+a*n*m-t*o*m)*R,e[15]=(a*d*i-h*o*i+h*n*l-t*d*l-a*n*u+t*o*u)*R,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,p=r*h,g=r*d,_=a*h,m=a*d,f=o*d,E=l*c,b=l*h,y=l*d,C=n.x,w=n.y,R=n.z;return i[0]=(1-(_+f))*C,i[1]=(p+y)*C,i[2]=(g-b)*C,i[3]=0,i[4]=(p-y)*w,i[5]=(1-(u+f))*w,i[6]=(m+E)*w,i[7]=0,i[8]=(g+b)*R,i[9]=(m-E)*R,i[10]=(1-(u+_))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=di.set(i[0],i[1],i[2]).length();const a=di.set(i[4],i[5],i[6]).length(),o=di.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],qt.copy(this);const c=1/r,h=1/a,d=1/o;return qt.elements[0]*=c,qt.elements[1]*=c,qt.elements[2]*=c,qt.elements[4]*=h,qt.elements[5]*=h,qt.elements[6]*=h,qt.elements[8]*=d,qt.elements[9]*=d,qt.elements[10]*=d,t.setFromRotationMatrix(qt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=on,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(n-i),u=(t+e)/(t-e),p=(n+i)/(n-i);let g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===on)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Ys)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=on,l=!1){const c=this.elements,h=2/(t-e),d=2/(n-i),u=-(t+e)/(t-e),p=-(n+i)/(n-i);let g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===on)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Ys)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const di=new B,qt=new ct,ih=new B(0,0,0),sh=new B(1,1,1),Cn=new B,ps=new B,Ft=new B,Oo=new ct,zo=new is;class tn{constructor(e=0,t=0,n=0,i=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-We(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Oo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Oo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zo.setFromEuler(this),this.setFromQuaternion(zo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class Mc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let rh=0;const Go=new B,hi=new is,pn=new ct,ms=new B,Hi=new B,ah=new B,oh=new is,Ho=new B(1,0,0),Vo=new B(0,1,0),Wo=new B(0,0,1),Xo={type:"added"},lh={type:"removed"},ui={type:"childadded",child:null},_r={type:"childremoved",child:null};class At extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=ns(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new B,t=new tn,n=new is,i=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ct},normalMatrix:{value:new ke}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.multiply(hi),this}rotateOnWorldAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.premultiply(hi),this}rotateX(e){return this.rotateOnAxis(Ho,e)}rotateY(e){return this.rotateOnAxis(Vo,e)}rotateZ(e){return this.rotateOnAxis(Wo,e)}translateOnAxis(e,t){return Go.copy(e).applyQuaternion(this.quaternion),this.position.add(Go.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ho,e)}translateY(e){return this.translateOnAxis(Vo,e)}translateZ(e){return this.translateOnAxis(Wo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ms.copy(e):ms.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Hi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Hi,ms,this.up):pn.lookAt(ms,Hi,this.up),this.quaternion.setFromRotationMatrix(pn),i&&(pn.extractRotation(i.matrixWorld),hi.setFromRotationMatrix(pn),this.quaternion.premultiply(hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Xo),ui.child=e,this.dispatchEvent(ui),ui.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lh),_r.child=e,this.dispatchEvent(_r),_r.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Xo),ui.child=e,this.dispatchEvent(ui),ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,e,ah),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,oh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}At.DEFAULT_UP=new B(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kt=new B,mn=new B,vr=new B,gn=new B,fi=new B,pi=new B,Yo=new B,Sr=new B,Mr=new B,yr=new B,xr=new ot,br=new ot,Er=new ot;class Zt{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Kt.subVectors(e,t),i.cross(Kt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Kt.subVectors(i,t),mn.subVectors(n,t),vr.subVectors(e,t);const a=Kt.dot(Kt),o=Kt.dot(mn),l=Kt.dot(vr),c=mn.dot(mn),h=mn.dot(vr),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,gn.x),l.addScaledVector(a,gn.y),l.addScaledVector(o,gn.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return xr.setScalar(0),br.setScalar(0),Er.setScalar(0),xr.fromBufferAttribute(e,t),br.fromBufferAttribute(e,n),Er.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(xr,r.x),a.addScaledVector(br,r.y),a.addScaledVector(Er,r.z),a}static isFrontFacing(e,t,n,i){return Kt.subVectors(n,t),mn.subVectors(e,t),Kt.cross(mn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Kt.cross(mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Zt.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;fi.subVectors(i,n),pi.subVectors(r,n),Sr.subVectors(e,n);const l=fi.dot(Sr),c=pi.dot(Sr);if(l<=0&&c<=0)return t.copy(n);Mr.subVectors(e,i);const h=fi.dot(Mr),d=pi.dot(Mr);if(h>=0&&d<=h)return t.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(fi,a);yr.subVectors(e,r);const p=fi.dot(yr),g=pi.dot(yr);if(g>=0&&p<=g)return t.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(pi,o);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Yo.subVectors(r,i),o=(d-h)/(d-h+(p-g)),t.copy(i).addScaledVector(Yo,o);const f=1/(m+_+u);return a=_*f,o=u*f,t.copy(n).addScaledVector(fi,a).addScaledVector(pi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const yc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},gs={h:0,s:0,l:0};function wr(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=je.workingColorSpace){if(e=Yd(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=wr(a,r,e+1/3),this.g=wr(a,r,e),this.b=wr(a,r,e-1/3)}return je.colorSpaceToWorking(this,i),this}setStyle(e,t=St){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=St){const n=yc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yn(e.r),this.g=yn(e.g),this.b=yn(e.b),this}copyLinearToSRGB(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return je.workingToColorSpace(bt.copy(this),e),Math.round(We(bt.r*255,0,255))*65536+Math.round(We(bt.g*255,0,255))*256+Math.round(We(bt.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(bt.copy(this),t);const n=bt.r,i=bt.g,r=bt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=St){je.workingToColorSpace(bt.copy(this),e);const t=bt.r,n=bt.g,i=bt.b;return e!==St?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Rn),this.setHSL(Rn.h+e,Rn.s+t,Rn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Rn),e.getHSL(gs);const n=lr(Rn.h,gs.h,t),i=lr(Rn.s,gs.s,t),r=lr(Rn.l,gs.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bt=new Ne;Ne.NAMES=yc;let ch=0;class rs extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ch++}),this.uuid=ns(),this.name="",this.type="Material",this.blending=bi,this.side=cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jr,this.blendDst=Qr,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Do,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ri,this.stencilZFail=ri,this.stencilZPass=ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bi&&(n.blending=this.blending),this.side!==cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Jr&&(n.blendSrc=this.blendSrc),this.blendDst!==Qr&&(n.blendDst=this.blendDst),this.blendEquation!==Qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ci&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Do&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ji extends rs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Ja,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new B,As=new Xe;let dh=0;class ln{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:dh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Lo,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)As.fromBufferAttribute(this,t),As.applyMatrix3(e),this.setXY(t,As.x,As.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Oi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Oi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Oi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Oi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Oi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),i=Ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),i=Ut(i,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Lo&&(e.usage=this.usage),e}}class xc extends ln{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class bc extends ln{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class zt extends ln{constructor(e,t,n){super(new Float32Array(e),t,n)}}let hh=0;const Wt=new ct,Tr=new At,mi=new B,Ot=new ss,Vi=new ss,gt=new B;class bn extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hh++}),this.uuid=ns(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vc(e)?bc:xc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,n){return Wt.makeTranslation(e,t,n),this.applyMatrix4(Wt),this}scale(e,t,n){return Wt.makeScale(e,t,n),this.applyMatrix4(Wt),this}lookAt(e){return Tr.lookAt(e),Tr.updateMatrix(),this.applyMatrix4(Tr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mi).negate(),this.translate(mi.x,mi.y,mi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ss);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Ot.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Ot.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Ot.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Ot.min),this.boundingBox.expandByPoint(Ot.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ao);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const n=this.boundingSphere.center;if(Ot.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Vi.setFromBufferAttribute(o),this.morphTargetsRelative?(gt.addVectors(Ot.min,Vi.min),Ot.expandByPoint(gt),gt.addVectors(Ot.max,Vi.max),Ot.expandByPoint(gt)):(Ot.expandByPoint(Vi.min),Ot.expandByPoint(Vi.max))}Ot.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)gt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(gt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)gt.fromBufferAttribute(o,c),l&&(mi.fromBufferAttribute(e,c),gt.add(mi)),i=Math.max(i,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ln(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new B,l[U]=new B;const c=new B,h=new B,d=new B,u=new Xe,p=new Xe,g=new Xe,_=new B,m=new B;function f(U,M,S){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,S),u.fromBufferAttribute(r,U),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,S),h.sub(c),d.sub(c),p.sub(u),g.sub(u);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),o[U].add(_),o[M].add(_),o[S].add(_),l[U].add(m),l[M].add(m),l[S].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let U=0,M=E.length;U<M;++U){const S=E[U],P=S.start,k=S.count;for(let G=P,Y=P+k;G<Y;G+=3)f(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const b=new B,y=new B,C=new B,w=new B;function R(U){C.fromBufferAttribute(i,U),w.copy(C);const M=o[U];b.copy(M),b.sub(C.multiplyScalar(C.dot(M))).normalize(),y.crossVectors(w,M);const P=y.dot(l[U])<0?-1:1;a.setXYZW(U,b.x,b.y,b.z,P)}for(let U=0,M=E.length;U<M;++U){const S=E[U],P=S.start,k=S.count;for(let G=P,Y=P+k;G<Y;G+=3)R(e.getX(G+0)),R(e.getX(G+1)),R(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ln(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const i=new B,r=new B,a=new B,o=new B,l=new B,c=new B,h=new B,d=new B;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new ln(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new bn,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=e(u,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const qo=new ct,Xn=new nh,_s=new ao,Ko=new B,vs=new B,Ss=new B,Ms=new B,Cr=new B,ys=new B,jo=new B,xs=new B;class Mt extends At{constructor(e=new bn,t=new Ji){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){ys.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Cr.fromBufferAttribute(d,e),a?ys.addScaledVector(Cr,h):ys.addScaledVector(Cr.sub(t),h))}t.add(ys)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_s.copy(n.boundingSphere),_s.applyMatrix4(r),Xn.copy(e.ray).recast(e.near),!(_s.containsPoint(Xn.origin)===!1&&(Xn.intersectSphere(_s,Ko)===null||Xn.origin.distanceToSquared(Ko)>(e.far-e.near)**2))&&(qo.copy(r).invert(),Xn.copy(e.ray).applyMatrix4(qo),!(n.boundingBox!==null&&Xn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Xn)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=a[m.materialIndex],E=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=E,C=b;y<C;y+=3){const w=o.getX(y),R=o.getX(y+1),U=o.getX(y+2);i=bs(this,f,e,n,c,h,d,w,R,U),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const E=o.getX(m),b=o.getX(m+1),y=o.getX(m+2);i=bs(this,a,e,n,c,h,d,E,b,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=a[m.materialIndex],E=Math.max(m.start,p.start),b=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=E,C=b;y<C;y+=3){const w=y,R=y+1,U=y+2;i=bs(this,f,e,n,c,h,d,w,R,U),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const E=m,b=m+1,y=m+2;i=bs(this,a,e,n,c,h,d,E,b,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function uh(s,e,t,n,i,r,a,o){let l;if(e.side===Pt?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===cn,o),l===null)return null;xs.copy(o),xs.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(xs);return c<t.near||c>t.far?null:{distance:c,point:xs.clone(),object:s}}function bs(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,vs),s.getVertexPosition(l,Ss),s.getVertexPosition(c,Ms);const h=uh(s,e,t,n,vs,Ss,Ms,jo);if(h){const d=new B;Zt.getBarycoord(jo,vs,Ss,Ms,d),i&&(h.uv=Zt.getInterpolatedAttribute(i,o,l,c,d,new Xe)),r&&(h.uv1=Zt.getInterpolatedAttribute(r,o,l,c,d,new Xe)),a&&(h.normal=Zt.getInterpolatedAttribute(a,o,l,c,d,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new B,materialIndex:0};Zt.getNormal(vs,Ss,Ms,u.normal),h.face=u,h.barycoord=d}return h}class Gt extends bn{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(h,3)),this.setAttribute("uv",new zt(d,2));function g(_,m,f,E,b,y,C,w,R,U,M){const S=y/R,P=C/U,k=y/2,G=C/2,Y=w/2,K=R+1,W=U+1;let Q=0,z=0;const ie=new B;for(let ae=0;ae<W;ae++){const pe=ae*P-G;for(let De=0;De<K;De++){const qe=De*S-k;ie[_]=qe*E,ie[m]=pe*b,ie[f]=Y,c.push(ie.x,ie.y,ie.z),ie[_]=0,ie[m]=0,ie[f]=w>0?1:-1,h.push(ie.x,ie.y,ie.z),d.push(De/R),d.push(1-ae/U),Q+=1}}for(let ae=0;ae<U;ae++)for(let pe=0;pe<R;pe++){const De=u+pe+K*ae,qe=u+pe+K*(ae+1),He=u+(pe+1)+K*(ae+1),Fe=u+(pe+1)+K*ae;l.push(De,qe,Fe),l.push(qe,He,Fe),z+=6}o.addGroup(p,z,M),p+=z,u+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Di(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Ct(s){const e={};for(let t=0;t<s.length;t++){const n=Di(s[t]);for(const i in n)e[i]=n[i]}return e}function fh(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Ec(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const ph={clone:Di,merge:Ct};var mh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xn extends rs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mh,this.fragmentShader=gh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Di(e.uniforms),this.uniformsGroups=fh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class wc extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=on,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pn=new B,$o=new Xe,Zo=new Xe;class Rt extends wc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Oa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Oa*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Pn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Pn.x,Pn.y).multiplyScalar(-e/Pn.z),Pn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pn.x,Pn.y).multiplyScalar(-e/Pn.z)}getViewSize(e,t){return this.getViewBounds(e,$o,Zo),t.subVectors(Zo,$o)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(or*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const gi=-90,Ai=1;class Ah extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Rt(gi,Ai,e,t);i.layers=this.layers,this.add(i);const r=new Rt(gi,Ai,e,t);r.layers=this.layers,this.add(r);const a=new Rt(gi,Ai,e,t);a.layers=this.layers,this.add(a);const o=new Rt(gi,Ai,e,t);o.layers=this.layers,this.add(o);const l=new Rt(gi,Ai,e,t);l.layers=this.layers,this.add(l);const c=new Rt(gi,Ai,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===on)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class oo extends Dt{constructor(e=[],t=Ri,n,i,r,a,o,l,c,h){super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _h extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new oo(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Gt(5,5,5),r=new xn({name:"CubemapFromEquirect",uniforms:Di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pt,blending:Nn});r.uniforms.tEquirect.value=t;const a=new Mt(i,r),o=t.minFilter;return t.minFilter===Un&&(t.minFilter=Jt),new Ah(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}class en extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vh={type:"move"};class Rr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new en,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new en,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new en,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vh)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new en;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class lo{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ne(e),this.near=t,this.far=n}clone(){return new lo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ks extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Pr=new B,Sh=new B,Mh=new ke;class $n{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Pr.subVectors(n,t).cross(Sh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Pr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Mh.getNormalMatrix(e),i=this.coplanarPoint(Pr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yn=new ao,yh=new Xe(.5,.5),Es=new B;class co{constructor(e=new $n,t=new $n,n=new $n,i=new $n,r=new $n,a=new $n){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=on,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],_=r[9],m=r[10],f=r[11],E=r[12],b=r[13],y=r[14],C=r[15];if(i[0].setComponents(c-a,p-h,f-g,C-E).normalize(),i[1].setComponents(c+a,p+h,f+g,C+E).normalize(),i[2].setComponents(c+o,p+d,f+_,C+b).normalize(),i[3].setComponents(c-o,p-d,f-_,C-b).normalize(),n)i[4].setComponents(l,u,m,y).normalize(),i[5].setComponents(c-l,p-u,f-m,C-y).normalize();else if(i[4].setComponents(c-l,p-u,f-m,C-y).normalize(),t===on)i[5].setComponents(c+l,p+u,f+m,C+y).normalize();else if(t===Ys)i[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(e){Yn.center.set(0,0,0);const t=yh.distanceTo(e.center);return Yn.radius=.7071067811865476+t,Yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Es.x=i.normal.x>0?e.max.x:e.min.x,Es.y=i.normal.y>0?e.max.y:e.min.y,Es.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Tc extends Dt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Cc extends Dt{constructor(e,t,n=ni,i,r,a,o=It,l=It,c,h=ji,d=1){if(h!==ji&&h!==$i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ro(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Rc extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Qs extends bn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=e/o,u=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const E=f*u-a;for(let b=0;b<c;b++){const y=b*d-r;g.push(y,-E,0),_.push(0,0,1),m.push(b/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let E=0;E<o;E++){const b=E+c*f,y=E+c*(f+1),C=E+1+c*(f+1),w=E+1+c*f;p.push(b,y,w),p.push(y,C,w)}this.setIndex(p),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(_,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qs(e.width,e.height,e.widthSegments,e.heightSegments)}}class ho extends bn{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new B,u=new B,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const E=[],b=f/n;let y=0;f===0&&a===0?y=.5/t:f===n&&l===Math.PI&&(y=-.5/t);for(let C=0;C<=t;C++){const w=C/t;d.x=-e*Math.cos(i+w*r)*Math.sin(a+b*o),d.y=e*Math.cos(a+b*o),d.z=e*Math.sin(i+w*r)*Math.sin(a+b*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(w+y,1-b),E.push(c++)}h.push(E)}for(let f=0;f<n;f++)for(let E=0;E<t;E++){const b=h[f][E+1],y=h[f][E],C=h[f+1][E],w=h[f+1][E+1];(f!==0||a>0)&&p.push(b,y,w),(f!==n-1||l<Math.PI)&&p.push(y,C,w)}this.setIndex(p),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(_,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ho(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class er extends rs{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ac,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Ja,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class xh extends rs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class bh extends rs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class uo extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Eh extends uo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ir=new ct,Jo=new B,Qo=new B;class wh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.mapType=dn,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new co,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Jo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jo),Qo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qo),t.updateMatrixWorld(),Ir.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ir,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ir)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Pc extends wc{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Th extends wh{constructor(){super(new Pc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class js extends uo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new Th}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class fo extends uo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ch extends Rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Ic{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function el(s,e,t,n){const i=Rh(n);switch(t){case fc:return s*e;case mc:return s*e/i.components*i.byteLength;case no:return s*e/i.components*i.byteLength;case gc:return s*e*2/i.components*i.byteLength;case io:return s*e*2/i.components*i.byteLength;case pc:return s*e*3/i.components*i.byteLength;case Qt:return s*e*4/i.components*i.byteLength;case so:return s*e*4/i.components*i.byteLength;case Bs:case ks:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Fs:case Os:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ua:case pa:return Math.max(s,16)*Math.max(e,8)/4;case ha:case fa:return Math.max(s,8)*Math.max(e,8)/2;case ma:case ga:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Aa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case _a:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case va:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Sa:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Ma:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case ya:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case xa:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case ba:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Ea:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case wa:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Ca:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ra:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Pa:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Ia:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Da:case La:case Ua:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Na:case Ba:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ka:case Fa:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rh(s){switch(s){case dn:case cc:return{byteLength:1,components:1};case qi:case dc:case ts:return{byteLength:2,components:1};case eo:case to:return{byteLength:2,components:4};case ni:case Qa:case Mn:return{byteLength:4,components:1};case hc:case uc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Za}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Za);function Dc(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Ph(s){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var Ih=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dh=`#ifdef USE_ALPHAHASH
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
#endif`,Lh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kh=`#ifdef USE_AOMAP
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
#endif`,Fh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Oh=`#ifdef USE_BATCHING
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
#endif`,zh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wh=`#ifdef USE_IRIDESCENCE
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
#endif`,Xh=`#ifdef USE_BUMPMAP
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
#endif`,Yh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$h=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Qh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,eu=`#define PI 3.141592653589793
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
} // validated`,tu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,nu=`vec3 transformedNormal = objectNormal;
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
#endif`,iu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,su=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ru=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,au=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ou="gl_FragColor = linearToOutputTexel( gl_FragColor );",lu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cu=`#ifdef USE_ENVMAP
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
#endif`,du=`#ifdef USE_ENVMAP
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
#endif`,uu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fu=`#ifdef USE_ENVMAP
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
#endif`,pu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Au=`#ifdef USE_FOG
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yu=`uniform bool receiveShadow;
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
#endif`,xu=`#ifdef USE_ENVMAP
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
#endif`,bu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Eu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cu=`PhysicalMaterial material;
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
#endif`,Ru=`struct PhysicalMaterial {
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
}`,Pu=`
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
#endif`,Iu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Uu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ku=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ou=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zu=`#if defined( USE_POINTS_UV )
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
#endif`,Gu=`float metalnessFactor = metalness;
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
#endif`,Wu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yu=`#ifdef USE_MORPHTARGETS
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
#endif`,qu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ku=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ju=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$u=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ju=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qu=`#ifdef USE_NORMALMAP
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
#endif`,ef=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,af=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,of=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,df=`#ifdef DITHERING
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
#endif`,uf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ff=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gf=`float getShadowMask() {
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
}`,Af=`#ifdef USE_SKINNING
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
#endif`,yf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ef=`#ifdef USE_TRANSMISSION
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
#endif`,wf=`#ifdef USE_TRANSMISSION
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
#endif`,Tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const If=`varying vec2 vUv;
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
}`,Lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Nf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kf=`#include <common>
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
}`,Ff=`#if DEPTH_PACKING == 3200
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
}`,Of=`#define DISTANCE
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
}`,zf=`#define DISTANCE
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
}`,Gf=`varying vec3 vWorldDirection;
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
}`,Wf=`uniform vec3 diffuse;
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
}`,Xf=`#include <common>
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
}`,Yf=`uniform vec3 diffuse;
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
}`,qf=`#define LAMBERT
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
}`,Kf=`#define LAMBERT
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
}`,jf=`#define MATCAP
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
}`,$f=`#define MATCAP
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
}`,Zf=`#define NORMAL
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
}`,Jf=`#define NORMAL
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
}`,Qf=`#define PHONG
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
}`,ep=`#define PHONG
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
}`,tp=`#define STANDARD
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
}`,np=`#define STANDARD
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
}`,ip=`#define TOON
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
}`,sp=`#define TOON
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
}`,rp=`uniform float size;
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
}`,ap=`uniform vec3 diffuse;
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
}`,op=`#include <common>
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
}`,lp=`uniform vec3 color;
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
}`,cp=`uniform float rotation;
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
}`,dp=`uniform vec3 diffuse;
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
}`,ze={alphahash_fragment:Ih,alphahash_pars_fragment:Dh,alphamap_fragment:Lh,alphamap_pars_fragment:Uh,alphatest_fragment:Nh,alphatest_pars_fragment:Bh,aomap_fragment:kh,aomap_pars_fragment:Fh,batching_pars_vertex:Oh,batching_vertex:zh,begin_vertex:Gh,beginnormal_vertex:Hh,bsdfs:Vh,iridescence_fragment:Wh,bumpmap_pars_fragment:Xh,clipping_planes_fragment:Yh,clipping_planes_pars_fragment:qh,clipping_planes_pars_vertex:Kh,clipping_planes_vertex:jh,color_fragment:$h,color_pars_fragment:Zh,color_pars_vertex:Jh,color_vertex:Qh,common:eu,cube_uv_reflection_fragment:tu,defaultnormal_vertex:nu,displacementmap_pars_vertex:iu,displacementmap_vertex:su,emissivemap_fragment:ru,emissivemap_pars_fragment:au,colorspace_fragment:ou,colorspace_pars_fragment:lu,envmap_fragment:cu,envmap_common_pars_fragment:du,envmap_pars_fragment:hu,envmap_pars_vertex:uu,envmap_physical_pars_fragment:xu,envmap_vertex:fu,fog_vertex:pu,fog_pars_vertex:mu,fog_fragment:gu,fog_pars_fragment:Au,gradientmap_pars_fragment:_u,lightmap_pars_fragment:vu,lights_lambert_fragment:Su,lights_lambert_pars_fragment:Mu,lights_pars_begin:yu,lights_toon_fragment:bu,lights_toon_pars_fragment:Eu,lights_phong_fragment:wu,lights_phong_pars_fragment:Tu,lights_physical_fragment:Cu,lights_physical_pars_fragment:Ru,lights_fragment_begin:Pu,lights_fragment_maps:Iu,lights_fragment_end:Du,logdepthbuf_fragment:Lu,logdepthbuf_pars_fragment:Uu,logdepthbuf_pars_vertex:Nu,logdepthbuf_vertex:Bu,map_fragment:ku,map_pars_fragment:Fu,map_particle_fragment:Ou,map_particle_pars_fragment:zu,metalnessmap_fragment:Gu,metalnessmap_pars_fragment:Hu,morphinstance_vertex:Vu,morphcolor_vertex:Wu,morphnormal_vertex:Xu,morphtarget_pars_vertex:Yu,morphtarget_vertex:qu,normal_fragment_begin:Ku,normal_fragment_maps:ju,normal_pars_fragment:$u,normal_pars_vertex:Zu,normal_vertex:Ju,normalmap_pars_fragment:Qu,clearcoat_normal_fragment_begin:ef,clearcoat_normal_fragment_maps:tf,clearcoat_pars_fragment:nf,iridescence_pars_fragment:sf,opaque_fragment:rf,packing:af,premultiplied_alpha_fragment:of,project_vertex:lf,dithering_fragment:cf,dithering_pars_fragment:df,roughnessmap_fragment:hf,roughnessmap_pars_fragment:uf,shadowmap_pars_fragment:ff,shadowmap_pars_vertex:pf,shadowmap_vertex:mf,shadowmask_pars_fragment:gf,skinbase_vertex:Af,skinning_pars_vertex:_f,skinning_vertex:vf,skinnormal_vertex:Sf,specularmap_fragment:Mf,specularmap_pars_fragment:yf,tonemapping_fragment:xf,tonemapping_pars_fragment:bf,transmission_fragment:Ef,transmission_pars_fragment:wf,uv_pars_fragment:Tf,uv_pars_vertex:Cf,uv_vertex:Rf,worldpos_vertex:Pf,background_vert:If,background_frag:Df,backgroundCube_vert:Lf,backgroundCube_frag:Uf,cube_vert:Nf,cube_frag:Bf,depth_vert:kf,depth_frag:Ff,distanceRGBA_vert:Of,distanceRGBA_frag:zf,equirect_vert:Gf,equirect_frag:Hf,linedashed_vert:Vf,linedashed_frag:Wf,meshbasic_vert:Xf,meshbasic_frag:Yf,meshlambert_vert:qf,meshlambert_frag:Kf,meshmatcap_vert:jf,meshmatcap_frag:$f,meshnormal_vert:Zf,meshnormal_frag:Jf,meshphong_vert:Qf,meshphong_frag:ep,meshphysical_vert:tp,meshphysical_frag:np,meshtoon_vert:ip,meshtoon_frag:sp,points_vert:rp,points_frag:ap,shadow_vert:op,shadow_frag:lp,sprite_vert:cp,sprite_frag:dp},re={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},an={basic:{uniforms:Ct([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Ct([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Ne(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Ct([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Ct([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Ct([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Ne(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Ct([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Ct([re.points,re.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Ct([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Ct([re.common,re.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Ct([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Ct([re.sprite,re.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Ct([re.common,re.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Ct([re.lights,re.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};an.physical={uniforms:Ct([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const ws={r:0,b:0,g:0},qn=new tn,hp=new ct;function up(s,e,t,n,i,r,a){const o=new Ne(0);let l=r===!0?0:1,c,h,d=null,u=0,p=null;function g(b){let y=b.isScene===!0?b.background:null;return y&&y.isTexture&&(y=(b.backgroundBlurriness>0?t:e).get(y)),y}function _(b){let y=!1;const C=g(b);C===null?f(o,l):C&&C.isColor&&(f(C,1),y=!0);const w=s.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(b,y){const C=g(y);C&&(C.isCubeTexture||C.mapping===Js)?(h===void 0&&(h=new Mt(new Gt(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:Di(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,R,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),qn.copy(y.backgroundRotation),qn.x*=-1,qn.y*=-1,qn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(qn.y*=-1,qn.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(hp.makeRotationFromEuler(qn)),h.material.toneMapped=je.getTransfer(C.colorSpace)!==Je,(d!==C||u!==C.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,d=C,u=C.version,p=s.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Mt(new Qs(2,2),new xn({name:"BackgroundMaterial",uniforms:Di(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=je.getTransfer(C.colorSpace)!==Je,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||u!==C.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,d=C,u=C.version,p=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function f(b,y){b.getRGB(ws,Ec(s)),n.buffers.color.setClear(ws.r,ws.g,ws.b,y,a)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,y=1){o.set(b),l=y,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,f(o,l)},render:_,addToRenderList:m,dispose:E}}function fp(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,a=!1;function o(S,P,k,G,Y){let K=!1;const W=d(G,k,P);r!==W&&(r=W,c(r.object)),K=p(S,G,k,Y),K&&g(S,G,k,Y),Y!==null&&e.update(Y,s.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,y(S,P,k,G),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return s.createVertexArray()}function c(S){return s.bindVertexArray(S)}function h(S){return s.deleteVertexArray(S)}function d(S,P,k){const G=k.wireframe===!0;let Y=n[S.id];Y===void 0&&(Y={},n[S.id]=Y);let K=Y[P.id];K===void 0&&(K={},Y[P.id]=K);let W=K[G];return W===void 0&&(W=u(l()),K[G]=W),W}function u(S){const P=[],k=[],G=[];for(let Y=0;Y<t;Y++)P[Y]=0,k[Y]=0,G[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:k,attributeDivisors:G,object:S,attributes:{},index:null}}function p(S,P,k,G){const Y=r.attributes,K=P.attributes;let W=0;const Q=k.getAttributes();for(const z in Q)if(Q[z].location>=0){const ae=Y[z];let pe=K[z];if(pe===void 0&&(z==="instanceMatrix"&&S.instanceMatrix&&(pe=S.instanceMatrix),z==="instanceColor"&&S.instanceColor&&(pe=S.instanceColor)),ae===void 0||ae.attribute!==pe||pe&&ae.data!==pe.data)return!0;W++}return r.attributesNum!==W||r.index!==G}function g(S,P,k,G){const Y={},K=P.attributes;let W=0;const Q=k.getAttributes();for(const z in Q)if(Q[z].location>=0){let ae=K[z];ae===void 0&&(z==="instanceMatrix"&&S.instanceMatrix&&(ae=S.instanceMatrix),z==="instanceColor"&&S.instanceColor&&(ae=S.instanceColor));const pe={};pe.attribute=ae,ae&&ae.data&&(pe.data=ae.data),Y[z]=pe,W++}r.attributes=Y,r.attributesNum=W,r.index=G}function _(){const S=r.newAttributes;for(let P=0,k=S.length;P<k;P++)S[P]=0}function m(S){f(S,0)}function f(S,P){const k=r.newAttributes,G=r.enabledAttributes,Y=r.attributeDivisors;k[S]=1,G[S]===0&&(s.enableVertexAttribArray(S),G[S]=1),Y[S]!==P&&(s.vertexAttribDivisor(S,P),Y[S]=P)}function E(){const S=r.newAttributes,P=r.enabledAttributes;for(let k=0,G=P.length;k<G;k++)P[k]!==S[k]&&(s.disableVertexAttribArray(k),P[k]=0)}function b(S,P,k,G,Y,K,W){W===!0?s.vertexAttribIPointer(S,P,k,Y,K):s.vertexAttribPointer(S,P,k,G,Y,K)}function y(S,P,k,G){_();const Y=G.attributes,K=k.getAttributes(),W=P.defaultAttributeValues;for(const Q in K){const z=K[Q];if(z.location>=0){let ie=Y[Q];if(ie===void 0&&(Q==="instanceMatrix"&&S.instanceMatrix&&(ie=S.instanceMatrix),Q==="instanceColor"&&S.instanceColor&&(ie=S.instanceColor)),ie!==void 0){const ae=ie.normalized,pe=ie.itemSize,De=e.get(ie);if(De===void 0)continue;const qe=De.buffer,He=De.type,Fe=De.bytesPerElement,X=He===s.INT||He===s.UNSIGNED_INT||ie.gpuType===Qa;if(ie.isInterleavedBufferAttribute){const $=ie.data,ue=$.stride,Pe=ie.offset;if($.isInstancedInterleavedBuffer){for(let ye=0;ye<z.locationSize;ye++)f(z.location+ye,$.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ye=0;ye<z.locationSize;ye++)m(z.location+ye);s.bindBuffer(s.ARRAY_BUFFER,qe);for(let ye=0;ye<z.locationSize;ye++)b(z.location+ye,pe/z.locationSize,He,ae,ue*Fe,(Pe+pe/z.locationSize*ye)*Fe,X)}else{if(ie.isInstancedBufferAttribute){for(let $=0;$<z.locationSize;$++)f(z.location+$,ie.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let $=0;$<z.locationSize;$++)m(z.location+$);s.bindBuffer(s.ARRAY_BUFFER,qe);for(let $=0;$<z.locationSize;$++)b(z.location+$,pe/z.locationSize,He,ae,pe*Fe,pe/z.locationSize*$*Fe,X)}}else if(W!==void 0){const ae=W[Q];if(ae!==void 0)switch(ae.length){case 2:s.vertexAttrib2fv(z.location,ae);break;case 3:s.vertexAttrib3fv(z.location,ae);break;case 4:s.vertexAttrib4fv(z.location,ae);break;default:s.vertexAttrib1fv(z.location,ae)}}}}E()}function C(){U();for(const S in n){const P=n[S];for(const k in P){const G=P[k];for(const Y in G)h(G[Y].object),delete G[Y];delete P[k]}delete n[S]}}function w(S){if(n[S.id]===void 0)return;const P=n[S.id];for(const k in P){const G=P[k];for(const Y in G)h(G[Y].object),delete G[Y];delete P[k]}delete n[S.id]}function R(S){for(const P in n){const k=n[P];if(k[S.id]===void 0)continue;const G=k[S.id];for(const Y in G)h(G[Y].object),delete G[Y];delete k[S.id]}}function U(){M(),a=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:U,resetDefaultState:M,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function pp(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];t.update(p,n,1)}function l(c,h,d,u){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function mp(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==Qt&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const U=R===ts&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==dn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Mn&&!U)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),E=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:y,vertexTextures:C,maxSamples:w}}function gp(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new $n,o=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||i;return i=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const E=r?0:n,b=E*4;let y=f.clippingState||null;l.value=y,y=h(g,u,b,p);for(let C=0;C!==b;++C)y[C]=t[C];f.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,y=p;b!==_;++b,y+=4)a.copy(d[b]).applyMatrix4(E,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Ap(s){let e=new WeakMap;function t(a,o){return o===oa?a.mapping=Ri:o===la&&(a.mapping=Pi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===oa||o===la)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new _h(l.height);return c.fromEquirectangularTexture(s,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const yi=4,tl=[.125,.215,.35,.446,.526,.582],ei=20,Dr=new Pc,nl=new Ne;let Lr=null,Ur=0,Nr=0,Br=!1;const Zn=(1+Math.sqrt(5))/2,_i=1/Zn,il=[new B(-Zn,_i,0),new B(Zn,_i,0),new B(-_i,0,Zn),new B(_i,0,Zn),new B(0,Zn,-_i),new B(0,Zn,_i),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)],_p=new B;class sl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=_p}=r;Lr=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel(),Br=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ol(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=al(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Lr,Ur,Nr),this._renderer.xr.enabled=Br,e.scissorTest=!1,Ts(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ri||e.mapping===Pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lr=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel(),Br=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:ts,format:Qt,colorSpace:Ii,depthBuffer:!1},i=rl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=rl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vp(r)),this._blurMaterial=Sp(r,e,t)}return i}_compileMaterial(e){const t=new Mt(this._lodPlanes[0],e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,n,i,r){const l=new Rt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(nl),d.toneMapping=Bn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null));const _=new Ji({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1}),m=new Mt(new Gt,_);let f=!1;const E=e.background;E?E.isColor&&(_.color.copy(E),e.background=null,f=!0):(_.color.copy(nl),f=!0);for(let b=0;b<6;b++){const y=b%3;y===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):y===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));const C=this._cubeSize;Ts(i,y*C,b>2?C:0,C,C),d.setRenderTarget(i),f&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=u,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ri||e.mapping===Pi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ol()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=al());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Mt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ts(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Dr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=il[(i-r-1)%il.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Mt(this._lodPlanes[i],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ei-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ei;m>ei&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ei}`);const f=[];let E=0;for(let R=0;R<ei;++R){const U=R/_,M=Math.exp(-U*U/2);f.push(M),R===0?E+=M:R<m&&(E+=2*M)}for(let R=0;R<f.length;R++)f[R]=f[R]/E;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-n;const y=this._sizeLods[i],C=3*y*(i>b-yi?i-b+yi:0),w=4*(this._cubeSize-y);Ts(t,C,w,3*y,2*y),l.setRenderTarget(t),l.render(d,Dr)}}function vp(s){const e=[],t=[],n=[];let i=s;const r=s-yi+1+tl.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>s-yi?l=tl[a-s+yi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,_=3,m=2,f=1,E=new Float32Array(_*g*p),b=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let w=0;w<p;w++){const R=w%3*2/3-1,U=w>2?0:-1,M=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];E.set(M,_*g*w),b.set(u,m*g*w);const S=[w,w,w,w,w,w];y.set(S,f*g*w)}const C=new bn;C.setAttribute("position",new ln(E,_)),C.setAttribute("uv",new ln(b,m)),C.setAttribute("faceIndex",new ln(y,f)),e.push(C),i>yi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function rl(s,e,t){const n=new ii(s,e,t);return n.texture.mapping=Js,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ts(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Sp(s,e,t){const n=new Float32Array(ei),i=new B(0,1,0);return new xn({name:"SphericalGaussianBlur",defines:{n:ei,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:po(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function al(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:po(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function ol(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function po(){return`

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
	`}function Mp(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===oa||l===la,h=l===Ri||l===Pi;if(c||h){let d=e.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new sl(s)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&i(p)?(t===null&&(t=new sl(s)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function yp(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Zi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function xp(s,e,t,n){const i={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete i[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)e.update(u[p],s.ARRAY_BUFFER)}function c(d){const u=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const E=p.array;_=p.version;for(let b=0,y=E.length;b<y;b+=3){const C=E[b+0],w=E[b+1],R=E[b+2];u.push(C,w,w,R,R,C)}}else if(g!==void 0){const E=g.array;_=g.version;for(let b=0,y=E.length/3-1;b<y;b+=3){const C=b+0,w=b+1,R=b+2;u.push(C,w,w,R,R,C)}}else return;const m=new(vc(u)?bc:xc)(u,1);m.version=_;const f=r.get(d);f&&e.remove(f),r.set(d,m)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function bp(s,e,t){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,p){s.drawElements(n,p,r,u*a),t.update(p,n,1)}function c(u,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,u*a,g),t.update(p,n,g))}function h(u,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function d(u,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)c(u[f]/a,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,_,0,g);let f=0;for(let E=0;E<g;E++)f+=p[E]*_[E];t.update(f,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Ep(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function wp(s,e,t){const n=new WeakMap,i=new ot;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let M=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let b=0;p===!0&&(b=1),g===!0&&(b=2),_===!0&&(b=3);let y=o.attributes.position.count*b,C=1;y>e.maxTextureSize&&(C=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const w=new Float32Array(y*C*4*d),R=new Sc(w,y,C,d);R.type=Mn,R.needsUpdate=!0;const U=b*4;for(let S=0;S<d;S++){const P=m[S],k=f[S],G=E[S],Y=y*C*4*S;for(let K=0;K<P.count;K++){const W=K*U;p===!0&&(i.fromBufferAttribute(P,K),w[Y+W+0]=i.x,w[Y+W+1]=i.y,w[Y+W+2]=i.z,w[Y+W+3]=0),g===!0&&(i.fromBufferAttribute(k,K),w[Y+W+4]=i.x,w[Y+W+5]=i.y,w[Y+W+6]=i.z,w[Y+W+7]=0),_===!0&&(i.fromBufferAttribute(G,K),w[Y+W+8]=i.x,w[Y+W+9]=i.y,w[Y+W+10]=i.z,w[Y+W+11]=G.itemSize===4?i.w:1)}}u={count:d,texture:R,size:new Xe(y,C)},n.set(o,u),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Tp(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Lc=new Dt,ll=new Cc(1,1),Uc=new Sc,Nc=new eh,Bc=new oo,cl=[],dl=[],hl=new Float32Array(16),ul=new Float32Array(9),fl=new Float32Array(4);function Bi(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=cl[i];if(r===void 0&&(r=new Float32Array(i),cl[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function ft(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function pt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function tr(s,e){let t=dl[e];t===void 0&&(t=new Int32Array(e),dl[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Cp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Rp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2fv(this.addr,e),pt(t,e)}}function Pp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;s.uniform3fv(this.addr,e),pt(t,e)}}function Ip(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4fv(this.addr,e),pt(t,e)}}function Dp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;fl.set(n),s.uniformMatrix2fv(this.addr,!1,fl),pt(t,n)}}function Lp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;ul.set(n),s.uniformMatrix3fv(this.addr,!1,ul),pt(t,n)}}function Up(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;hl.set(n),s.uniformMatrix4fv(this.addr,!1,hl),pt(t,n)}}function Np(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Bp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2iv(this.addr,e),pt(t,e)}}function kp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;s.uniform3iv(this.addr,e),pt(t,e)}}function Fp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4iv(this.addr,e),pt(t,e)}}function Op(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function zp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2uiv(this.addr,e),pt(t,e)}}function Gp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;s.uniform3uiv(this.addr,e),pt(t,e)}}function Hp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4uiv(this.addr,e),pt(t,e)}}function Vp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(ll.compareFunction=_c,r=ll):r=Lc,t.setTexture2D(e||r,i)}function Wp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Nc,i)}function Xp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Bc,i)}function Yp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Uc,i)}function qp(s){switch(s){case 5126:return Cp;case 35664:return Rp;case 35665:return Pp;case 35666:return Ip;case 35674:return Dp;case 35675:return Lp;case 35676:return Up;case 5124:case 35670:return Np;case 35667:case 35671:return Bp;case 35668:case 35672:return kp;case 35669:case 35673:return Fp;case 5125:return Op;case 36294:return zp;case 36295:return Gp;case 36296:return Hp;case 35678:case 36198:case 36298:case 36306:case 35682:return Vp;case 35679:case 36299:case 36307:return Wp;case 35680:case 36300:case 36308:case 36293:return Xp;case 36289:case 36303:case 36311:case 36292:return Yp}}function Kp(s,e){s.uniform1fv(this.addr,e)}function jp(s,e){const t=Bi(e,this.size,2);s.uniform2fv(this.addr,t)}function $p(s,e){const t=Bi(e,this.size,3);s.uniform3fv(this.addr,t)}function Zp(s,e){const t=Bi(e,this.size,4);s.uniform4fv(this.addr,t)}function Jp(s,e){const t=Bi(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Qp(s,e){const t=Bi(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function em(s,e){const t=Bi(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function tm(s,e){s.uniform1iv(this.addr,e)}function nm(s,e){s.uniform2iv(this.addr,e)}function im(s,e){s.uniform3iv(this.addr,e)}function sm(s,e){s.uniform4iv(this.addr,e)}function rm(s,e){s.uniform1uiv(this.addr,e)}function am(s,e){s.uniform2uiv(this.addr,e)}function om(s,e){s.uniform3uiv(this.addr,e)}function lm(s,e){s.uniform4uiv(this.addr,e)}function cm(s,e,t){const n=this.cache,i=e.length,r=tr(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Lc,r[a])}function dm(s,e,t){const n=this.cache,i=e.length,r=tr(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Nc,r[a])}function hm(s,e,t){const n=this.cache,i=e.length,r=tr(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Bc,r[a])}function um(s,e,t){const n=this.cache,i=e.length,r=tr(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Uc,r[a])}function fm(s){switch(s){case 5126:return Kp;case 35664:return jp;case 35665:return $p;case 35666:return Zp;case 35674:return Jp;case 35675:return Qp;case 35676:return em;case 5124:case 35670:return tm;case 35667:case 35671:return nm;case 35668:case 35672:return im;case 35669:case 35673:return sm;case 5125:return rm;case 36294:return am;case 36295:return om;case 36296:return lm;case 35678:case 36198:case 36298:case 36306:case 35682:return cm;case 35679:case 36299:case 36307:return dm;case 35680:case 36300:case 36308:case 36293:return hm;case 36289:case 36303:case 36311:case 36292:return um}}class pm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=qp(t.type)}}class mm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fm(t.type)}}class gm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const kr=/(\w+)(\])?(\[|\.)?/g;function pl(s,e){s.seq.push(e),s.map[e.id]=e}function Am(s,e,t){const n=s.name,i=n.length;for(kr.lastIndex=0;;){const r=kr.exec(n),a=kr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){pl(t,c===void 0?new pm(o,s,e):new mm(o,s,e));break}else{let d=t.map[o];d===void 0&&(d=new gm(o),pl(t,d)),t=d}}}class zs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);Am(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function ml(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const _m=37297;let vm=0;function Sm(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const gl=new ke;function Mm(s){je._getMatrix(gl,je.workingColorSpace,s);const e=`mat3( ${gl.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(s)){case Xs:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Al(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Sm(s.getShaderSource(e),o)}else return r}function ym(s,e){const t=Mm(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function xm(s,e){let t;switch(e){case Rd:t="Linear";break;case Pd:t="Reinhard";break;case Id:t="Cineon";break;case oc:t="ACESFilmic";break;case Ld:t="AgX";break;case Ud:t="Neutral";break;case Dd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Cs=new B;function bm(){je.getLuminanceCoefficients(Cs);const s=Cs.x.toFixed(4),e=Cs.y.toFixed(4),t=Cs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Em(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xi).join(`
`)}function wm(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Tm(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Xi(s){return s!==""}function _l(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vl(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Cm=/^[ \t]*#include +<([\w\d./]+)>/gm;function za(s){return s.replace(Cm,Pm)}const Rm=new Map;function Pm(s,e){let t=ze[e];if(t===void 0){const n=Rm.get(e);if(n!==void 0)t=ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return za(t)}const Im=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sl(s){return s.replace(Im,Dm)}function Dm(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ml(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function Lm(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===rc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===ac?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===_n&&(e="SHADOWMAP_TYPE_VSM"),e}function Um(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ri:case Pi:e="ENVMAP_TYPE_CUBE";break;case Js:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Nm(s){let e="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===Pi&&(e="ENVMAP_MODE_REFRACTION"),e}function Bm(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ja:e="ENVMAP_BLENDING_MULTIPLY";break;case Td:e="ENVMAP_BLENDING_MIX";break;case Cd:e="ENVMAP_BLENDING_ADD";break}return e}function km(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Fm(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Lm(t),c=Um(t),h=Nm(t),d=Bm(t),u=km(t),p=Em(t),g=wm(r),_=i.createProgram();let m,f,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Xi).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Xi).join(`
`),f.length>0&&(f+=`
`)):(m=[Ml(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xi).join(`
`),f=[Ml(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?ze.tonemapping_pars_fragment:"",t.toneMapping!==Bn?xm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,ym("linearToOutputTexel",t.outputColorSpace),bm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xi).join(`
`)),a=za(a),a=_l(a,t),a=vl(a,t),o=za(o),o=_l(o,t),o=vl(o,t),a=Sl(a),o=Sl(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Uo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Uo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=E+m+a,y=E+f+o,C=ml(i,i.VERTEX_SHADER,b),w=ml(i,i.FRAGMENT_SHADER,y);i.attachShader(_,C),i.attachShader(_,w),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function R(P){if(s.debug.checkShaderErrors){const k=i.getProgramInfoLog(_)||"",G=i.getShaderInfoLog(C)||"",Y=i.getShaderInfoLog(w)||"",K=k.trim(),W=G.trim(),Q=Y.trim();let z=!0,ie=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,C,w);else{const ae=Al(i,C,"vertex"),pe=Al(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+K+`
`+ae+`
`+pe)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(W===""||Q==="")&&(ie=!1);ie&&(P.diagnostics={runnable:z,programLog:K,vertexShader:{log:W,prefix:m},fragmentShader:{log:Q,prefix:f}})}i.deleteShader(C),i.deleteShader(w),U=new zs(i,_),M=Tm(i,_)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(_,_m)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vm++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=w,this}let Om=0;class zm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Gm(e),t.set(e,n)),n}}class Gm{constructor(e){this.id=Om++,this.code=e,this.usedTimes=0}}function Hm(s,e,t,n,i,r,a){const o=new Mc,l=new zm,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,S,P,k,G){const Y=k.fog,K=G.geometry,W=M.isMeshStandardMaterial?k.environment:null,Q=(M.isMeshStandardMaterial?t:e).get(M.envMap||W),z=Q&&Q.mapping===Js?Q.image.height:null,ie=g[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const ae=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,pe=ae!==void 0?ae.length:0;let De=0;K.morphAttributes.position!==void 0&&(De=1),K.morphAttributes.normal!==void 0&&(De=2),K.morphAttributes.color!==void 0&&(De=3);let qe,He,Fe,X;if(ie){const $e=an[ie];qe=$e.vertexShader,He=$e.fragmentShader}else qe=M.vertexShader,He=M.fragmentShader,l.update(M),Fe=l.getVertexShaderID(M),X=l.getFragmentShaderID(M);const $=s.getRenderTarget(),ue=s.state.buffers.depth.getReversed(),Pe=G.isInstancedMesh===!0,ye=G.isBatchedMesh===!0,Ye=!!M.map,yt=!!M.matcap,T=!!Q,nt=!!M.aoMap,Ue=!!M.lightMap,Ce=!!M.bumpMap,ge=!!M.normalMap,it=!!M.displacementMap,Ae=!!M.emissiveMap,Oe=!!M.metalnessMap,mt=!!M.roughnessMap,lt=M.anisotropy>0,x=M.clearcoat>0,A=M.dispersion>0,N=M.iridescence>0,V=M.sheen>0,j=M.transmission>0,H=lt&&!!M.anisotropyMap,Me=x&&!!M.clearcoatMap,ne=x&&!!M.clearcoatNormalMap,_e=x&&!!M.clearcoatRoughnessMap,ve=N&&!!M.iridescenceMap,ee=N&&!!M.iridescenceThicknessMap,ce=V&&!!M.sheenColorMap,Te=V&&!!M.sheenRoughnessMap,Se=!!M.specularMap,oe=!!M.specularColorMap,Be=!!M.specularIntensityMap,I=j&&!!M.transmissionMap,te=j&&!!M.thicknessMap,se=!!M.gradientMap,he=!!M.alphaMap,Z=M.alphaTest>0,q=!!M.alphaHash,me=!!M.extensions;let Le=Bn;M.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Le=s.toneMapping);const et={shaderID:ie,shaderType:M.type,shaderName:M.name,vertexShader:qe,fragmentShader:He,defines:M.defines,customVertexShaderID:Fe,customFragmentShaderID:X,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:ye,batchingColor:ye&&G._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&G.instanceColor!==null,instancingMorph:Pe&&G.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:$===null?s.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Ii,alphaToCoverage:!!M.alphaToCoverage,map:Ye,matcap:yt,envMap:T,envMapMode:T&&Q.mapping,envMapCubeUVHeight:z,aoMap:nt,lightMap:Ue,bumpMap:Ce,normalMap:ge,displacementMap:u&&it,emissiveMap:Ae,normalMapObjectSpace:ge&&M.normalMapType===Fd,normalMapTangentSpace:ge&&M.normalMapType===Ac,metalnessMap:Oe,roughnessMap:mt,anisotropy:lt,anisotropyMap:H,clearcoat:x,clearcoatMap:Me,clearcoatNormalMap:ne,clearcoatRoughnessMap:_e,dispersion:A,iridescence:N,iridescenceMap:ve,iridescenceThicknessMap:ee,sheen:V,sheenColorMap:ce,sheenRoughnessMap:Te,specularMap:Se,specularColorMap:oe,specularIntensityMap:Be,transmission:j,transmissionMap:I,thicknessMap:te,gradientMap:se,opaque:M.transparent===!1&&M.blending===bi&&M.alphaToCoverage===!1,alphaMap:he,alphaTest:Z,alphaHash:q,combine:M.combine,mapUv:Ye&&_(M.map.channel),aoMapUv:nt&&_(M.aoMap.channel),lightMapUv:Ue&&_(M.lightMap.channel),bumpMapUv:Ce&&_(M.bumpMap.channel),normalMapUv:ge&&_(M.normalMap.channel),displacementMapUv:it&&_(M.displacementMap.channel),emissiveMapUv:Ae&&_(M.emissiveMap.channel),metalnessMapUv:Oe&&_(M.metalnessMap.channel),roughnessMapUv:mt&&_(M.roughnessMap.channel),anisotropyMapUv:H&&_(M.anisotropyMap.channel),clearcoatMapUv:Me&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:ne&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Te&&_(M.sheenRoughnessMap.channel),specularMapUv:Se&&_(M.specularMap.channel),specularColorMapUv:oe&&_(M.specularColorMap.channel),specularIntensityMapUv:Be&&_(M.specularIntensityMap.channel),transmissionMapUv:I&&_(M.transmissionMap.channel),thicknessMapUv:te&&_(M.thicknessMap.channel),alphaMapUv:he&&_(M.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(ge||lt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!K.attributes.uv&&(Ye||he),fog:!!Y,useFog:M.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ue,skinning:G.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:De,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Le,decodeVideoTexture:Ye&&M.map.isVideoTexture===!0&&je.getTransfer(M.map.colorSpace)===Je,decodeVideoTextureEmissive:Ae&&M.emissiveMap.isVideoTexture===!0&&je.getTransfer(M.emissiveMap.colorSpace)===Je,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===vn,flipSided:M.side===Pt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:me&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&M.extensions.multiDraw===!0||ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return et.vertexUv1s=c.has(1),et.vertexUv2s=c.has(2),et.vertexUv3s=c.has(3),c.clear(),et}function f(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)S.push(P),S.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(E(S,M),b(S,M),S.push(s.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function E(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function b(M,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),M.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),M.push(o.mask)}function y(M){const S=g[M.type];let P;if(S){const k=an[S];P=ph.clone(k.uniforms)}else P=M.uniforms;return P}function C(M,S){let P;for(let k=0,G=h.length;k<G;k++){const Y=h[k];if(Y.cacheKey===S){P=Y,++P.usedTimes;break}}return P===void 0&&(P=new Fm(s,S,M,r),h.push(P)),P}function w(M){if(--M.usedTimes===0){const S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),M.destroy()}}function R(M){l.remove(M)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:C,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:U}}function Vm(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Wm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function yl(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function xl(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(d,u,p,g,_,m){let f=s[e];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},s[e]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=m),e++,f}function o(d,u,p,g,_,m){const f=a(d,u,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):t.push(f)}function l(d,u,p,g,_,m){const f=a(d,u,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function c(d,u){t.length>1&&t.sort(d||Wm),n.length>1&&n.sort(u||yl),i.length>1&&i.sort(u||yl)}function h(){for(let d=e,u=s.length;d<u;d++){const p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function Xm(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new xl,s.set(n,[a])):i>=r.length?(a=new xl,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Ym(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Ne};break;case"SpotLight":t={position:new B,direction:new B,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new B,halfWidth:new B,halfHeight:new B};break}return s[e.id]=t,t}}}function qm(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Km=0;function jm(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function $m(s){const e=new Ym,t=qm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);const i=new B,r=new ct,a=new ct;function o(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,E=0,b=0,y=0,C=0,w=0,R=0;c.sort(jm);for(let M=0,S=c.length;M<S;M++){const P=c[M],k=P.color,G=P.intensity,Y=P.distance,K=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=k.r*G,d+=k.g*G,u+=k.b*G;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],G);R++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Q=P.shadow,z=t.get(P);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,n.directionalShadow[p]=z,n.directionalShadowMap[p]=K,n.directionalShadowMatrix[p]=P.shadow.matrix,E++}n.directional[p]=W,p++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(k).multiplyScalar(G),W.distance=Y,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[_]=W;const Q=P.shadow;if(P.map&&(n.spotLightMap[C]=P.map,C++,Q.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[_]=Q.matrix,P.castShadow){const z=t.get(P);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,n.spotShadow[_]=z,n.spotShadowMap[_]=K,y++}_++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(k).multiplyScalar(G),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=W,m++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const Q=P.shadow,z=t.get(P);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,z.shadowCameraNear=Q.camera.near,z.shadowCameraFar=Q.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=P.shadow.matrix,b++}n.point[g]=W,g++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(G),W.groundColor.copy(P.groundColor).multiplyScalar(G),n.hemi[f]=W,f++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const U=n.hash;(U.directionalLength!==p||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==f||U.numDirectionalShadows!==E||U.numPointShadows!==b||U.numSpotShadows!==y||U.numSpotMaps!==C||U.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=y+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,U.directionalLength=p,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=f,U.numDirectionalShadows=E,U.numPointShadows=b,U.numSpotShadows=y,U.numSpotMaps=C,U.numLightProbes=R,n.version=Km++)}function l(c,h){let d=0,u=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,E=c.length;f<E;f++){const b=c[f];if(b.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),d++}else if(b.isSpotLight){const y=n.spot[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),u++}else if(b.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function bl(s){const e=new $m(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Zm(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new bl(s),e.set(i,[o])):r>=a.length?(o=new bl(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Jm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qm=`uniform sampler2D shadow_pass;
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
}`;function eg(s,e,t){let n=new co;const i=new Xe,r=new Xe,a=new ot,o=new xh({depthPacking:kd}),l=new bh,c={},h=t.maxTextureSize,d={[cn]:Pt,[Pt]:cn,[vn]:vn},u=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:Jm,fragmentShader:Qm}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new bn;g.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Mt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rc;let f=this.type;this.render=function(w,R,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const M=s.getRenderTarget(),S=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Nn),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const G=f!==_n&&this.type===_n,Y=f===_n&&this.type!==_n;for(let K=0,W=w.length;K<W;K++){const Q=w[K],z=Q.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const ie=z.getFrameExtents();if(i.multiply(ie),r.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ie.x),i.x=r.x*ie.x,z.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ie.y),i.y=r.y*ie.y,z.mapSize.y=r.y)),z.map===null||G===!0||Y===!0){const pe=this.type!==_n?{minFilter:It,magFilter:It}:{};z.map!==null&&z.map.dispose(),z.map=new ii(i.x,i.y,pe),z.map.texture.name=Q.name+".shadowMap",z.camera.updateProjectionMatrix()}s.setRenderTarget(z.map),s.clear();const ae=z.getViewportCount();for(let pe=0;pe<ae;pe++){const De=z.getViewport(pe);a.set(r.x*De.x,r.y*De.y,r.x*De.z,r.y*De.w),k.viewport(a),z.updateMatrices(Q,pe),n=z.getFrustum(),y(R,U,z.camera,Q,this.type)}z.isPointLightShadow!==!0&&this.type===_n&&E(z,U),z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(M,S,P)};function E(w,R){const U=e.update(_);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ii(i.x,i.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(R,null,U,u,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(R,null,U,p,_,null)}function b(w,R,U,M){let S=null;const P=U.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)S=P;else if(S=U.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const k=S.uuid,G=R.uuid;let Y=c[k];Y===void 0&&(Y={},c[k]=Y);let K=Y[G];K===void 0&&(K=S.clone(),Y[G]=K,R.addEventListener("dispose",C)),S=K}if(S.visible=R.visible,S.wireframe=R.wireframe,M===_n?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:d[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,U.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const k=s.properties.get(S);k.light=U}return S}function y(w,R,U,M,S){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===_n)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,w.matrixWorld);const G=e.update(w),Y=w.material;if(Array.isArray(Y)){const K=G.groups;for(let W=0,Q=K.length;W<Q;W++){const z=K[W],ie=Y[z.materialIndex];if(ie&&ie.visible){const ae=b(w,ie,M,S);w.onBeforeShadow(s,w,R,U,G,ae,z),s.renderBufferDirect(U,null,G,ae,w,z),w.onAfterShadow(s,w,R,U,G,ae,z)}}}else if(Y.visible){const K=b(w,Y,M,S);w.onBeforeShadow(s,w,R,U,G,K,null),s.renderBufferDirect(U,null,G,K,w,null),w.onAfterShadow(s,w,R,U,G,K,null)}}const k=w.children;for(let G=0,Y=k.length;G<Y;G++)y(k[G],R,U,M,S)}function C(w){w.target.removeEventListener("dispose",C);for(const U in c){const M=c[U],S=w.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const tg={[ea]:ta,[na]:ra,[ia]:aa,[Ci]:sa,[ta]:ea,[ra]:na,[aa]:ia,[sa]:Ci};function ng(s,e){function t(){let I=!1;const te=new ot;let se=null;const he=new ot(0,0,0,0);return{setMask:function(Z){se!==Z&&!I&&(s.colorMask(Z,Z,Z,Z),se=Z)},setLocked:function(Z){I=Z},setClear:function(Z,q,me,Le,et){et===!0&&(Z*=Le,q*=Le,me*=Le),te.set(Z,q,me,Le),he.equals(te)===!1&&(s.clearColor(Z,q,me,Le),he.copy(te))},reset:function(){I=!1,se=null,he.set(-1,0,0,0)}}}function n(){let I=!1,te=!1,se=null,he=null,Z=null;return{setReversed:function(q){if(te!==q){const me=e.get("EXT_clip_control");q?me.clipControlEXT(me.LOWER_LEFT_EXT,me.ZERO_TO_ONE_EXT):me.clipControlEXT(me.LOWER_LEFT_EXT,me.NEGATIVE_ONE_TO_ONE_EXT),te=q;const Le=Z;Z=null,this.setClear(Le)}},getReversed:function(){return te},setTest:function(q){q?$(s.DEPTH_TEST):ue(s.DEPTH_TEST)},setMask:function(q){se!==q&&!I&&(s.depthMask(q),se=q)},setFunc:function(q){if(te&&(q=tg[q]),he!==q){switch(q){case ea:s.depthFunc(s.NEVER);break;case ta:s.depthFunc(s.ALWAYS);break;case na:s.depthFunc(s.LESS);break;case Ci:s.depthFunc(s.LEQUAL);break;case ia:s.depthFunc(s.EQUAL);break;case sa:s.depthFunc(s.GEQUAL);break;case ra:s.depthFunc(s.GREATER);break;case aa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}he=q}},setLocked:function(q){I=q},setClear:function(q){Z!==q&&(te&&(q=1-q),s.clearDepth(q),Z=q)},reset:function(){I=!1,se=null,he=null,Z=null,te=!1}}}function i(){let I=!1,te=null,se=null,he=null,Z=null,q=null,me=null,Le=null,et=null;return{setTest:function($e){I||($e?$(s.STENCIL_TEST):ue(s.STENCIL_TEST))},setMask:function($e){te!==$e&&!I&&(s.stencilMask($e),te=$e)},setFunc:function($e,hn,nn){(se!==$e||he!==hn||Z!==nn)&&(s.stencilFunc($e,hn,nn),se=$e,he=hn,Z=nn)},setOp:function($e,hn,nn){(q!==$e||me!==hn||Le!==nn)&&(s.stencilOp($e,hn,nn),q=$e,me=hn,Le=nn)},setLocked:function($e){I=$e},setClear:function($e){et!==$e&&(s.clearStencil($e),et=$e)},reset:function(){I=!1,te=null,se=null,he=null,Z=null,q=null,me=null,Le=null,et=null}}}const r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,p=[],g=null,_=!1,m=null,f=null,E=null,b=null,y=null,C=null,w=null,R=new Ne(0,0,0),U=0,M=!1,S=null,P=null,k=null,G=null,Y=null;const K=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Q=0;const z=s.getParameter(s.VERSION);z.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(z)[1]),W=Q>=1):z.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),W=Q>=2);let ie=null,ae={};const pe=s.getParameter(s.SCISSOR_BOX),De=s.getParameter(s.VIEWPORT),qe=new ot().fromArray(pe),He=new ot().fromArray(De);function Fe(I,te,se,he){const Z=new Uint8Array(4),q=s.createTexture();s.bindTexture(I,q),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let me=0;me<se;me++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(te,0,s.RGBA,1,1,he,0,s.RGBA,s.UNSIGNED_BYTE,Z):s.texImage2D(te+me,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Z);return q}const X={};X[s.TEXTURE_2D]=Fe(s.TEXTURE_2D,s.TEXTURE_2D,1),X[s.TEXTURE_CUBE_MAP]=Fe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[s.TEXTURE_2D_ARRAY]=Fe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),X[s.TEXTURE_3D]=Fe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(s.DEPTH_TEST),a.setFunc(Ci),Ce(!1),ge(Co),$(s.CULL_FACE),nt(Nn);function $(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function ue(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function Pe(I,te){return d[I]!==te?(s.bindFramebuffer(I,te),d[I]=te,I===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=te),I===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=te),!0):!1}function ye(I,te){let se=p,he=!1;if(I){se=u.get(te),se===void 0&&(se=[],u.set(te,se));const Z=I.textures;if(se.length!==Z.length||se[0]!==s.COLOR_ATTACHMENT0){for(let q=0,me=Z.length;q<me;q++)se[q]=s.COLOR_ATTACHMENT0+q;se.length=Z.length,he=!0}}else se[0]!==s.BACK&&(se[0]=s.BACK,he=!0);he&&s.drawBuffers(se)}function Ye(I){return g!==I?(s.useProgram(I),g=I,!0):!1}const yt={[Qn]:s.FUNC_ADD,[dd]:s.FUNC_SUBTRACT,[hd]:s.FUNC_REVERSE_SUBTRACT};yt[ud]=s.MIN,yt[fd]=s.MAX;const T={[pd]:s.ZERO,[md]:s.ONE,[gd]:s.SRC_COLOR,[Jr]:s.SRC_ALPHA,[yd]:s.SRC_ALPHA_SATURATE,[Sd]:s.DST_COLOR,[_d]:s.DST_ALPHA,[Ad]:s.ONE_MINUS_SRC_COLOR,[Qr]:s.ONE_MINUS_SRC_ALPHA,[Md]:s.ONE_MINUS_DST_COLOR,[vd]:s.ONE_MINUS_DST_ALPHA,[xd]:s.CONSTANT_COLOR,[bd]:s.ONE_MINUS_CONSTANT_COLOR,[Ed]:s.CONSTANT_ALPHA,[wd]:s.ONE_MINUS_CONSTANT_ALPHA};function nt(I,te,se,he,Z,q,me,Le,et,$e){if(I===Nn){_===!0&&(ue(s.BLEND),_=!1);return}if(_===!1&&($(s.BLEND),_=!0),I!==cd){if(I!==m||$e!==M){if((f!==Qn||y!==Qn)&&(s.blendEquation(s.FUNC_ADD),f=Qn,y=Qn),$e)switch(I){case bi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ro:s.blendFunc(s.ONE,s.ONE);break;case Po:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Io:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case bi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ro:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Po:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Io:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}E=null,b=null,C=null,w=null,R.set(0,0,0),U=0,m=I,M=$e}return}Z=Z||te,q=q||se,me=me||he,(te!==f||Z!==y)&&(s.blendEquationSeparate(yt[te],yt[Z]),f=te,y=Z),(se!==E||he!==b||q!==C||me!==w)&&(s.blendFuncSeparate(T[se],T[he],T[q],T[me]),E=se,b=he,C=q,w=me),(Le.equals(R)===!1||et!==U)&&(s.blendColor(Le.r,Le.g,Le.b,et),R.copy(Le),U=et),m=I,M=!1}function Ue(I,te){I.side===vn?ue(s.CULL_FACE):$(s.CULL_FACE);let se=I.side===Pt;te&&(se=!se),Ce(se),I.blending===bi&&I.transparent===!1?nt(Nn):nt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const he=I.stencilWrite;o.setTest(he),he&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Ae(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?$(s.SAMPLE_ALPHA_TO_COVERAGE):ue(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(I){S!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),S=I)}function ge(I){I!==od?($(s.CULL_FACE),I!==P&&(I===Co?s.cullFace(s.BACK):I===ld?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ue(s.CULL_FACE),P=I}function it(I){I!==k&&(W&&s.lineWidth(I),k=I)}function Ae(I,te,se){I?($(s.POLYGON_OFFSET_FILL),(G!==te||Y!==se)&&(s.polygonOffset(te,se),G=te,Y=se)):ue(s.POLYGON_OFFSET_FILL)}function Oe(I){I?$(s.SCISSOR_TEST):ue(s.SCISSOR_TEST)}function mt(I){I===void 0&&(I=s.TEXTURE0+K-1),ie!==I&&(s.activeTexture(I),ie=I)}function lt(I,te,se){se===void 0&&(ie===null?se=s.TEXTURE0+K-1:se=ie);let he=ae[se];he===void 0&&(he={type:void 0,texture:void 0},ae[se]=he),(he.type!==I||he.texture!==te)&&(ie!==se&&(s.activeTexture(se),ie=se),s.bindTexture(I,te||X[I]),he.type=I,he.texture=te)}function x(){const I=ae[ie];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function A(){try{s.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function N(){try{s.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function V(){try{s.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{s.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function H(){try{s.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Me(){try{s.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{s.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _e(){try{s.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ve(){try{s.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ee(){try{s.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ce(I){qe.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),qe.copy(I))}function Te(I){He.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),He.copy(I))}function Se(I,te){let se=c.get(te);se===void 0&&(se=new WeakMap,c.set(te,se));let he=se.get(I);he===void 0&&(he=s.getUniformBlockIndex(te,I.name),se.set(I,he))}function oe(I,te){const he=c.get(te).get(I);l.get(te)!==he&&(s.uniformBlockBinding(te,he,I.__bindingPointIndex),l.set(te,he))}function Be(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ie=null,ae={},d={},u=new WeakMap,p=[],g=null,_=!1,m=null,f=null,E=null,b=null,y=null,C=null,w=null,R=new Ne(0,0,0),U=0,M=!1,S=null,P=null,k=null,G=null,Y=null,qe.set(0,0,s.canvas.width,s.canvas.height),He.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:$,disable:ue,bindFramebuffer:Pe,drawBuffers:ye,useProgram:Ye,setBlending:nt,setMaterial:Ue,setFlipSided:Ce,setCullFace:ge,setLineWidth:it,setPolygonOffset:Ae,setScissorTest:Oe,activeTexture:mt,bindTexture:lt,unbindTexture:x,compressedTexImage2D:A,compressedTexImage3D:N,texImage2D:ve,texImage3D:ee,updateUBOMapping:Se,uniformBlockBinding:oe,texStorage2D:ne,texStorage3D:_e,texSubImage2D:V,texSubImage3D:j,compressedTexSubImage2D:H,compressedTexSubImage3D:Me,scissor:ce,viewport:Te,reset:Be}}function ig(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Xe,h=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,A){return p?new OffscreenCanvas(x,A):qs("canvas")}function _(x,A,N){let V=1;const j=lt(x);if((j.width>N||j.height>N)&&(V=N/Math.max(j.width,j.height)),V<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const H=Math.floor(V*j.width),Me=Math.floor(V*j.height);d===void 0&&(d=g(H,Me));const ne=A?g(H,Me):d;return ne.width=H,ne.height=Me,ne.getContext("2d").drawImage(x,0,0,H,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+H+"x"+Me+")."),ne}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),x;return x}function m(x){return x.generateMipmaps}function f(x){s.generateMipmap(x)}function E(x){return x.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?s.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(x,A,N,V,j=!1){if(x!==null){if(s[x]!==void 0)return s[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let H=A;if(A===s.RED&&(N===s.FLOAT&&(H=s.R32F),N===s.HALF_FLOAT&&(H=s.R16F),N===s.UNSIGNED_BYTE&&(H=s.R8)),A===s.RED_INTEGER&&(N===s.UNSIGNED_BYTE&&(H=s.R8UI),N===s.UNSIGNED_SHORT&&(H=s.R16UI),N===s.UNSIGNED_INT&&(H=s.R32UI),N===s.BYTE&&(H=s.R8I),N===s.SHORT&&(H=s.R16I),N===s.INT&&(H=s.R32I)),A===s.RG&&(N===s.FLOAT&&(H=s.RG32F),N===s.HALF_FLOAT&&(H=s.RG16F),N===s.UNSIGNED_BYTE&&(H=s.RG8)),A===s.RG_INTEGER&&(N===s.UNSIGNED_BYTE&&(H=s.RG8UI),N===s.UNSIGNED_SHORT&&(H=s.RG16UI),N===s.UNSIGNED_INT&&(H=s.RG32UI),N===s.BYTE&&(H=s.RG8I),N===s.SHORT&&(H=s.RG16I),N===s.INT&&(H=s.RG32I)),A===s.RGB_INTEGER&&(N===s.UNSIGNED_BYTE&&(H=s.RGB8UI),N===s.UNSIGNED_SHORT&&(H=s.RGB16UI),N===s.UNSIGNED_INT&&(H=s.RGB32UI),N===s.BYTE&&(H=s.RGB8I),N===s.SHORT&&(H=s.RGB16I),N===s.INT&&(H=s.RGB32I)),A===s.RGBA_INTEGER&&(N===s.UNSIGNED_BYTE&&(H=s.RGBA8UI),N===s.UNSIGNED_SHORT&&(H=s.RGBA16UI),N===s.UNSIGNED_INT&&(H=s.RGBA32UI),N===s.BYTE&&(H=s.RGBA8I),N===s.SHORT&&(H=s.RGBA16I),N===s.INT&&(H=s.RGBA32I)),A===s.RGB&&(N===s.UNSIGNED_INT_5_9_9_9_REV&&(H=s.RGB9_E5),N===s.UNSIGNED_INT_10F_11F_11F_REV&&(H=s.R11F_G11F_B10F)),A===s.RGBA){const Me=j?Xs:je.getTransfer(V);N===s.FLOAT&&(H=s.RGBA32F),N===s.HALF_FLOAT&&(H=s.RGBA16F),N===s.UNSIGNED_BYTE&&(H=Me===Je?s.SRGB8_ALPHA8:s.RGBA8),N===s.UNSIGNED_SHORT_4_4_4_4&&(H=s.RGBA4),N===s.UNSIGNED_SHORT_5_5_5_1&&(H=s.RGB5_A1)}return(H===s.R16F||H===s.R32F||H===s.RG16F||H===s.RG32F||H===s.RGBA16F||H===s.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function y(x,A){let N;return x?A===null||A===ni||A===Ki?N=s.DEPTH24_STENCIL8:A===Mn?N=s.DEPTH32F_STENCIL8:A===qi&&(N=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===ni||A===Ki?N=s.DEPTH_COMPONENT24:A===Mn?N=s.DEPTH_COMPONENT32F:A===qi&&(N=s.DEPTH_COMPONENT16),N}function C(x,A){return m(x)===!0||x.isFramebufferTexture&&x.minFilter!==It&&x.minFilter!==Jt?Math.log2(Math.max(A.width,A.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?A.mipmaps.length:1}function w(x){const A=x.target;A.removeEventListener("dispose",w),U(A),A.isVideoTexture&&h.delete(A)}function R(x){const A=x.target;A.removeEventListener("dispose",R),S(A)}function U(x){const A=n.get(x);if(A.__webglInit===void 0)return;const N=x.source,V=u.get(N);if(V){const j=V[A.__cacheKey];j.usedTimes--,j.usedTimes===0&&M(x),Object.keys(V).length===0&&u.delete(N)}n.remove(x)}function M(x){const A=n.get(x);s.deleteTexture(A.__webglTexture);const N=x.source,V=u.get(N);delete V[A.__cacheKey],a.memory.textures--}function S(x){const A=n.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),n.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(A.__webglFramebuffer[V]))for(let j=0;j<A.__webglFramebuffer[V].length;j++)s.deleteFramebuffer(A.__webglFramebuffer[V][j]);else s.deleteFramebuffer(A.__webglFramebuffer[V]);A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer[V])}else{if(Array.isArray(A.__webglFramebuffer))for(let V=0;V<A.__webglFramebuffer.length;V++)s.deleteFramebuffer(A.__webglFramebuffer[V]);else s.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&s.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let V=0;V<A.__webglColorRenderbuffer.length;V++)A.__webglColorRenderbuffer[V]&&s.deleteRenderbuffer(A.__webglColorRenderbuffer[V]);A.__webglDepthRenderbuffer&&s.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const N=x.textures;for(let V=0,j=N.length;V<j;V++){const H=n.get(N[V]);H.__webglTexture&&(s.deleteTexture(H.__webglTexture),a.memory.textures--),n.remove(N[V])}n.remove(x)}let P=0;function k(){P=0}function G(){const x=P;return x>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+i.maxTextures),P+=1,x}function Y(x){const A=[];return A.push(x.wrapS),A.push(x.wrapT),A.push(x.wrapR||0),A.push(x.magFilter),A.push(x.minFilter),A.push(x.anisotropy),A.push(x.internalFormat),A.push(x.format),A.push(x.type),A.push(x.generateMipmaps),A.push(x.premultiplyAlpha),A.push(x.flipY),A.push(x.unpackAlignment),A.push(x.colorSpace),A.join()}function K(x,A){const N=n.get(x);if(x.isVideoTexture&&Oe(x),x.isRenderTargetTexture===!1&&x.isExternalTexture!==!0&&x.version>0&&N.__version!==x.version){const V=x.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(N,x,A);return}}else x.isExternalTexture&&(N.__webglTexture=x.sourceTexture?x.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,N.__webglTexture,s.TEXTURE0+A)}function W(x,A){const N=n.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&N.__version!==x.version){X(N,x,A);return}t.bindTexture(s.TEXTURE_2D_ARRAY,N.__webglTexture,s.TEXTURE0+A)}function Q(x,A){const N=n.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&N.__version!==x.version){X(N,x,A);return}t.bindTexture(s.TEXTURE_3D,N.__webglTexture,s.TEXTURE0+A)}function z(x,A){const N=n.get(x);if(x.version>0&&N.__version!==x.version){$(N,x,A);return}t.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+A)}const ie={[ca]:s.REPEAT,[Sn]:s.CLAMP_TO_EDGE,[da]:s.MIRRORED_REPEAT},ae={[It]:s.NEAREST,[Nd]:s.NEAREST_MIPMAP_NEAREST,[ls]:s.NEAREST_MIPMAP_LINEAR,[Jt]:s.LINEAR,[ar]:s.LINEAR_MIPMAP_NEAREST,[Un]:s.LINEAR_MIPMAP_LINEAR},pe={[Od]:s.NEVER,[Xd]:s.ALWAYS,[zd]:s.LESS,[_c]:s.LEQUAL,[Gd]:s.EQUAL,[Wd]:s.GEQUAL,[Hd]:s.GREATER,[Vd]:s.NOTEQUAL};function De(x,A){if(A.type===Mn&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===Jt||A.magFilter===ar||A.magFilter===ls||A.magFilter===Un||A.minFilter===Jt||A.minFilter===ar||A.minFilter===ls||A.minFilter===Un)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(x,s.TEXTURE_WRAP_S,ie[A.wrapS]),s.texParameteri(x,s.TEXTURE_WRAP_T,ie[A.wrapT]),(x===s.TEXTURE_3D||x===s.TEXTURE_2D_ARRAY)&&s.texParameteri(x,s.TEXTURE_WRAP_R,ie[A.wrapR]),s.texParameteri(x,s.TEXTURE_MAG_FILTER,ae[A.magFilter]),s.texParameteri(x,s.TEXTURE_MIN_FILTER,ae[A.minFilter]),A.compareFunction&&(s.texParameteri(x,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(x,s.TEXTURE_COMPARE_FUNC,pe[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===It||A.minFilter!==ls&&A.minFilter!==Un||A.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");s.texParameterf(x,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function qe(x,A){let N=!1;x.__webglInit===void 0&&(x.__webglInit=!0,A.addEventListener("dispose",w));const V=A.source;let j=u.get(V);j===void 0&&(j={},u.set(V,j));const H=Y(A);if(H!==x.__cacheKey){j[H]===void 0&&(j[H]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,N=!0),j[H].usedTimes++;const Me=j[x.__cacheKey];Me!==void 0&&(j[x.__cacheKey].usedTimes--,Me.usedTimes===0&&M(A)),x.__cacheKey=H,x.__webglTexture=j[H].texture}return N}function He(x,A,N){return Math.floor(Math.floor(x/N)/A)}function Fe(x,A,N,V){const H=x.updateRanges;if(H.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,A.width,A.height,N,V,A.data);else{H.sort((ee,ce)=>ee.start-ce.start);let Me=0;for(let ee=1;ee<H.length;ee++){const ce=H[Me],Te=H[ee],Se=ce.start+ce.count,oe=He(Te.start,A.width,4),Be=He(ce.start,A.width,4);Te.start<=Se+1&&oe===Be&&He(Te.start+Te.count-1,A.width,4)===oe?ce.count=Math.max(ce.count,Te.start+Te.count-ce.start):(++Me,H[Me]=Te)}H.length=Me+1;const ne=s.getParameter(s.UNPACK_ROW_LENGTH),_e=s.getParameter(s.UNPACK_SKIP_PIXELS),ve=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,A.width);for(let ee=0,ce=H.length;ee<ce;ee++){const Te=H[ee],Se=Math.floor(Te.start/4),oe=Math.ceil(Te.count/4),Be=Se%A.width,I=Math.floor(Se/A.width),te=oe,se=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Be),s.pixelStorei(s.UNPACK_SKIP_ROWS,I),t.texSubImage2D(s.TEXTURE_2D,0,Be,I,te,se,N,V,A.data)}x.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,ne),s.pixelStorei(s.UNPACK_SKIP_PIXELS,_e),s.pixelStorei(s.UNPACK_SKIP_ROWS,ve)}}function X(x,A,N){let V=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(V=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(V=s.TEXTURE_3D);const j=qe(x,A),H=A.source;t.bindTexture(V,x.__webglTexture,s.TEXTURE0+N);const Me=n.get(H);if(H.version!==Me.__version||j===!0){t.activeTexture(s.TEXTURE0+N);const ne=je.getPrimaries(je.workingColorSpace),_e=A.colorSpace===Ln?null:je.getPrimaries(A.colorSpace),ve=A.colorSpace===Ln||ne===_e?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let ee=_(A.image,!1,i.maxTextureSize);ee=mt(A,ee);const ce=r.convert(A.format,A.colorSpace),Te=r.convert(A.type);let Se=b(A.internalFormat,ce,Te,A.colorSpace,A.isVideoTexture);De(V,A);let oe;const Be=A.mipmaps,I=A.isVideoTexture!==!0,te=Me.__version===void 0||j===!0,se=H.dataReady,he=C(A,ee);if(A.isDepthTexture)Se=y(A.format===$i,A.type),te&&(I?t.texStorage2D(s.TEXTURE_2D,1,Se,ee.width,ee.height):t.texImage2D(s.TEXTURE_2D,0,Se,ee.width,ee.height,0,ce,Te,null));else if(A.isDataTexture)if(Be.length>0){I&&te&&t.texStorage2D(s.TEXTURE_2D,he,Se,Be[0].width,Be[0].height);for(let Z=0,q=Be.length;Z<q;Z++)oe=Be[Z],I?se&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,oe.width,oe.height,ce,Te,oe.data):t.texImage2D(s.TEXTURE_2D,Z,Se,oe.width,oe.height,0,ce,Te,oe.data);A.generateMipmaps=!1}else I?(te&&t.texStorage2D(s.TEXTURE_2D,he,Se,ee.width,ee.height),se&&Fe(A,ee,ce,Te)):t.texImage2D(s.TEXTURE_2D,0,Se,ee.width,ee.height,0,ce,Te,ee.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){I&&te&&t.texStorage3D(s.TEXTURE_2D_ARRAY,he,Se,Be[0].width,Be[0].height,ee.depth);for(let Z=0,q=Be.length;Z<q;Z++)if(oe=Be[Z],A.format!==Qt)if(ce!==null)if(I){if(se)if(A.layerUpdates.size>0){const me=el(oe.width,oe.height,A.format,A.type);for(const Le of A.layerUpdates){const et=oe.data.subarray(Le*me/oe.data.BYTES_PER_ELEMENT,(Le+1)*me/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,Le,oe.width,oe.height,1,ce,et)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,oe.width,oe.height,ee.depth,ce,oe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Z,Se,oe.width,oe.height,ee.depth,0,oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?se&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,oe.width,oe.height,ee.depth,ce,Te,oe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Z,Se,oe.width,oe.height,ee.depth,0,ce,Te,oe.data)}else{I&&te&&t.texStorage2D(s.TEXTURE_2D,he,Se,Be[0].width,Be[0].height);for(let Z=0,q=Be.length;Z<q;Z++)oe=Be[Z],A.format!==Qt?ce!==null?I?se&&t.compressedTexSubImage2D(s.TEXTURE_2D,Z,0,0,oe.width,oe.height,ce,oe.data):t.compressedTexImage2D(s.TEXTURE_2D,Z,Se,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?se&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,oe.width,oe.height,ce,Te,oe.data):t.texImage2D(s.TEXTURE_2D,Z,Se,oe.width,oe.height,0,ce,Te,oe.data)}else if(A.isDataArrayTexture)if(I){if(te&&t.texStorage3D(s.TEXTURE_2D_ARRAY,he,Se,ee.width,ee.height,ee.depth),se)if(A.layerUpdates.size>0){const Z=el(ee.width,ee.height,A.format,A.type);for(const q of A.layerUpdates){const me=ee.data.subarray(q*Z/ee.data.BYTES_PER_ELEMENT,(q+1)*Z/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,q,ee.width,ee.height,1,ce,Te,me)}A.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ce,Te,ee.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Se,ee.width,ee.height,ee.depth,0,ce,Te,ee.data);else if(A.isData3DTexture)I?(te&&t.texStorage3D(s.TEXTURE_3D,he,Se,ee.width,ee.height,ee.depth),se&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ce,Te,ee.data)):t.texImage3D(s.TEXTURE_3D,0,Se,ee.width,ee.height,ee.depth,0,ce,Te,ee.data);else if(A.isFramebufferTexture){if(te)if(I)t.texStorage2D(s.TEXTURE_2D,he,Se,ee.width,ee.height);else{let Z=ee.width,q=ee.height;for(let me=0;me<he;me++)t.texImage2D(s.TEXTURE_2D,me,Se,Z,q,0,ce,Te,null),Z>>=1,q>>=1}}else if(Be.length>0){if(I&&te){const Z=lt(Be[0]);t.texStorage2D(s.TEXTURE_2D,he,Se,Z.width,Z.height)}for(let Z=0,q=Be.length;Z<q;Z++)oe=Be[Z],I?se&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,ce,Te,oe):t.texImage2D(s.TEXTURE_2D,Z,Se,ce,Te,oe);A.generateMipmaps=!1}else if(I){if(te){const Z=lt(ee);t.texStorage2D(s.TEXTURE_2D,he,Se,Z.width,Z.height)}se&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ce,Te,ee)}else t.texImage2D(s.TEXTURE_2D,0,Se,ce,Te,ee);m(A)&&f(V),Me.__version=H.version,A.onUpdate&&A.onUpdate(A)}x.__version=A.version}function $(x,A,N){if(A.image.length!==6)return;const V=qe(x,A),j=A.source;t.bindTexture(s.TEXTURE_CUBE_MAP,x.__webglTexture,s.TEXTURE0+N);const H=n.get(j);if(j.version!==H.__version||V===!0){t.activeTexture(s.TEXTURE0+N);const Me=je.getPrimaries(je.workingColorSpace),ne=A.colorSpace===Ln?null:je.getPrimaries(A.colorSpace),_e=A.colorSpace===Ln||Me===ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const ve=A.isCompressedTexture||A.image[0].isCompressedTexture,ee=A.image[0]&&A.image[0].isDataTexture,ce=[];for(let q=0;q<6;q++)!ve&&!ee?ce[q]=_(A.image[q],!0,i.maxCubemapSize):ce[q]=ee?A.image[q].image:A.image[q],ce[q]=mt(A,ce[q]);const Te=ce[0],Se=r.convert(A.format,A.colorSpace),oe=r.convert(A.type),Be=b(A.internalFormat,Se,oe,A.colorSpace),I=A.isVideoTexture!==!0,te=H.__version===void 0||V===!0,se=j.dataReady;let he=C(A,Te);De(s.TEXTURE_CUBE_MAP,A);let Z;if(ve){I&&te&&t.texStorage2D(s.TEXTURE_CUBE_MAP,he,Be,Te.width,Te.height);for(let q=0;q<6;q++){Z=ce[q].mipmaps;for(let me=0;me<Z.length;me++){const Le=Z[me];A.format!==Qt?Se!==null?I?se&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,0,0,Le.width,Le.height,Se,Le.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,Be,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,0,0,Le.width,Le.height,Se,oe,Le.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,Be,Le.width,Le.height,0,Se,oe,Le.data)}}}else{if(Z=A.mipmaps,I&&te){Z.length>0&&he++;const q=lt(ce[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,he,Be,q.width,q.height)}for(let q=0;q<6;q++)if(ee){I?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ce[q].width,ce[q].height,Se,oe,ce[q].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Be,ce[q].width,ce[q].height,0,Se,oe,ce[q].data);for(let me=0;me<Z.length;me++){const et=Z[me].image[q].image;I?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,0,0,et.width,et.height,Se,oe,et.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,Be,et.width,et.height,0,Se,oe,et.data)}}else{I?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Se,oe,ce[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Be,Se,oe,ce[q]);for(let me=0;me<Z.length;me++){const Le=Z[me];I?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,0,0,Se,oe,Le.image[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,Be,Se,oe,Le.image[q])}}}m(A)&&f(s.TEXTURE_CUBE_MAP),H.__version=j.version,A.onUpdate&&A.onUpdate(A)}x.__version=A.version}function ue(x,A,N,V,j,H){const Me=r.convert(N.format,N.colorSpace),ne=r.convert(N.type),_e=b(N.internalFormat,Me,ne,N.colorSpace),ve=n.get(A),ee=n.get(N);if(ee.__renderTarget=A,!ve.__hasExternalTextures){const ce=Math.max(1,A.width>>H),Te=Math.max(1,A.height>>H);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?t.texImage3D(j,H,_e,ce,Te,A.depth,0,Me,ne,null):t.texImage2D(j,H,_e,ce,Te,0,Me,ne,null)}t.bindFramebuffer(s.FRAMEBUFFER,x),Ae(A)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,V,j,ee.__webglTexture,0,it(A)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,V,j,ee.__webglTexture,H),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Pe(x,A,N){if(s.bindRenderbuffer(s.RENDERBUFFER,x),A.depthBuffer){const V=A.depthTexture,j=V&&V.isDepthTexture?V.type:null,H=y(A.stencilBuffer,j),Me=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ne=it(A);Ae(A)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ne,H,A.width,A.height):N?s.renderbufferStorageMultisample(s.RENDERBUFFER,ne,H,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,H,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Me,s.RENDERBUFFER,x)}else{const V=A.textures;for(let j=0;j<V.length;j++){const H=V[j],Me=r.convert(H.format,H.colorSpace),ne=r.convert(H.type),_e=b(H.internalFormat,Me,ne,H.colorSpace),ve=it(A);N&&Ae(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ve,_e,A.width,A.height):Ae(A)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ve,_e,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,_e,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ye(x,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,x),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const V=n.get(A.depthTexture);V.__renderTarget=A,(!V.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),K(A.depthTexture,0);const j=V.__webglTexture,H=it(A);if(A.depthTexture.format===ji)Ae(A)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0,H):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0);else if(A.depthTexture.format===$i)Ae(A)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0,H):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Ye(x){const A=n.get(x),N=x.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==x.depthTexture){const V=x.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),V){const j=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,V.removeEventListener("dispose",j)};V.addEventListener("dispose",j),A.__depthDisposeCallback=j}A.__boundDepthTexture=V}if(x.depthTexture&&!A.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");const V=x.texture.mipmaps;V&&V.length>0?ye(A.__webglFramebuffer[0],x):ye(A.__webglFramebuffer,x)}else if(N){A.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[V]),A.__webglDepthbuffer[V]===void 0)A.__webglDepthbuffer[V]=s.createRenderbuffer(),Pe(A.__webglDepthbuffer[V],x,!1);else{const j=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,H=A.__webglDepthbuffer[V];s.bindRenderbuffer(s.RENDERBUFFER,H),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,H)}}else{const V=x.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=s.createRenderbuffer(),Pe(A.__webglDepthbuffer,x,!1);else{const j=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,H=A.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,H),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,H)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function yt(x,A,N){const V=n.get(x);A!==void 0&&ue(V.__webglFramebuffer,x,x.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),N!==void 0&&Ye(x)}function T(x){const A=x.texture,N=n.get(x),V=n.get(A);x.addEventListener("dispose",R);const j=x.textures,H=x.isWebGLCubeRenderTarget===!0,Me=j.length>1;if(Me||(V.__webglTexture===void 0&&(V.__webglTexture=s.createTexture()),V.__version=A.version,a.memory.textures++),H){N.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(A.mipmaps&&A.mipmaps.length>0){N.__webglFramebuffer[ne]=[];for(let _e=0;_e<A.mipmaps.length;_e++)N.__webglFramebuffer[ne][_e]=s.createFramebuffer()}else N.__webglFramebuffer[ne]=s.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){N.__webglFramebuffer=[];for(let ne=0;ne<A.mipmaps.length;ne++)N.__webglFramebuffer[ne]=s.createFramebuffer()}else N.__webglFramebuffer=s.createFramebuffer();if(Me)for(let ne=0,_e=j.length;ne<_e;ne++){const ve=n.get(j[ne]);ve.__webglTexture===void 0&&(ve.__webglTexture=s.createTexture(),a.memory.textures++)}if(x.samples>0&&Ae(x)===!1){N.__webglMultisampledFramebuffer=s.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ne=0;ne<j.length;ne++){const _e=j[ne];N.__webglColorRenderbuffer[ne]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,N.__webglColorRenderbuffer[ne]);const ve=r.convert(_e.format,_e.colorSpace),ee=r.convert(_e.type),ce=b(_e.internalFormat,ve,ee,_e.colorSpace,x.isXRRenderTarget===!0),Te=it(x);s.renderbufferStorageMultisample(s.RENDERBUFFER,Te,ce,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ne,s.RENDERBUFFER,N.__webglColorRenderbuffer[ne])}s.bindRenderbuffer(s.RENDERBUFFER,null),x.depthBuffer&&(N.__webglDepthRenderbuffer=s.createRenderbuffer(),Pe(N.__webglDepthRenderbuffer,x,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(H){t.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture),De(s.TEXTURE_CUBE_MAP,A);for(let ne=0;ne<6;ne++)if(A.mipmaps&&A.mipmaps.length>0)for(let _e=0;_e<A.mipmaps.length;_e++)ue(N.__webglFramebuffer[ne][_e],x,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,_e);else ue(N.__webglFramebuffer[ne],x,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);m(A)&&f(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let ne=0,_e=j.length;ne<_e;ne++){const ve=j[ne],ee=n.get(ve);let ce=s.TEXTURE_2D;(x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(ce=x.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ce,ee.__webglTexture),De(ce,ve),ue(N.__webglFramebuffer,x,ve,s.COLOR_ATTACHMENT0+ne,ce,0),m(ve)&&f(ce)}t.unbindTexture()}else{let ne=s.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(ne=x.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ne,V.__webglTexture),De(ne,A),A.mipmaps&&A.mipmaps.length>0)for(let _e=0;_e<A.mipmaps.length;_e++)ue(N.__webglFramebuffer[_e],x,A,s.COLOR_ATTACHMENT0,ne,_e);else ue(N.__webglFramebuffer,x,A,s.COLOR_ATTACHMENT0,ne,0);m(A)&&f(ne),t.unbindTexture()}x.depthBuffer&&Ye(x)}function nt(x){const A=x.textures;for(let N=0,V=A.length;N<V;N++){const j=A[N];if(m(j)){const H=E(x),Me=n.get(j).__webglTexture;t.bindTexture(H,Me),f(H),t.unbindTexture()}}}const Ue=[],Ce=[];function ge(x){if(x.samples>0){if(Ae(x)===!1){const A=x.textures,N=x.width,V=x.height;let j=s.COLOR_BUFFER_BIT;const H=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Me=n.get(x),ne=A.length>1;if(ne)for(let ve=0;ve<A.length;ve++)t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const _e=x.texture.mipmaps;_e&&_e.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let ve=0;ve<A.length;ve++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),ne){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Me.__webglColorRenderbuffer[ve]);const ee=n.get(A[ve]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ee,0)}s.blitFramebuffer(0,0,N,V,0,0,N,V,j,s.NEAREST),l===!0&&(Ue.length=0,Ce.length=0,Ue.push(s.COLOR_ATTACHMENT0+ve),x.depthBuffer&&x.resolveDepthBuffer===!1&&(Ue.push(H),Ce.push(H),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ce)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ne)for(let ve=0;ve<A.length;ve++){t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,Me.__webglColorRenderbuffer[ve]);const ee=n.get(A[ve]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,ee,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&l){const A=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[A])}}}function it(x){return Math.min(i.maxSamples,x.samples)}function Ae(x){const A=n.get(x);return x.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Oe(x){const A=a.render.frame;h.get(x)!==A&&(h.set(x,A),x.update())}function mt(x,A){const N=x.colorSpace,V=x.format,j=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||N!==Ii&&N!==Ln&&(je.getTransfer(N)===Je?(V!==Qt||j!==dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),A}function lt(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(c.width=x.naturalWidth||x.width,c.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(c.width=x.displayWidth,c.height=x.displayHeight):(c.width=x.width,c.height=x.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=k,this.setTexture2D=K,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=z,this.rebindTextures=yt,this.setupRenderTarget=T,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=Ae}function sg(s,e){function t(n,i=Ln){let r;const a=je.getTransfer(i);if(n===dn)return s.UNSIGNED_BYTE;if(n===eo)return s.UNSIGNED_SHORT_4_4_4_4;if(n===to)return s.UNSIGNED_SHORT_5_5_5_1;if(n===hc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===uc)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===cc)return s.BYTE;if(n===dc)return s.SHORT;if(n===qi)return s.UNSIGNED_SHORT;if(n===Qa)return s.INT;if(n===ni)return s.UNSIGNED_INT;if(n===Mn)return s.FLOAT;if(n===ts)return s.HALF_FLOAT;if(n===fc)return s.ALPHA;if(n===pc)return s.RGB;if(n===Qt)return s.RGBA;if(n===ji)return s.DEPTH_COMPONENT;if(n===$i)return s.DEPTH_STENCIL;if(n===mc)return s.RED;if(n===no)return s.RED_INTEGER;if(n===gc)return s.RG;if(n===io)return s.RG_INTEGER;if(n===so)return s.RGBA_INTEGER;if(n===Bs||n===ks||n===Fs||n===Os)if(a===Je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Bs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Fs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Os)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Bs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ks)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Fs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Os)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ha||n===ua||n===fa||n===pa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ha)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ua)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ma||n===ga||n===Aa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ma||n===ga)return a===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Aa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===_a||n===va||n===Sa||n===Ma||n===ya||n===xa||n===ba||n===Ea||n===wa||n===Ta||n===Ca||n===Ra||n===Pa||n===Ia)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===_a)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===va)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Sa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ma)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ya)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ba)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ea)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ta)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ca)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ra)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ia)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Da||n===La||n===Ua)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Da)return a===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===La)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ua)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Na||n===Ba||n===ka||n===Fa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Na)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ba)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ka)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ki?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const rg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ag=`
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

}`;class og{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Rc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new xn({vertexShader:rg,fragmentShader:ag,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mt(new Qs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lg extends Ni{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",m=new og,f={},E=t.getContextAttributes();let b=null,y=null;const C=[],w=[],R=new Xe;let U=null;const M=new Rt;M.viewport=new ot;const S=new Rt;S.viewport=new ot;const P=[M,S],k=new Ch;let G=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let $=C[X];return $===void 0&&($=new Rr,C[X]=$),$.getTargetRaySpace()},this.getControllerGrip=function(X){let $=C[X];return $===void 0&&($=new Rr,C[X]=$),$.getGripSpace()},this.getHand=function(X){let $=C[X];return $===void 0&&($=new Rr,C[X]=$),$.getHandSpace()};function K(X){const $=w.indexOf(X.inputSource);if($===-1)return;const ue=C[$];ue!==void 0&&(ue.update(X.inputSource,X.frame,c||a),ue.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){i.removeEventListener("select",K),i.removeEventListener("selectstart",K),i.removeEventListener("selectend",K),i.removeEventListener("squeeze",K),i.removeEventListener("squeezestart",K),i.removeEventListener("squeezeend",K),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",Q);for(let X=0;X<C.length;X++){const $=w[X];$!==null&&(w[X]=null,C[X].disconnect($))}G=null,Y=null,m.reset();for(const X in f)delete f[X];e.setRenderTarget(b),p=null,u=null,d=null,i=null,y=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",K),i.addEventListener("selectstart",K),i.addEventListener("selectend",K),i.addEventListener("squeeze",K),i.addEventListener("squeezestart",K),i.addEventListener("squeezeend",K),i.addEventListener("end",W),i.addEventListener("inputsourceschange",Q),E.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,Pe=null,ye=null;E.depth&&(ye=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=E.stencil?$i:ji,Pe=E.stencil?Ki:ni);const Ye={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ye),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new ii(u.textureWidth,u.textureHeight,{format:Qt,type:dn,depthTexture:new Cc(u.textureWidth,u.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ue={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,t,ue),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new ii(p.framebufferWidth,p.framebufferHeight,{format:Qt,type:dn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Fe.setContext(i),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(X){for(let $=0;$<X.removed.length;$++){const ue=X.removed[$],Pe=w.indexOf(ue);Pe>=0&&(w[Pe]=null,C[Pe].disconnect(ue))}for(let $=0;$<X.added.length;$++){const ue=X.added[$];let Pe=w.indexOf(ue);if(Pe===-1){for(let Ye=0;Ye<C.length;Ye++)if(Ye>=w.length){w.push(ue),Pe=Ye;break}else if(w[Ye]===null){w[Ye]=ue,Pe=Ye;break}if(Pe===-1)break}const ye=C[Pe];ye&&ye.connect(ue)}}const z=new B,ie=new B;function ae(X,$,ue){z.setFromMatrixPosition($.matrixWorld),ie.setFromMatrixPosition(ue.matrixWorld);const Pe=z.distanceTo(ie),ye=$.projectionMatrix.elements,Ye=ue.projectionMatrix.elements,yt=ye[14]/(ye[10]-1),T=ye[14]/(ye[10]+1),nt=(ye[9]+1)/ye[5],Ue=(ye[9]-1)/ye[5],Ce=(ye[8]-1)/ye[0],ge=(Ye[8]+1)/Ye[0],it=yt*Ce,Ae=yt*ge,Oe=Pe/(-Ce+ge),mt=Oe*-Ce;if($.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(mt),X.translateZ(Oe),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),ye[10]===-1)X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const lt=yt+Oe,x=T+Oe,A=it-mt,N=Ae+(Pe-mt),V=nt*T/x*lt,j=Ue*T/x*lt;X.projectionMatrix.makePerspective(A,N,V,j,lt,x),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function pe(X,$){$===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices($.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;let $=X.near,ue=X.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(ue=m.depthFar)),k.near=S.near=M.near=$,k.far=S.far=M.far=ue,(G!==k.near||Y!==k.far)&&(i.updateRenderState({depthNear:k.near,depthFar:k.far}),G=k.near,Y=k.far),k.layers.mask=X.layers.mask|6,M.layers.mask=k.layers.mask&3,S.layers.mask=k.layers.mask&5;const Pe=X.parent,ye=k.cameras;pe(k,Pe);for(let Ye=0;Ye<ye.length;Ye++)pe(ye[Ye],Pe);ye.length===2?ae(k,M,S):k.projectionMatrix.copy(M.projectionMatrix),De(X,k,Pe)};function De(X,$,ue){ue===null?X.matrix.copy($.matrixWorld):(X.matrix.copy(ue.matrixWorld),X.matrix.invert(),X.matrix.multiply($.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Oa*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(X){return f[X]};let qe=null;function He(X,$){if(h=$.getViewerPose(c||a),g=$,h!==null){const ue=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Pe=!1;ue.length!==k.cameras.length&&(k.cameras.length=0,Pe=!0);for(let T=0;T<ue.length;T++){const nt=ue[T];let Ue=null;if(p!==null)Ue=p.getViewport(nt);else{const ge=d.getViewSubImage(u,nt);Ue=ge.viewport,T===0&&(e.setRenderTargetTextures(y,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(y))}let Ce=P[T];Ce===void 0&&(Ce=new Rt,Ce.layers.enable(T),Ce.viewport=new ot,P[T]=Ce),Ce.matrix.fromArray(nt.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(nt.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),T===0&&(k.matrix.copy(Ce.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Pe===!0&&k.cameras.push(Ce)}const ye=i.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();const T=d.getDepthInformation(ue[0]);T&&T.isValid&&T.texture&&m.init(T,i.renderState)}if(ye&&ye.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let T=0;T<ue.length;T++){const nt=ue[T].camera;if(nt){let Ue=f[nt];Ue||(Ue=new Rc,f[nt]=Ue);const Ce=d.getCameraImage(nt);Ue.sourceTexture=Ce}}}}for(let ue=0;ue<C.length;ue++){const Pe=w[ue],ye=C[ue];Pe!==null&&ye!==void 0&&ye.update(Pe,$,c||a)}qe&&qe(X,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}const Fe=new Dc;Fe.setAnimationLoop(He),this.setAnimationLoop=function(X){qe=X},this.dispose=function(){}}}const Kn=new tn,cg=new ct;function dg(s,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Ec(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,E,b,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,E,b):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Pt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Pt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const E=e.get(f),b=E.envMap,y=E.envMapRotation;b&&(m.envMap.value=b,Kn.copy(y),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),m.envMapRotation.value.setFromMatrix4(cg.makeRotationFromEuler(Kn)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,E,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*E,m.scale.value=b*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,E){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Pt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const E=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function hg(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,b){const y=b.program;n.uniformBlockBinding(E,y)}function c(E,b){let y=i[E.id];y===void 0&&(g(E),y=h(E),i[E.id]=y,E.addEventListener("dispose",m));const C=b.program;n.updateUBOMapping(E,C);const w=e.render.frame;r[E.id]!==w&&(u(E),r[E.id]=w)}function h(E){const b=d();E.__bindingPointIndex=b;const y=s.createBuffer(),C=E.__size,w=E.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,C,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,y),y}function d(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){const b=i[E.id],y=E.uniforms,C=E.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let w=0,R=y.length;w<R;w++){const U=Array.isArray(y[w])?y[w]:[y[w]];for(let M=0,S=U.length;M<S;M++){const P=U[M];if(p(P,w,M,C)===!0){const k=P.__offset,G=Array.isArray(P.value)?P.value:[P.value];let Y=0;for(let K=0;K<G.length;K++){const W=G[K],Q=_(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,k+Y,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,Y),Y+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(E,b,y,C){const w=E.value,R=b+"_"+y;if(C[R]===void 0)return typeof w=="number"||typeof w=="boolean"?C[R]=w:C[R]=w.clone(),!0;{const U=C[R];if(typeof w=="number"||typeof w=="boolean"){if(U!==w)return C[R]=w,!0}else if(U.equals(w)===!1)return U.copy(w),!0}return!1}function g(E){const b=E.uniforms;let y=0;const C=16;for(let R=0,U=b.length;R<U;R++){const M=Array.isArray(b[R])?b[R]:[b[R]];for(let S=0,P=M.length;S<P;S++){const k=M[S],G=Array.isArray(k.value)?k.value:[k.value];for(let Y=0,K=G.length;Y<K;Y++){const W=G[Y],Q=_(W),z=y%C,ie=z%Q.boundary,ae=z+ie;y+=ie,ae!==0&&C-ae<Q.storage&&(y+=C-ae),k.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=Q.storage}}}const w=y%C;return w>0&&(y+=C-w),E.__size=y,E.__cache={},this}function _(E){const b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),b}function m(E){const b=E.target;b.removeEventListener("dispose",m);const y=a.indexOf(b.__bindingPointIndex);a.splice(y,1),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function f(){for(const E in i)s.deleteBuffer(i[E]);a=[],i={},r={}}return{bind:l,update:c,dispose:f}}class mo{constructor(e={}){const{canvas:t=qd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const E=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let C=!1;this._outputColorSpace=St;let w=0,R=0,U=null,M=-1,S=null;const P=new ot,k=new ot;let G=null;const Y=new Ne(0);let K=0,W=t.width,Q=t.height,z=1,ie=null,ae=null;const pe=new ot(0,0,W,Q),De=new ot(0,0,W,Q);let qe=!1;const He=new co;let Fe=!1,X=!1;const $=new ct,ue=new B,Pe=new ot,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ye=!1;function yt(){return U===null?z:1}let T=n;function nt(v,D){return t.getContext(v,D)}try{const v={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Za}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",Z,!1),T===null){const D="webgl2";if(T=nt(D,v),T===null)throw nt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Ue,Ce,ge,it,Ae,Oe,mt,lt,x,A,N,V,j,H,Me,ne,_e,ve,ee,ce,Te,Se,oe,Be;function I(){Ue=new yp(T),Ue.init(),Se=new sg(T,Ue),Ce=new mp(T,Ue,e,Se),ge=new ng(T,Ue),Ce.reversedDepthBuffer&&u&&ge.buffers.depth.setReversed(!0),it=new Ep(T),Ae=new Vm,Oe=new ig(T,Ue,ge,Ae,Ce,Se,it),mt=new Ap(y),lt=new Mp(y),x=new Ph(T),oe=new fp(T,x),A=new xp(T,x,it,oe),N=new Tp(T,A,x,it),ee=new wp(T,Ce,Oe),ne=new gp(Ae),V=new Hm(y,mt,lt,Ue,Ce,oe,ne),j=new dg(y,Ae),H=new Xm,Me=new Zm(Ue),ve=new up(y,mt,lt,ge,N,p,l),_e=new eg(y,N,Ce),Be=new hg(T,it,Ce,ge),ce=new pp(T,Ue,it),Te=new bp(T,Ue,it),it.programs=V.programs,y.capabilities=Ce,y.extensions=Ue,y.properties=Ae,y.renderLists=H,y.shadowMap=_e,y.state=ge,y.info=it}I();const te=new lg(y,T);this.xr=te,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const v=Ue.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Ue.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(v){v!==void 0&&(z=v,this.setSize(W,Q,!1))},this.getSize=function(v){return v.set(W,Q)},this.setSize=function(v,D,F=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=v,Q=D,t.width=Math.floor(v*z),t.height=Math.floor(D*z),F===!0&&(t.style.width=v+"px",t.style.height=D+"px"),this.setViewport(0,0,v,D)},this.getDrawingBufferSize=function(v){return v.set(W*z,Q*z).floor()},this.setDrawingBufferSize=function(v,D,F){W=v,Q=D,z=F,t.width=Math.floor(v*F),t.height=Math.floor(D*F),this.setViewport(0,0,v,D)},this.getCurrentViewport=function(v){return v.copy(P)},this.getViewport=function(v){return v.copy(pe)},this.setViewport=function(v,D,F,O){v.isVector4?pe.set(v.x,v.y,v.z,v.w):pe.set(v,D,F,O),ge.viewport(P.copy(pe).multiplyScalar(z).round())},this.getScissor=function(v){return v.copy(De)},this.setScissor=function(v,D,F,O){v.isVector4?De.set(v.x,v.y,v.z,v.w):De.set(v,D,F,O),ge.scissor(k.copy(De).multiplyScalar(z).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(v){ge.setScissorTest(qe=v)},this.setOpaqueSort=function(v){ie=v},this.setTransparentSort=function(v){ae=v},this.getClearColor=function(v){return v.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor(...arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha(...arguments)},this.clear=function(v=!0,D=!0,F=!0){let O=0;if(v){let L=!1;if(U!==null){const J=U.texture.format;L=J===so||J===io||J===no}if(L){const J=U.texture.type,le=J===dn||J===ni||J===qi||J===Ki||J===eo||J===to,fe=ve.getClearColor(),de=ve.getClearAlpha(),we=fe.r,Re=fe.g,xe=fe.b;le?(g[0]=we,g[1]=Re,g[2]=xe,g[3]=de,T.clearBufferuiv(T.COLOR,0,g)):(_[0]=we,_[1]=Re,_[2]=xe,_[3]=de,T.clearBufferiv(T.COLOR,0,_))}else O|=T.COLOR_BUFFER_BIT}D&&(O|=T.DEPTH_BUFFER_BIT),F&&(O|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",Z,!1),ve.dispose(),H.dispose(),Me.dispose(),Ae.dispose(),mt.dispose(),lt.dispose(),N.dispose(),oe.dispose(),Be.dispose(),V.dispose(),te.dispose(),te.removeEventListener("sessionstart",nn),te.removeEventListener("sessionend",vo),zn.stop()};function se(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const v=it.autoReset,D=_e.enabled,F=_e.autoUpdate,O=_e.needsUpdate,L=_e.type;I(),it.autoReset=v,_e.enabled=D,_e.autoUpdate=F,_e.needsUpdate=O,_e.type=L}function Z(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function q(v){const D=v.target;D.removeEventListener("dispose",q),me(D)}function me(v){Le(v),Ae.remove(v)}function Le(v){const D=Ae.get(v).programs;D!==void 0&&(D.forEach(function(F){V.releaseProgram(F)}),v.isShaderMaterial&&V.releaseShaderCache(v))}this.renderBufferDirect=function(v,D,F,O,L,J){D===null&&(D=ye);const le=L.isMesh&&L.matrixWorld.determinant()<0,fe=Kc(v,D,F,O,L);ge.setMaterial(O,le);let de=F.index,we=1;if(O.wireframe===!0){if(de=A.getWireframeAttribute(F),de===void 0)return;we=2}const Re=F.drawRange,xe=F.attributes.position;let Ve=Re.start*we,Ze=(Re.start+Re.count)*we;J!==null&&(Ve=Math.max(Ve,J.start*we),Ze=Math.min(Ze,(J.start+J.count)*we)),de!==null?(Ve=Math.max(Ve,0),Ze=Math.min(Ze,de.count)):xe!=null&&(Ve=Math.max(Ve,0),Ze=Math.min(Ze,xe.count));const at=Ze-Ve;if(at<0||at===1/0)return;oe.setup(L,O,fe,F,de);let tt,Qe=ce;if(de!==null&&(tt=x.get(de),Qe=Te,Qe.setIndex(tt)),L.isMesh)O.wireframe===!0?(ge.setLineWidth(O.wireframeLinewidth*yt()),Qe.setMode(T.LINES)):Qe.setMode(T.TRIANGLES);else if(L.isLine){let Ee=O.linewidth;Ee===void 0&&(Ee=1),ge.setLineWidth(Ee*yt()),L.isLineSegments?Qe.setMode(T.LINES):L.isLineLoop?Qe.setMode(T.LINE_LOOP):Qe.setMode(T.LINE_STRIP)}else L.isPoints?Qe.setMode(T.POINTS):L.isSprite&&Qe.setMode(T.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)Zi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Qe.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))Qe.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{const Ee=L._multiDrawStarts,st=L._multiDrawCounts,Ke=L._multiDrawCount,Bt=de?x.get(de).bytesPerElement:1,si=Ae.get(O).currentProgram.getUniforms();for(let kt=0;kt<Ke;kt++)si.setValue(T,"_gl_DrawID",kt),Qe.render(Ee[kt]/Bt,st[kt])}else if(L.isInstancedMesh)Qe.renderInstances(Ve,at,L.count);else if(F.isInstancedBufferGeometry){const Ee=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,st=Math.min(F.instanceCount,Ee);Qe.renderInstances(Ve,at,st)}else Qe.render(Ve,at)};function et(v,D,F){v.transparent===!0&&v.side===vn&&v.forceSinglePass===!1?(v.side=Pt,v.needsUpdate=!0,os(v,D,F),v.side=cn,v.needsUpdate=!0,os(v,D,F),v.side=vn):os(v,D,F)}this.compile=function(v,D,F=null){F===null&&(F=v),f=Me.get(F),f.init(D),b.push(f),F.traverseVisible(function(L){L.isLight&&L.layers.test(D.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),v!==F&&v.traverseVisible(function(L){L.isLight&&L.layers.test(D.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),f.setupLights();const O=new Set;return v.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;const J=L.material;if(J)if(Array.isArray(J))for(let le=0;le<J.length;le++){const fe=J[le];et(fe,F,L),O.add(fe)}else et(J,F,L),O.add(J)}),f=b.pop(),O},this.compileAsync=function(v,D,F=null){const O=this.compile(v,D,F);return new Promise(L=>{function J(){if(O.forEach(function(le){Ae.get(le).currentProgram.isReady()&&O.delete(le)}),O.size===0){L(v);return}setTimeout(J,10)}Ue.get("KHR_parallel_shader_compile")!==null?J():setTimeout(J,10)})};let $e=null;function hn(v){$e&&$e(v)}function nn(){zn.stop()}function vo(){zn.start()}const zn=new Dc;zn.setAnimationLoop(hn),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(v){$e=v,te.setAnimationLoop(v),v===null?zn.stop():zn.start()},te.addEventListener("sessionstart",nn),te.addEventListener("sessionend",vo),this.render=function(v,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(D),D=te.getCamera()),v.isScene===!0&&v.onBeforeRender(y,v,D,U),f=Me.get(v,b.length),f.init(D),b.push(f),$.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),He.setFromProjectionMatrix($,on,D.reversedDepth),X=this.localClippingEnabled,Fe=ne.init(this.clippingPlanes,X),m=H.get(v,E.length),m.init(),E.push(m),te.enabled===!0&&te.isPresenting===!0){const J=y.xr.getDepthSensingMesh();J!==null&&ir(J,D,-1/0,y.sortObjects)}ir(v,D,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ie,ae),Ye=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Ye&&ve.addToRenderList(m,v),this.info.render.frame++,Fe===!0&&ne.beginShadows();const F=f.state.shadowsArray;_e.render(F,v,D),Fe===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=m.opaque,L=m.transmissive;if(f.setupLights(),D.isArrayCamera){const J=D.cameras;if(L.length>0)for(let le=0,fe=J.length;le<fe;le++){const de=J[le];Mo(O,L,v,de)}Ye&&ve.render(v);for(let le=0,fe=J.length;le<fe;le++){const de=J[le];So(m,v,de,de.viewport)}}else L.length>0&&Mo(O,L,v,D),Ye&&ve.render(v),So(m,v,D);U!==null&&R===0&&(Oe.updateMultisampleRenderTarget(U),Oe.updateRenderTargetMipmap(U)),v.isScene===!0&&v.onAfterRender(y,v,D),oe.resetDefaultState(),M=-1,S=null,b.pop(),b.length>0?(f=b[b.length-1],Fe===!0&&ne.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function ir(v,D,F,O){if(v.visible===!1)return;if(v.layers.test(D.layers)){if(v.isGroup)F=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(D);else if(v.isLight)f.pushLight(v),v.castShadow&&f.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||He.intersectsSprite(v)){O&&Pe.setFromMatrixPosition(v.matrixWorld).applyMatrix4($);const le=N.update(v),fe=v.material;fe.visible&&m.push(v,le,fe,F,Pe.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||He.intersectsObject(v))){const le=N.update(v),fe=v.material;if(O&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Pe.copy(v.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Pe.copy(le.boundingSphere.center)),Pe.applyMatrix4(v.matrixWorld).applyMatrix4($)),Array.isArray(fe)){const de=le.groups;for(let we=0,Re=de.length;we<Re;we++){const xe=de[we],Ve=fe[xe.materialIndex];Ve&&Ve.visible&&m.push(v,le,Ve,F,Pe.z,xe)}}else fe.visible&&m.push(v,le,fe,F,Pe.z,null)}}const J=v.children;for(let le=0,fe=J.length;le<fe;le++)ir(J[le],D,F,O)}function So(v,D,F,O){const L=v.opaque,J=v.transmissive,le=v.transparent;f.setupLightsView(F),Fe===!0&&ne.setGlobalState(y.clippingPlanes,F),O&&ge.viewport(P.copy(O)),L.length>0&&as(L,D,F),J.length>0&&as(J,D,F),le.length>0&&as(le,D,F),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Mo(v,D,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[O.id]===void 0&&(f.state.transmissionRenderTarget[O.id]=new ii(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?ts:dn,minFilter:Un,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace}));const J=f.state.transmissionRenderTarget[O.id],le=O.viewport||P;J.setSize(le.z*y.transmissionResolutionScale,le.w*y.transmissionResolutionScale);const fe=y.getRenderTarget(),de=y.getActiveCubeFace(),we=y.getActiveMipmapLevel();y.setRenderTarget(J),y.getClearColor(Y),K=y.getClearAlpha(),K<1&&y.setClearColor(16777215,.5),y.clear(),Ye&&ve.render(F);const Re=y.toneMapping;y.toneMapping=Bn;const xe=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),f.setupLightsView(O),Fe===!0&&ne.setGlobalState(y.clippingPlanes,O),as(v,F,O),Oe.updateMultisampleRenderTarget(J),Oe.updateRenderTargetMipmap(J),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let Ze=0,at=D.length;Ze<at;Ze++){const tt=D[Ze],Qe=tt.object,Ee=tt.geometry,st=tt.material,Ke=tt.group;if(st.side===vn&&Qe.layers.test(O.layers)){const Bt=st.side;st.side=Pt,st.needsUpdate=!0,yo(Qe,F,O,Ee,st,Ke),st.side=Bt,st.needsUpdate=!0,Ve=!0}}Ve===!0&&(Oe.updateMultisampleRenderTarget(J),Oe.updateRenderTargetMipmap(J))}y.setRenderTarget(fe,de,we),y.setClearColor(Y,K),xe!==void 0&&(O.viewport=xe),y.toneMapping=Re}function as(v,D,F){const O=D.isScene===!0?D.overrideMaterial:null;for(let L=0,J=v.length;L<J;L++){const le=v[L],fe=le.object,de=le.geometry,we=le.group;let Re=le.material;Re.allowOverride===!0&&O!==null&&(Re=O),fe.layers.test(F.layers)&&yo(fe,D,F,de,Re,we)}}function yo(v,D,F,O,L,J){v.onBeforeRender(y,D,F,O,L,J),v.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),L.onBeforeRender(y,D,F,O,v,J),L.transparent===!0&&L.side===vn&&L.forceSinglePass===!1?(L.side=Pt,L.needsUpdate=!0,y.renderBufferDirect(F,D,O,L,v,J),L.side=cn,L.needsUpdate=!0,y.renderBufferDirect(F,D,O,L,v,J),L.side=vn):y.renderBufferDirect(F,D,O,L,v,J),v.onAfterRender(y,D,F,O,L,J)}function os(v,D,F){D.isScene!==!0&&(D=ye);const O=Ae.get(v),L=f.state.lights,J=f.state.shadowsArray,le=L.state.version,fe=V.getParameters(v,L.state,J,D,F),de=V.getProgramCacheKey(fe);let we=O.programs;O.environment=v.isMeshStandardMaterial?D.environment:null,O.fog=D.fog,O.envMap=(v.isMeshStandardMaterial?lt:mt).get(v.envMap||O.environment),O.envMapRotation=O.environment!==null&&v.envMap===null?D.environmentRotation:v.envMapRotation,we===void 0&&(v.addEventListener("dispose",q),we=new Map,O.programs=we);let Re=we.get(de);if(Re!==void 0){if(O.currentProgram===Re&&O.lightsStateVersion===le)return bo(v,fe),Re}else fe.uniforms=V.getUniforms(v),v.onBeforeCompile(fe,y),Re=V.acquireProgram(fe,de),we.set(de,Re),O.uniforms=fe.uniforms;const xe=O.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(xe.clippingPlanes=ne.uniform),bo(v,fe),O.needsLights=$c(v),O.lightsStateVersion=le,O.needsLights&&(xe.ambientLightColor.value=L.state.ambient,xe.lightProbe.value=L.state.probe,xe.directionalLights.value=L.state.directional,xe.directionalLightShadows.value=L.state.directionalShadow,xe.spotLights.value=L.state.spot,xe.spotLightShadows.value=L.state.spotShadow,xe.rectAreaLights.value=L.state.rectArea,xe.ltc_1.value=L.state.rectAreaLTC1,xe.ltc_2.value=L.state.rectAreaLTC2,xe.pointLights.value=L.state.point,xe.pointLightShadows.value=L.state.pointShadow,xe.hemisphereLights.value=L.state.hemi,xe.directionalShadowMap.value=L.state.directionalShadowMap,xe.directionalShadowMatrix.value=L.state.directionalShadowMatrix,xe.spotShadowMap.value=L.state.spotShadowMap,xe.spotLightMatrix.value=L.state.spotLightMatrix,xe.spotLightMap.value=L.state.spotLightMap,xe.pointShadowMap.value=L.state.pointShadowMap,xe.pointShadowMatrix.value=L.state.pointShadowMatrix),O.currentProgram=Re,O.uniformsList=null,Re}function xo(v){if(v.uniformsList===null){const D=v.currentProgram.getUniforms();v.uniformsList=zs.seqWithValue(D.seq,v.uniforms)}return v.uniformsList}function bo(v,D){const F=Ae.get(v);F.outputColorSpace=D.outputColorSpace,F.batching=D.batching,F.batchingColor=D.batchingColor,F.instancing=D.instancing,F.instancingColor=D.instancingColor,F.instancingMorph=D.instancingMorph,F.skinning=D.skinning,F.morphTargets=D.morphTargets,F.morphNormals=D.morphNormals,F.morphColors=D.morphColors,F.morphTargetsCount=D.morphTargetsCount,F.numClippingPlanes=D.numClippingPlanes,F.numIntersection=D.numClipIntersection,F.vertexAlphas=D.vertexAlphas,F.vertexTangents=D.vertexTangents,F.toneMapping=D.toneMapping}function Kc(v,D,F,O,L){D.isScene!==!0&&(D=ye),Oe.resetTextureUnits();const J=D.fog,le=O.isMeshStandardMaterial?D.environment:null,fe=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Ii,de=(O.isMeshStandardMaterial?lt:mt).get(O.envMap||le),we=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Re=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),xe=!!F.morphAttributes.position,Ve=!!F.morphAttributes.normal,Ze=!!F.morphAttributes.color;let at=Bn;O.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(at=y.toneMapping);const tt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Qe=tt!==void 0?tt.length:0,Ee=Ae.get(O),st=f.state.lights;if(Fe===!0&&(X===!0||v!==S)){const Et=v===S&&O.id===M;ne.setState(O,v,Et)}let Ke=!1;O.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==st.state.version||Ee.outputColorSpace!==fe||L.isBatchedMesh&&Ee.batching===!1||!L.isBatchedMesh&&Ee.batching===!0||L.isBatchedMesh&&Ee.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&Ee.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&Ee.instancing===!1||!L.isInstancedMesh&&Ee.instancing===!0||L.isSkinnedMesh&&Ee.skinning===!1||!L.isSkinnedMesh&&Ee.skinning===!0||L.isInstancedMesh&&Ee.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&Ee.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&Ee.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&Ee.instancingMorph===!1&&L.morphTexture!==null||Ee.envMap!==de||O.fog===!0&&Ee.fog!==J||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ne.numPlanes||Ee.numIntersection!==ne.numIntersection)||Ee.vertexAlphas!==we||Ee.vertexTangents!==Re||Ee.morphTargets!==xe||Ee.morphNormals!==Ve||Ee.morphColors!==Ze||Ee.toneMapping!==at||Ee.morphTargetsCount!==Qe)&&(Ke=!0):(Ke=!0,Ee.__version=O.version);let Bt=Ee.currentProgram;Ke===!0&&(Bt=os(O,D,L));let si=!1,kt=!1,ki=!1;const rt=Bt.getUniforms(),Ht=Ee.uniforms;if(ge.useProgram(Bt.program)&&(si=!0,kt=!0,ki=!0),O.id!==M&&(M=O.id,kt=!0),si||S!==v){ge.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),rt.setValue(T,"projectionMatrix",v.projectionMatrix),rt.setValue(T,"viewMatrix",v.matrixWorldInverse);const Lt=rt.map.cameraPosition;Lt!==void 0&&Lt.setValue(T,ue.setFromMatrixPosition(v.matrixWorld)),Ce.logarithmicDepthBuffer&&rt.setValue(T,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&rt.setValue(T,"isOrthographic",v.isOrthographicCamera===!0),S!==v&&(S=v,kt=!0,ki=!0)}if(L.isSkinnedMesh){rt.setOptional(T,L,"bindMatrix"),rt.setOptional(T,L,"bindMatrixInverse");const Et=L.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),rt.setValue(T,"boneTexture",Et.boneTexture,Oe))}L.isBatchedMesh&&(rt.setOptional(T,L,"batchingTexture"),rt.setValue(T,"batchingTexture",L._matricesTexture,Oe),rt.setOptional(T,L,"batchingIdTexture"),rt.setValue(T,"batchingIdTexture",L._indirectTexture,Oe),rt.setOptional(T,L,"batchingColorTexture"),L._colorsTexture!==null&&rt.setValue(T,"batchingColorTexture",L._colorsTexture,Oe));const Vt=F.morphAttributes;if((Vt.position!==void 0||Vt.normal!==void 0||Vt.color!==void 0)&&ee.update(L,F,Bt),(kt||Ee.receiveShadow!==L.receiveShadow)&&(Ee.receiveShadow=L.receiveShadow,rt.setValue(T,"receiveShadow",L.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Ht.envMap.value=de,Ht.flipEnvMap.value=de.isCubeTexture&&de.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&D.environment!==null&&(Ht.envMapIntensity.value=D.environmentIntensity),kt&&(rt.setValue(T,"toneMappingExposure",y.toneMappingExposure),Ee.needsLights&&jc(Ht,ki),J&&O.fog===!0&&j.refreshFogUniforms(Ht,J),j.refreshMaterialUniforms(Ht,O,z,Q,f.state.transmissionRenderTarget[v.id]),zs.upload(T,xo(Ee),Ht,Oe)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(zs.upload(T,xo(Ee),Ht,Oe),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&rt.setValue(T,"center",L.center),rt.setValue(T,"modelViewMatrix",L.modelViewMatrix),rt.setValue(T,"normalMatrix",L.normalMatrix),rt.setValue(T,"modelMatrix",L.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Et=O.uniformsGroups;for(let Lt=0,sr=Et.length;Lt<sr;Lt++){const Gn=Et[Lt];Be.update(Gn,Bt),Be.bind(Gn,Bt)}}return Bt}function jc(v,D){v.ambientLightColor.needsUpdate=D,v.lightProbe.needsUpdate=D,v.directionalLights.needsUpdate=D,v.directionalLightShadows.needsUpdate=D,v.pointLights.needsUpdate=D,v.pointLightShadows.needsUpdate=D,v.spotLights.needsUpdate=D,v.spotLightShadows.needsUpdate=D,v.rectAreaLights.needsUpdate=D,v.hemisphereLights.needsUpdate=D}function $c(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(v,D,F){const O=Ae.get(v);O.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),Ae.get(v.texture).__webglTexture=D,Ae.get(v.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:F,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,D){const F=Ae.get(v);F.__webglFramebuffer=D,F.__useDefaultFramebuffer=D===void 0};const Zc=T.createFramebuffer();this.setRenderTarget=function(v,D=0,F=0){U=v,w=D,R=F;let O=!0,L=null,J=!1,le=!1;if(v){const de=Ae.get(v);if(de.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(T.FRAMEBUFFER,null),O=!1;else if(de.__webglFramebuffer===void 0)Oe.setupRenderTarget(v);else if(de.__hasExternalTextures)Oe.rebindTextures(v,Ae.get(v.texture).__webglTexture,Ae.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const xe=v.depthTexture;if(de.__boundDepthTexture!==xe){if(xe!==null&&Ae.has(xe)&&(v.width!==xe.image.width||v.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Oe.setupDepthRenderbuffer(v)}}const we=v.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(le=!0);const Re=Ae.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Re[D])?L=Re[D][F]:L=Re[D],J=!0):v.samples>0&&Oe.useMultisampledRTT(v)===!1?L=Ae.get(v).__webglMultisampledFramebuffer:Array.isArray(Re)?L=Re[F]:L=Re,P.copy(v.viewport),k.copy(v.scissor),G=v.scissorTest}else P.copy(pe).multiplyScalar(z).floor(),k.copy(De).multiplyScalar(z).floor(),G=qe;if(F!==0&&(L=Zc),ge.bindFramebuffer(T.FRAMEBUFFER,L)&&O&&ge.drawBuffers(v,L),ge.viewport(P),ge.scissor(k),ge.setScissorTest(G),J){const de=Ae.get(v.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+D,de.__webglTexture,F)}else if(le){const de=D;for(let we=0;we<v.textures.length;we++){const Re=Ae.get(v.textures[we]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+we,Re.__webglTexture,F,de)}}else if(v!==null&&F!==0){const de=Ae.get(v.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,de.__webglTexture,F)}M=-1},this.readRenderTargetPixels=function(v,D,F,O,L,J,le,fe=0){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let de=Ae.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de){ge.bindFramebuffer(T.FRAMEBUFFER,de);try{const we=v.textures[fe],Re=we.format,xe=we.type;if(!Ce.textureFormatReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable(xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=v.width-O&&F>=0&&F<=v.height-L&&(v.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+fe),T.readPixels(D,F,O,L,Se.convert(Re),Se.convert(xe),J))}finally{const we=U!==null?Ae.get(U).__webglFramebuffer:null;ge.bindFramebuffer(T.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(v,D,F,O,L,J,le,fe=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=Ae.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de)if(D>=0&&D<=v.width-O&&F>=0&&F<=v.height-L){ge.bindFramebuffer(T.FRAMEBUFFER,de);const we=v.textures[fe],Re=we.format,xe=we.type;if(!Ce.textureFormatReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ve=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,Ve),T.bufferData(T.PIXEL_PACK_BUFFER,J.byteLength,T.STREAM_READ),v.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+fe),T.readPixels(D,F,O,L,Se.convert(Re),Se.convert(xe),0);const Ze=U!==null?Ae.get(U).__webglFramebuffer:null;ge.bindFramebuffer(T.FRAMEBUFFER,Ze);const at=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await Kd(T,at,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,Ve),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,J),T.deleteBuffer(Ve),T.deleteSync(at),J}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,D=null,F=0){const O=Math.pow(2,-F),L=Math.floor(v.image.width*O),J=Math.floor(v.image.height*O),le=D!==null?D.x:0,fe=D!==null?D.y:0;Oe.setTexture2D(v,0),T.copyTexSubImage2D(T.TEXTURE_2D,F,0,0,le,fe,L,J),ge.unbindTexture()};const Jc=T.createFramebuffer(),Qc=T.createFramebuffer();this.copyTextureToTexture=function(v,D,F=null,O=null,L=0,J=null){J===null&&(L!==0?(Zi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),J=L,L=0):J=0);let le,fe,de,we,Re,xe,Ve,Ze,at;const tt=v.isCompressedTexture?v.mipmaps[J]:v.image;if(F!==null)le=F.max.x-F.min.x,fe=F.max.y-F.min.y,de=F.isBox3?F.max.z-F.min.z:1,we=F.min.x,Re=F.min.y,xe=F.isBox3?F.min.z:0;else{const Vt=Math.pow(2,-L);le=Math.floor(tt.width*Vt),fe=Math.floor(tt.height*Vt),v.isDataArrayTexture?de=tt.depth:v.isData3DTexture?de=Math.floor(tt.depth*Vt):de=1,we=0,Re=0,xe=0}O!==null?(Ve=O.x,Ze=O.y,at=O.z):(Ve=0,Ze=0,at=0);const Qe=Se.convert(D.format),Ee=Se.convert(D.type);let st;D.isData3DTexture?(Oe.setTexture3D(D,0),st=T.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Oe.setTexture2DArray(D,0),st=T.TEXTURE_2D_ARRAY):(Oe.setTexture2D(D,0),st=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,D.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,D.unpackAlignment);const Ke=T.getParameter(T.UNPACK_ROW_LENGTH),Bt=T.getParameter(T.UNPACK_IMAGE_HEIGHT),si=T.getParameter(T.UNPACK_SKIP_PIXELS),kt=T.getParameter(T.UNPACK_SKIP_ROWS),ki=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,tt.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,tt.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,we),T.pixelStorei(T.UNPACK_SKIP_ROWS,Re),T.pixelStorei(T.UNPACK_SKIP_IMAGES,xe);const rt=v.isDataArrayTexture||v.isData3DTexture,Ht=D.isDataArrayTexture||D.isData3DTexture;if(v.isDepthTexture){const Vt=Ae.get(v),Et=Ae.get(D),Lt=Ae.get(Vt.__renderTarget),sr=Ae.get(Et.__renderTarget);ge.bindFramebuffer(T.READ_FRAMEBUFFER,Lt.__webglFramebuffer),ge.bindFramebuffer(T.DRAW_FRAMEBUFFER,sr.__webglFramebuffer);for(let Gn=0;Gn<de;Gn++)rt&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ae.get(v).__webglTexture,L,xe+Gn),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ae.get(D).__webglTexture,J,at+Gn)),T.blitFramebuffer(we,Re,le,fe,Ve,Ze,le,fe,T.DEPTH_BUFFER_BIT,T.NEAREST);ge.bindFramebuffer(T.READ_FRAMEBUFFER,null),ge.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(L!==0||v.isRenderTargetTexture||Ae.has(v)){const Vt=Ae.get(v),Et=Ae.get(D);ge.bindFramebuffer(T.READ_FRAMEBUFFER,Jc),ge.bindFramebuffer(T.DRAW_FRAMEBUFFER,Qc);for(let Lt=0;Lt<de;Lt++)rt?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Vt.__webglTexture,L,xe+Lt):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Vt.__webglTexture,L),Ht?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Et.__webglTexture,J,at+Lt):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Et.__webglTexture,J),L!==0?T.blitFramebuffer(we,Re,le,fe,Ve,Ze,le,fe,T.COLOR_BUFFER_BIT,T.NEAREST):Ht?T.copyTexSubImage3D(st,J,Ve,Ze,at+Lt,we,Re,le,fe):T.copyTexSubImage2D(st,J,Ve,Ze,we,Re,le,fe);ge.bindFramebuffer(T.READ_FRAMEBUFFER,null),ge.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else Ht?v.isDataTexture||v.isData3DTexture?T.texSubImage3D(st,J,Ve,Ze,at,le,fe,de,Qe,Ee,tt.data):D.isCompressedArrayTexture?T.compressedTexSubImage3D(st,J,Ve,Ze,at,le,fe,de,Qe,tt.data):T.texSubImage3D(st,J,Ve,Ze,at,le,fe,de,Qe,Ee,tt):v.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,J,Ve,Ze,le,fe,Qe,Ee,tt.data):v.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,J,Ve,Ze,tt.width,tt.height,Qe,tt.data):T.texSubImage2D(T.TEXTURE_2D,J,Ve,Ze,le,fe,Qe,Ee,tt);T.pixelStorei(T.UNPACK_ROW_LENGTH,Ke),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Bt),T.pixelStorei(T.UNPACK_SKIP_PIXELS,si),T.pixelStorei(T.UNPACK_SKIP_ROWS,kt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,ki),J===0&&D.generateMipmaps&&T.generateMipmap(st),ge.unbindTexture()},this.initRenderTarget=function(v){Ae.get(v).__webglFramebuffer===void 0&&Oe.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Oe.setTextureCube(v,0):v.isData3DTexture?Oe.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Oe.setTexture2DArray(v,0):Oe.setTexture2D(v,0),ge.unbindTexture()},this.resetState=function(){w=0,R=0,U=null,ge.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return on}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}const rn=(s,e,t)=>Math.min(t,Math.max(e,s)),Fr=(s,e,t)=>s+(e-s)*t,ug=(s,e,t)=>(t-s)/(e-s),El=(s,e,t)=>{const n=rn(ug(s,e,t),0,1);return n*n*(3-2*n)},wl=(s,e)=>Math.floor(s/e),Tl=(s,e)=>{const t=s%e;return t<0?t+e:t},fg=(s,e,t,n)=>{const i=s-t,r=e-n;return i*i+r*r},pg={air:{id:0,key:"air",label:"Air",solid:!1,mineable:!1,placeable:!1,mineDurationMs:0,uiColor:"transparent"},grass:{id:1,key:"grass",label:"Grass",solid:!0,mineable:!0,placeable:!0,mineDurationMs:600,textureTop:"grass_top",textureSide:"grass_side",textureBottom:"dirt",uiColor:"#6eb75e"},dirt:{id:2,key:"dirt",label:"Dirt",solid:!0,mineable:!0,placeable:!0,mineDurationMs:550,textureTop:"dirt",textureSide:"dirt",textureBottom:"dirt",uiColor:"#8d5a34"},stone:{id:3,key:"stone",label:"Stone",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1700,textureTop:"stone",textureSide:"stone",textureBottom:"stone",uiColor:"#87898e"},wood:{id:4,key:"wood",label:"Log",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1250,textureTop:"wood_top",textureSide:"wood_side",textureBottom:"wood_top",uiColor:"#8c6239"},leaves:{id:5,key:"leaves",label:"Leaves",solid:!0,mineable:!0,placeable:!0,mineDurationMs:500,textureTop:"leaves",textureSide:"leaves",textureBottom:"leaves",uiColor:"#4d8748"},bedrock:{id:6,key:"bedrock",label:"Bedrock",solid:!0,mineable:!1,placeable:!1,mineDurationMs:0,textureTop:"bedrock",textureSide:"bedrock",textureBottom:"bedrock",uiColor:"#393a3c"},planks:{id:7,key:"planks",label:"Planks",solid:!0,mineable:!0,placeable:!0,mineDurationMs:700,textureTop:"planks",textureSide:"planks",textureBottom:"planks",uiColor:"#c08b51"},crafting_table:{id:8,key:"crafting_table",label:"Crafting Table",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1200,textureTop:"crafting_table_top",textureSide:"crafting_table_side",textureBottom:"planks",uiColor:"#8b623c"},stone_bricks:{id:9,key:"stone_bricks",label:"Stone Bricks",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1900,textureTop:"stone_bricks",textureSide:"stone_bricks",textureBottom:"stone_bricks",uiColor:"#8a8d95"},water:{id:10,key:"water",label:"Water",solid:!1,mineable:!1,placeable:!1,mineDurationMs:0,textureTop:"water",textureSide:"water",textureBottom:"water",transparent:!0,liquid:!0,uiColor:"#4f89d6"},sand:{id:11,key:"sand",label:"Sand",solid:!0,mineable:!0,placeable:!0,mineDurationMs:650,textureTop:"sand",textureSide:"sand",textureBottom:"sand",uiColor:"#d8c07f"},clay:{id:12,key:"clay",label:"Clay",solid:!0,mineable:!0,placeable:!0,mineDurationMs:900,textureTop:"clay",textureSide:"clay",textureBottom:"clay",uiColor:"#8ea2b7"},mud:{id:13,key:"mud",label:"Mud",solid:!0,mineable:!0,placeable:!0,mineDurationMs:820,textureTop:"mud",textureSide:"mud",textureBottom:"mud",uiColor:"#4f463c"},grass_plant:{id:14,key:"grass_plant",label:"Tall Grass",solid:!1,mineable:!0,placeable:!0,mineDurationMs:280,textureTop:"grass_plant",textureSide:"grass_plant",textureBottom:"grass_plant",transparent:!0,plant:!0,uiColor:"#6cab58"},flower_red:{id:15,key:"flower_red",label:"Red Flower",solid:!1,mineable:!0,placeable:!0,mineDurationMs:260,textureTop:"flower_red",textureSide:"flower_red",textureBottom:"flower_red",transparent:!0,plant:!0,uiColor:"#d3504f"}},kc=new Map(Object.values(pg).map(s=>[s.id,s])),On=s=>{const e=kc.get(s);if(!e)throw new Error(`Unknown block id ${s}`);return e},Rs=s=>On(s).label,wi=s=>s===null?"transparent":kc.get(s)?.uiColor??"#000",mg=s=>On(s).mineDurationMs,kn=s=>On(s).solid,Or=s=>On(s).mineable,gg=s=>On(s).placeable,$s=s=>On(s).liquid===!0,Cl=s=>On(s).plant===!0,vt=Ie.colliderWidth/2,Qi=Ie.colliderHeight,Ag=(s,e)=>{const t=Math.floor(e[0]-vt),n=Math.floor(e[0]+vt),i=Math.floor(e[1]),r=Math.floor(e[1]+Qi-.001),a=Math.floor(e[2]-vt),o=Math.floor(e[2]+vt);for(let l=t;l<=n;l+=1)for(let c=i;c<=r;c+=1)for(let h=a;h<=o;h+=1)if(kn(s.getBlock(l,c,h)))return!0;return!1},Rl=(s,e,t=.06)=>{const n=Math.floor(e[1]-t),i=Math.max(.02,vt-.03),r=[[0,0],[-i,-i],[i,-i],[-i,i],[i,i]];for(const[a,o]of r){const l=Math.floor(e[0]+a),c=Math.floor(e[2]+o);if(kn(s.getBlock(l,n,c)))return!0}return!1},zr=(s,e,t,n)=>{let i=!1,r=0;for(;Ag(s,e)&&r<8;){if(i=!0,n===0)if(t[0]>0){const a=Math.floor(e[0]+vt);e[0]=a-vt-.001}else if(t[0]<0){const a=Math.floor(e[0]-vt);e[0]=a+1+vt+.001}else break;else if(n===1)if(t[1]>0){const a=Math.floor(e[1]+Qi);e[1]=a-Qi-.001}else if(t[1]<0){const a=Math.floor(e[1]);e[1]=a+1}else break;else if(t[2]>0){const a=Math.floor(e[2]+vt);e[2]=a-vt-.001}else if(t[2]<0){const a=Math.floor(e[2]-vt);e[2]=a+1+vt+.001}else break;r+=1}return i};class In{static simulate(e,t,n,i){const r=[...t],a=[...n];let o=!1;return r[0]+=a[0]*i,zr(e,r,a,0)&&(a[0]=0),r[2]+=a[2]*i,zr(e,r,a,2)&&(a[2]=0),r[1]+=a[1]*i,zr(e,r,a,1)?(o=a[1]<=0,a[1]=0):o=Rl(e,r),{position:r,velocity:a,grounded:o}}static wouldCollideWithBlock(e,t,n,i){const r=e[0]-vt,a=e[0]+vt,o=e[1],l=e[1]+Qi,c=e[2]-vt,h=e[2]+vt;return!(a<=t||r>=t+1||l<=n||o>=n+1||h<=i||c>=i+1)}static sampleWater(e,t){const n=Math.floor(t[0]),i=Math.floor(t[2]),r=Math.floor(t[1]);let a=0;for(let o=0;o<=Math.ceil(Qi);o+=1)$s(e.getBlock(n,r+o,i))&&(a+=1);return{inWater:a>0,depthBlocks:a}}static hasGroundSupport(e,t){return Rl(e,t)}}class Pl{state;grounded=!1;crouched=!1;sprinting=!1;sprintToggle=!1;inWater=!1;jumpCooldownMs=0;groundedDurationMs=0;coyoteTimeMs=0;jumpBufferMs=0;sprintCarryInAir=!1;allowHeldJump=!1;waterSurfaceRiseLockMs=0;moveVector=new B;upAxis=new B(0,1,0);lookEuler=new tn(0,0,0,"YXZ");constructor(e){this.state=e}update(e,t,n,i){const r=e*1e3,a=e/Ie.mcTickSeconds;this.jumpCooldownMs=Math.max(0,this.jumpCooldownMs-r),this.coyoteTimeMs=Math.max(0,this.coyoteTimeMs-r),this.jumpBufferMs=Math.max(0,this.jumpBufferMs-r),this.waterSurfaceRiseLockMs=Math.max(0,this.waterSurfaceRiseLockMs-r),this.grounded?(this.groundedDurationMs+=r,this.coyoteTimeMs=Ie.coyoteTimeMs):this.groundedDurationMs=0;const o=t.consumeLookDelta();this.state.yaw-=o.x*Ie.mouseSensitivity,this.state.pitch=rn(this.state.pitch-o.y*Ie.mouseSensitivity,-Math.PI/2+.01,Math.PI/2-.01);const l=Number(t.isAnyKeyDown([i.moveLeft.primary,i.moveLeft.secondary])),c=Number(t.isAnyKeyDown([i.moveRight.primary,i.moveRight.secondary])),h=Number(t.isAnyKeyDown([i.moveForward.primary,i.moveForward.secondary])),d=Number(t.isAnyKeyDown([i.moveBackward.primary,i.moveBackward.secondary])),u=c-l,p=h-d;this.crouched=t.isAnyKeyDown([i.crouch.primary,i.crouch.secondary]);const g=t.isAnyKeyDown([i.sprint.primary,i.sprint.secondary]),_=t.consumeAnyJustPressed([i.sprint.primary,i.sprint.secondary]),m=t.isAnyKeyDown([i.jump.primary,i.jump.secondary]),f=t.consumeAnyJustPressed([i.jump.primary,i.jump.secondary]);f&&(this.jumpBufferMs=Ie.jumpBufferMs),m||(this.allowHeldJump=!1);const E=this.inWater,b=In.sampleWater(n,this.state.position);this.inWater=b.inWater,this.inWater||(this.waterSurfaceRiseLockMs=0);const y=new B(u,0,-p);y.lengthSq()>1&&y.normalize();const C=y.lengthSq()>0;C?this.moveVector.copy(y).applyAxisAngle(this.upAxis,this.state.yaw):this.moveVector.set(0,0,0);const w=this.grounded&&this.state.velocity[1]<=.04,R=p>0,U=w&&R&&!m&&C?this.hasSprintObstacle(n,this.moveVector):!1;_&&R&&!this.crouched&&!U&&(this.sprintToggle=!0),this.sprintToggle&&(!C||d>0||this.crouched)&&(this.sprintToggle=!1);const S=(g||this.sprintToggle)&&R&&!this.crouched&&!U;if(this.inWater?(this.sprinting=!1,this.sprintToggle=!1,this.sprintCarryInAir=!1):w?(this.sprinting=S,this.sprintCarryInAir=S):(S&&(this.sprintCarryInAir=!0),(d>0||this.crouched)&&(this.sprintCarryInAir=!1),this.sprinting=this.sprintCarryInAir),C&&(this.sprinting&&R&&Math.abs(u)>0&&(y.x*=w?Ie.groundSprintForwardStrafeScale:Ie.airSprintForwardStrafeScale,y.normalize()),this.moveVector.copy(y).applyAxisAngle(this.upAxis,this.state.yaw)),this.inWater){const z=this.crouched?Ie.crouchSpeed:this.sprinting?Ie.sprintSpeed:Ie.walkSpeed,ie=!this.grounded&&this.sprinting&&Math.abs(y.x)>0?Ie.walkSpeed:z,ae=new B(y.x*ie*.62,0,y.z*z*.62);ae.applyAxisAngle(this.upAxis,this.state.yaw),this.state.velocity[0]=ae.x,this.state.velocity[2]=ae.z;const pe=b.depthBlocks>=2?5.2:2.1,De=!E&&this.inWater,qe=b.depthBlocks<=1;if(De&&m&&qe&&this.state.velocity[1]<=0&&(this.waterSurfaceRiseLockMs=140),m&&qe&&this.waterSurfaceRiseLockMs>0){const Fe=this.crouched?-2.15:-.95;this.state.velocity[1]=Math.min(this.state.velocity[1],Fe)}else if(m)this.state.velocity[1]=Math.min(4.1,this.state.velocity[1]+12*e);else{const Fe=this.crouched?2.4:0;this.state.velocity[1]=Math.max(this.state.velocity[1]-(pe+Fe)*e,-4.5)}(b.depthBlocks>=2||!m)&&(this.waterSurfaceRiseLockMs=0),this.state.velocity[1]*=.96}else{const z=w?Ie.groundFrictionTick:Ie.airFrictionTick,ie=Math.pow(z,a);this.state.velocity[0]*=ie,this.state.velocity[2]*=ie;const ae=Math.hypot(this.state.velocity[0],this.state.velocity[2]);if(C){let He=w?this.crouched?Ie.groundCrouchAccelerationTick:this.sprinting?Ie.groundSprintAccelerationTick:Ie.groundWalkAccelerationTick:this.sprinting?Ie.airSprintAccelerationTick:Ie.airWalkAccelerationTick;!w&&Math.abs(u)>0&&(this.sprinting?He*=p>0?Ie.airSprintSideControlPenalty:Ie.airStrafePenalty:R||(He*=Ie.airStrafePenalty));const Fe=He*(1/Ie.mcTickSeconds);this.state.velocity[0]+=this.moveVector.x*Fe*a,this.state.velocity[2]+=this.moveVector.z*Fe*a}if(!w&&this.state.velocity[1]<0&&Math.abs(u)>0&&p<=0){const He=Math.hypot(this.state.velocity[0],this.state.velocity[2]),Fe=Math.max(ae,Ie.fallStrafeBaseControlSpeed);if(He>Fe&&He>1e-4){const X=Fe/He;this.state.velocity[0]*=X,this.state.velocity[2]*=X}}const pe=w?this.crouched?Ie.crouchSpeed:this.sprinting?Ie.sprintSpeed:Ie.walkSpeed:this.sprinting?Ie.airborneSprintSpeed:Ie.airborneWalkSpeed,De=Math.min(Ie.maxHorizontalSpeed,pe),qe=Math.hypot(this.state.velocity[0],this.state.velocity[2]);if(qe>De&&qe>1e-4){const He=De/qe;this.state.velocity[0]*=He,this.state.velocity[2]*=He}this.crouched&&w&&!m&&this.applyCrouchEdgeClamp(n,e),this.state.velocity[1]-=Ie.gravity*e,this.state.velocity[1]*=Math.pow(Ie.verticalDragTick,a),this.state.velocity[1]=Math.max(this.state.velocity[1],-22)}if(!this.inWater&&this.state.velocity[1]<-4.2){const[z,ie,ae]=this.state.position,pe=Math.min(e,Ie.landingProbeSeconds),De=[z,ie+this.state.velocity[1]*pe,ae];In.hasGroundSupport(n,De)&&(this.state.velocity[1]*=Ie.landingApproachDamping)}let P=!1;const k=m&&!f&&this.allowHeldJump&&this.groundedDurationMs>=Ie.autoJumpGroundedDelayMs,G=this.jumpBufferMs>0||k,Y=w||this.coyoteTimeMs>0;if(!this.inWater&&Y&&G&&this.jumpCooldownMs<=0&&(this.state.velocity[1]=Ie.jumpVelocity,this.grounded=!1,P=!0,this.groundedDurationMs=0,this.coyoteTimeMs=0,this.jumpBufferMs=0,this.jumpCooldownMs=Ie.jumpRepeatDelayMs,this.allowHeldJump=!1,this.sprinting&&R)){const z=new B(0,0,-1).applyAxisAngle(this.upAxis,this.state.yaw);this.state.velocity[0]+=z.x*Ie.sprintJumpBoost,this.state.velocity[2]+=z.z*Ie.sprintJumpBoost}const K=this.grounded,W=this.state.velocity[1],Q=In.simulate(n,this.state.position,this.state.velocity,e);return this.state.position=Q.position,this.state.velocity=Q.velocity,this.grounded=Q.grounded,!K&&this.grounded&&(this.groundedDurationMs=0,this.allowHeldJump=W<-.2,this.coyoteTimeMs=Ie.coyoteTimeMs,this.jumpCooldownMs=Math.max(this.jumpCooldownMs,Ie.landingJumpCooldownMs)),this.grounded||(this.groundedDurationMs=0,this.coyoteTimeMs<=0&&(this.allowHeldJump=!1),(d>0||this.crouched)&&(this.sprintCarryInAir=!1)),this.state.position[1]<-16&&this.respawn(),{jumped:P,sprinting:this.sprinting,moving:C}}respawn(){this.state.position=[...this.state.spawnPoint],this.state.velocity=[0,0,0],this.sprintCarryInAir=!1,this.waterSurfaceRiseLockMs=0}setSelectedSlot(e){this.state.selectedSlot=e}getState(){return{...this.state,position:[...this.state.position],velocity:[...this.state.velocity],spawnPoint:[...this.state.spawnPoint]}}getPosition(){return[...this.state.position]}getCameraPosition(){return{x:this.state.position[0],y:this.state.position[1]+(this.crouched?Ie.crouchEyeHeight:Ie.eyeHeight),z:this.state.position[2]}}getRotation(){return{yaw:this.state.yaw,pitch:this.state.pitch}}getLookDirection(){const e=new B(0,0,-1);return this.lookEuler.set(this.state.pitch,this.state.yaw,0,"YXZ"),e.applyEuler(this.lookEuler),{x:e.x,y:e.y,z:e.z}}canOccupyBlock(e,t,n){return!In.wouldCollideWithBlock(this.state.position,e,t,n)}isCrouched(){return this.crouched}isGrounded(){return this.grounded}isInWater(){return this.inWater}applyCrouchEdgeClamp(e,t){const[n,i,r]=this.state.position;if(!In.hasGroundSupport(e,[n,i,r]))return;const a=n+this.state.velocity[0]*t,o=r+this.state.velocity[2]*t;if(In.hasGroundSupport(e,[a,i,o]))return;const l=In.hasGroundSupport(e,[a,i,r]),c=In.hasGroundSupport(e,[n,i,o]);l||(this.state.velocity[0]=0),c||(this.state.velocity[2]=0)}hasSprintObstacle(e,t){const[n,i,r]=this.state.position,a=t.clone().normalize(),o=new B(-a.z,0,a.x),l=.45,c=n+a.x*l,h=r+a.z*l,d=Math.floor(i+.08),u=Math.floor(i+(this.crouched?1.05:1.4)),p=Math.floor(i+(this.crouched?1.45:1.72));for(const g of[-.16,0,.16]){const _=Math.floor(c+o.x*g),m=Math.floor(h+o.z*g);if(kn(e.getBlock(_,d,m))||kn(e.getBlock(_,u,m))||kn(e.getBlock(_,p,m)))return!0}return!1}}class Il{static resolve(e){for(let t=0;t<=8;t+=1)for(let n=-t;n<=t;n+=1)for(let i=-t;i<=t;i+=1){const a=e.getTopSolidBlockY(n,i)+1;if(e.getBlock(n,a,i)===0&&e.getBlock(n,a+1,i)===0)return[n+.5,a,i+.5]}return[.5,48,.5]}}const Tt=({x:s,z:e})=>`${s},${e}`,_g=s=>{const[e,t]=s.split(",").map(n=>Number.parseInt(n,10));return{x:e,z:t}},Gr=(s,e)=>({x:wl(s,Ge.chunkSizeX),z:wl(e,Ge.chunkSizeZ)}),Dl=(s,e,t)=>({x:Tl(s,Ge.chunkSizeX),y:e,z:Tl(t,Ge.chunkSizeZ)}),Li=s=>s.x*Ge.chunkSizeX,Ui=s=>s.z*Ge.chunkSizeZ,vg=[{normal:[1,0,0],corners:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]],texture:"side"},{normal:[-1,0,0],corners:[[0,0,1],[0,1,1],[0,1,0],[0,0,0]],texture:"side"},{normal:[0,1,0],corners:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],texture:"top"},{normal:[0,-1,0],corners:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],texture:"bottom"},{normal:[0,0,1],corners:[[1,0,1],[1,1,1],[0,1,1],[0,0,1]],texture:"side"},{normal:[0,0,-1],corners:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]],texture:"side"}];class xi{static buildGeometry(e,t,n){const i=[],r=[],a=[],o=Li(e.coord),l=Ui(e.coord);for(let h=0;h<96;h+=1)for(let d=0;d<16;d+=1)for(let u=0;u<16;u+=1){const p=e.getBlock(u,h,d);if(p!==0){if(Cl(p)){const g=xi.getFaceTextureRect(p,"side",n);xi.pushPlantCross(i,r,a,u,h,d,g);continue}for(const g of vg){const _=t.getBlock(o+u+g.normal[0],h+g.normal[1],l+d+g.normal[2]);if($s(p)&&$s(_)||kn(_)&&!Cl(_))continue;const m=xi.getFaceTextureRect(p,g.texture,n),f=[[m.u0,m.v1],[m.u0,m.v0],[m.u1,m.v0],[m.u1,m.v1]],E=[0,1,2,0,2,3];for(const b of E){const[y,C,w]=g.corners[b];i.push(u+y,h+C,d+w),r.push(...g.normal),a.push(...f[b])}}}}const c=new bn;return c.setAttribute("position",new zt(i,3)),c.setAttribute("normal",new zt(r,3)),c.setAttribute("uv",new zt(a,2)),c.computeBoundingSphere(),c}static pushPlantCross(e,t,n,i,r,a,o){[[[i+.14,r,a+.14],[i+.86,r,a+.86],[i+.86,r+.92,a+.86],[i+.14,r+.92,a+.14],[.7,0,.7]],[[i+.86,r,a+.14],[i+.14,r,a+.86],[i+.14,r+.92,a+.86],[i+.86,r+.92,a+.14],[-.7,0,.7]]].forEach(([u,p,g,_,m])=>{xi.pushQuadDoubleSided(e,t,n,u,p,g,_,m,o)})}static pushQuadDoubleSided(e,t,n,i,r,a,o,l,c){const h=[[c.u0,c.v1],[c.u1,c.v1],[c.u1,c.v0],[c.u0,c.v0]],d=[0,1,2,0,2,3],u=[0,2,1,0,3,2],p=[i,r,a,o];d.forEach(g=>{const _=p[g];e.push(_[0],_[1],_[2]),t.push(l[0],l[1],l[2]),n.push(...h[g])}),u.forEach(g=>{const _=p[g];e.push(_[0],_[1],_[2]),t.push(-l[0],-l[1],-l[2]),n.push(...h[g])})}static getFaceTextureRect(e,t,n){const i=On(e);return t==="top"?n.getTileRect(i.textureTop??i.textureSide??"dirt"):t==="bottom"?n.getTileRect(i.textureBottom??i.textureSide??i.textureTop??"dirt"):n.getTileRect(i.textureSide??i.textureTop??"dirt")}}const Sg=s=>{const e=new fo("#e8f4ff",.3),t=new Eh("#bfe3ff","#4f5b3f",.9),n=new js("#ffe8b9",1.45),i=new At;return n.castShadow=!0,n.shadow.mapSize.set(1536,1536),n.shadow.camera.near=1,n.shadow.camera.far=190,n.shadow.camera.left=-58,n.shadow.camera.right=58,n.shadow.camera.top=58,n.shadow.camera.bottom=-58,n.shadow.bias=-25e-5,n.shadow.normalBias=.02,n.target=i,s.add(e,t,n,i),{ambient:e,skyBounce:t,sun:n,sunTarget:i}},Ll=(s,e,t)=>{s.sun.position.set(e+52,78,t+34),s.sunTarget.position.set(e,12,t),s.sunTarget.updateMatrixWorld()},_t=64,Mg=()=>{const s=document.createElement("canvas");s.width=_t,s.height=_t;const e=s.getContext("2d");return e&&(e.clearRect(0,0,_t,_t),e.fillStyle="#d9ab84",e.fillRect(8,8,8,8),e.fillRect(20,20,8,12),e.fillStyle="#5a86c8",e.fillRect(44,20,4,12),e.fillRect(36,52,4,12),e.fillStyle="#3a4f78",e.fillRect(4,20,4,12),e.fillRect(20,52,4,12)),s},Ul=s=>{const e=new Tc(s);return e.magFilter=It,e.minFilter=It,e.colorSpace=St,e.wrapS=Sn,e.wrapT=Sn,e.generateMipmaps=!1,e.needsUpdate=!0,e},Ga=(s,e,t,n,i)=>{const r=s.getImageData(e,t,n,i);for(let a=0;a<n;a+=1)for(let o=0;o<i;o+=1){const l=(a+o*n)*4;if(r.data[l+3]!==255)return!0}return!1},yg=(s,e,t,n,i)=>{const r=s.getImageData(e,t,n,i);for(let a=0;a<n;a+=1)for(let o=0;o<i;o+=1){const l=(a+o*n)*4;if(!(r.data[l+0]===0&&r.data[l+1]===0&&r.data[l+2]===0&&r.data[l+3]===255))return!1}return!0},xg=(s,e,t,n,i)=>{const r=s.getImageData(e,t,n,i);for(let a=0;a<n;a+=1)for(let o=0;o<i;o+=1){const l=(a+o*n)*4;if(!(r.data[l+0]===255&&r.data[l+1]===255&&r.data[l+2]===255&&r.data[l+3]===255))return!1}return!0},go=s=>s/64,Nl=(s,e,t)=>{if(t){if(Ga(s,0,0,e,e))return}else if(Ga(s,0,0,e,e/2))return;const n=go(e),i=(r,a,o,l)=>{s.clearRect(r*n,a*n,o*n,l*n)};i(40,0,8,8),i(48,0,8,8),i(32,8,8,8),i(40,8,8,8),i(48,8,8,8),i(56,8,8,8),t&&(i(4,32,4,4),i(8,32,4,4),i(0,36,4,12),i(4,36,4,12),i(8,36,4,12),i(12,36,4,12),i(20,32,8,4),i(28,32,8,4),i(16,36,4,12),i(20,36,8,12),i(28,36,4,12),i(32,36,8,12),i(44,32,4,4),i(48,32,4,4),i(40,36,4,12),i(44,36,4,12),i(48,36,4,12),i(52,36,12,12),i(4,48,4,4),i(8,48,4,4),i(0,52,4,12),i(4,52,4,12),i(8,52,4,12),i(12,52,4,12),i(52,48,4,4),i(56,48,4,4),i(48,52,4,12),i(52,52,4,12),i(56,52,4,12),i(60,52,4,12))},bg=(s,e)=>{s.save(),s.scale(-1,1);const t=go(e),n=(i,r,a,o,l,c)=>{s.drawImage(s.canvas,i*t,r*t,a*t,o*t,-l*t,c*t,-a*t,o*t)};n(4,16,4,4,20,48),n(8,16,4,4,24,48),n(0,20,4,12,24,52),n(4,20,4,12,20,52),n(8,20,4,12,16,52),n(12,20,4,12,28,52),n(44,16,4,4,36,48),n(48,16,4,4,40,48),n(40,20,4,12,40,52),n(44,20,4,12,36,52),n(48,20,4,12,32,52),n(52,20,4,12,44,52),s.restore()},Eg=s=>{const e=go(s.width),t=s.getContext("2d",{willReadFrequently:!0});if(!t)return"classic";const n=(o,l,c,h)=>Ga(t,o*e,l*e,c*e,h*e),i=(o,l,c,h)=>yg(t,o*e,l*e,c*e,h*e),r=(o,l,c,h)=>xg(t,o*e,l*e,c*e,h*e);return n(50,16,2,4)||n(54,20,2,12)||n(42,48,2,4)||n(46,52,2,12)||i(50,16,2,4)&&i(54,20,2,12)&&i(42,48,2,4)&&i(46,52,2,12)||r(50,16,2,4)&&r(54,20,2,12)&&r(42,48,2,4)&&r(46,52,2,12)?"slim":"classic"},wg=async s=>new Promise((e,t)=>{const n=new Image;n.onload=()=>e(n),n.onerror=()=>t(new Error("Skin image load error")),n.src=s}),Tg=s=>{const e=document.createElement("canvas");e.width=_t,e.height=_t;const t=e.getContext("2d",{willReadFrequently:!0});if(!t)return{canvas:e,model:"classic"};t.imageSmoothingEnabled=!1,t.clearRect(0,0,_t,_t);const n=s.width===s.height*2;if(!n&&s.width!==s.height)throw new Error(`Bad skin size: ${s.width}x${s.height}`);return n?(t.drawImage(s,0,0,_t,_t/2),bg(t,_t),Nl(t,_t,!1)):(t.drawImage(s,0,0,_t,_t),Nl(t,_t,!0)),{canvas:e,model:Eg(e)}},vi=(s,e,t,n,i,r)=>[new Xe(s/i,1-n/r),new Xe(t/i,1-n/r),new Xe(t/i,1-e/r),new Xe(s/i,1-e/r)],Cg=(s,e,t,n,i,r,a,o)=>{const l=vi(e+r,t,e+n+r,t+r,a,o),c=vi(e+n+r,t,e+n*2+r,t+r,a,o),h=vi(e,t+r,e+r,t+r+i,a,o),d=vi(e+r,t+r,e+n+r,t+r+i,a,o),u=vi(e+n+r,t+r,e+n+r*2,t+i+r,a,o),p=vi(e+n+r*2,t+r,e+n*2+r*2,t+i+r,a,o),g=[u[3],u[2],u[0],u[1]],_=[h[3],h[2],h[0],h[1]],m=[l[3],l[2],l[0],l[1]],f=[c[0],c[1],c[3],c[2]],E=[d[3],d[2],d[0],d[1]],b=[p[3],p[2],p[0],p[1]],y=[];for(const w of[g,_,m,f,E,b])for(const R of w)y.push(R.x,R.y);const C=s.getAttribute("uv");C.set(new Float32Array(y)),C.needsUpdate=!0},Rg=(s,e,t,n,i,r)=>{Cg(s,e,t,n,i,r,_t,_t)},Ps=.42,Si=.01,Pg=16,Fc=s=>{const e=s.image;if(!(e instanceof HTMLCanvasElement))return null;const t=e.getContext("2d",{willReadFrequently:!0});if(!t)return null;const n=t.getImageData(0,0,e.width,e.height);return{width:e.width,height:e.height,data:n.data}},Ig=(s,e,t)=>{if(e<0||t<0||e>=s.width||t>=s.height)return{r:0,g:0,b:0,a:0};const n=(t*s.width+e)*4;return{r:s.data[n],g:s.data[n+1],b:s.data[n+2],a:s.data[n+3]}},Dg=(s,e,t,n)=>new er({color:s<<16|e<<8|t,transparent:n<255,opacity:Math.max(.02,n/255),alphaTest:.02,side:cn,depthWrite:n>=254}),Lg=(s,e,t,n,i)=>({top:{x:s+i,y:e,w:t,h:i},bottom:{x:s+t+i,y:e,w:t,h:i},left:{x:s,y:e+i,w:i,h:n},front:{x:s+i,y:e+i,w:t,h:n},right:{x:s+t+i,y:e+i,w:i,h:n},back:{x:s+t+i*2,y:e+i,w:t,h:n}}),Ug=(s,e,t,n,i,r=[])=>{const a=new en;if(!s)return a;const o=Lg(i[0],i[1],e,t,n),l=new Set(r),c=new Map,h=Ps/2,d=new Gt(Ps/16,1/16,1/16),u=new Gt(1/16,Ps/16,1/16),p=new Gt(1/16,1/16,Ps/16),g=(_,m,f)=>{const E=t/2-f-.5;switch(_){case"front":return{x:-e/2+m+.5,y:E,z:n/2+h+Si,geometry:p};case"back":return{x:e/2-m-.5,y:E,z:-n/2-h-Si,geometry:p};case"right":return{x:e/2+h+Si,y:E,z:n/2-m-.5,geometry:d};case"left":return{x:-e/2-h-Si,y:E,z:-n/2+m+.5,geometry:d};case"top":return{x:-e/2+m+.5,y:t/2+h+Si,z:-n/2+f+.5,geometry:u};default:return{x:-e/2+m+.5,y:-t/2-h-Si,z:n/2-f-.5,geometry:u}}};return Object.keys(o).forEach(_=>{if(l.has(_))return;const m=o[_];for(let f=0;f<m.h;f+=1)for(let E=0;E<m.w;E+=1){const b=m.x+E,y=m.y+f,{r:C,g:w,b:R,a:U}=Ig(s,b,y);if(U<Pg)continue;const M=C<<24|w<<16|R<<8|U;let S=c.get(M);S||(S=Dg(C,w,R,U),c.set(M,S));const P=g(_,E,f),k=new Mt(P.geometry,S);k.position.set(P.x/16,P.y/16,P.z/16),k.castShadow=!0,k.receiveShadow=!0,a.add(k)}}),a},Ng=(s,e,t,n,i,r)=>{const a=new Gt(s/16,e/16,t/16);Rg(a,n,i,s,e,t);const o=new er({map:r,side:cn,transparent:!1}),l=new Mt(a,o);return l.castShadow=!0,l.receiveShadow=!0,l},Jn=(s,e)=>{const t=new en,n=Ng(e.width,e.height,e.depth,e.innerUv[0],e.innerUv[1],e.texture),i=Ug(e.sampler,e.width,e.height,e.depth,e.outerUv,e.hiddenOverlayFaces);t.add(n,i),t.position.set(...e.position),s.add(t)},Ti=async s=>{if(!s){const n=Mg();return{texture:Ul(n),model:"classic"}}const e=await wg(s),t=Tg(e);return{texture:Ul(t.canvas),model:t.model}},Bg=(s,e="classic")=>{const t=new en,n=e==="slim"?3:4,i=e==="slim"?5.5/16:6/16,r=Fc(s);return Jn(t,{width:8,height:8,depth:8,innerUv:[0,0],outerUv:[32,0],sampler:r,position:[0,28/16,0],texture:s}),Jn(t,{width:8,height:12,depth:4,innerUv:[16,16],outerUv:[16,32],sampler:r,hiddenOverlayFaces:["left","right"],position:[0,18/16,0],texture:s}),Jn(t,{width:n,height:12,depth:4,innerUv:[40,16],outerUv:[40,32],sampler:r,hiddenOverlayFaces:["right","top"],position:[-i,18/16,0],texture:s}),Jn(t,{width:n,height:12,depth:4,innerUv:[32,48],outerUv:[48,48],sampler:r,hiddenOverlayFaces:["left","top"],position:[i,18/16,0],texture:s}),Jn(t,{width:4,height:12,depth:4,innerUv:[0,16],outerUv:[0,32],sampler:r,hiddenOverlayFaces:["right"],position:[-2/16,6/16,-.1/16],texture:s}),Jn(t,{width:4,height:12,depth:4,innerUv:[16,48],outerUv:[0,48],sampler:r,hiddenOverlayFaces:["left"],position:[2/16,6/16,-.1/16],texture:s}),t},kg=(s,e="classic")=>{const t=e==="slim"?3:4,n=new en,i=new en,r=Fc(s);return Jn(i,{width:t,height:12,depth:4,innerUv:[40,16],outerUv:[40,32],sampler:r,position:[0,0,0],texture:s}),i.rotation.set(Math.PI,Math.PI,0),n.add(i),n.position.x=.12,n.position.y=-.01,n.position.z=.045,n.rotation.x=-.14,n.rotation.y=-.8,n.rotation.z=.44,n.scale.set(1.25,1.25,1.25),n},Ha=s=>{const e=new Set,t=new Set,n=new Set;s.traverse(i=>{const r=i;if(r.geometry){const a=r.geometry;e.has(a)||(a.dispose(),e.add(a))}r.material&&(Array.isArray(r.material)?r.material:[r.material]).forEach(o=>{const l=o;l.map&&!n.has(l.map)&&(l.map.dispose(),n.add(l.map)),t.has(l)||(l.dispose(),t.add(l))})})};class Fg{group=new en;constructor(){const e=new xn({side:Pt,uniforms:{topColor:{value:new Ne("#7eb8f7")},horizonColor:{value:new Ne("#c9e6ff")},bottomColor:{value:new Ne("#f7ddb1")},sunDirection:{value:{x:.28,y:.82,z:.46}}},vertexShader:`
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
      `,depthWrite:!1}),t=new Mt(new ho(280,24,16),e);t.frustumCulled=!1,this.group.add(t);const n=new Ji({color:"#ffffff",transparent:!0,opacity:.18,depthWrite:!1}),i=new Gt(10,2.4,6);[[-70,54,-50],[48,60,-20],[96,58,36],[-108,62,18],[8,56,88],[-34,64,104]].forEach(([a,o,l],c)=>{const h=new Mt(i,n);h.position.set(a,o,l),h.scale.set(1.4+c%3*.24,1,1.15+c%2*.18),h.rotation.y=c*.28,this.group.add(h)})}update(e,t){this.group.position.set(e,0,t)}}const be=16,Is=4,Bl=["grass_top","grass_side","dirt","stone","wood_side","wood_top","leaves","bedrock","planks","crafting_table_top","crafting_table_side","stone_bricks","water","sand","clay","mud","grass_plant","flower_red"],Yi=(s,e,t)=>{let n=Math.imul(s+t*157,374761393)^Math.imul(e+t*311,668265263);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967295},Va=(s,e)=>s[Math.min(s.length-1,Math.floor(e*s.length))],wt=(s,e,t,n,i)=>{for(let r=0;r<be;r+=1)for(let a=0;a<be;a+=1)s.fillStyle=Va(n,Yi(a,r,i)),s.fillRect(e+a,t+r,1,1)},Wi=(s,e,t,n,i,r=.25)=>{const a=s.createLinearGradient(0,t,0,t+be);a.addColorStop(0,n),a.addColorStop(1,i),s.globalAlpha=r,s.fillStyle=a,s.fillRect(e,t,be,be),s.globalAlpha=1},jt=(s,e,t,n,i,r)=>{s.fillStyle=n;for(let a=0;a<be;a+=1)for(let o=0;o<be;o+=1)Yi(o,a,i)>r&&s.fillRect(e+o,t+a,1,1)};class Og{material;tileMap=new Map;constructor(){const e=document.createElement("canvas");e.width=Is*be,e.height=Math.ceil(Bl.length/Is)*be;const t=e.getContext("2d");if(!t)throw new Error("Unable to create texture atlas.");t.imageSmoothingEnabled=!1,Bl.forEach((i,r)=>{const a=r%Is,o=Math.floor(r/Is),l=a*be,c=o*be;this.drawTile(t,i,l,c);const h=.5;this.tileMap.set(i,{u0:(l+h)/e.width,v0:(c+h)/e.height,u1:(l+be-h)/e.width,v1:(c+be-h)/e.height})});const n=new Tc(e);n.magFilter=It,n.minFilter=It,n.colorSpace=St,n.generateMipmaps=!1,n.flipY=!1,this.material=new er({map:n,transparent:!0,alphaTest:.35})}getTileRect(e){const t=this.tileMap.get(e);if(!t)throw new Error(`Unknown atlas tile ${e}`);return t}drawTile(e,t,n,i){switch(t){case"grass_top":wt(e,n,i,["#4b8038","#5a9441","#67a74a","#79bb58"],11),jt(e,n,i,"#8ecb69",12,.9),jt(e,n,i,"#3f6f31",13,.92),Wi(e,n,i,"#fef08a","#000000",.08);break;case"grass_side":wt(e,n,i,["#71462a","#7b4d2e","#845735","#8d5f3c"],21);for(let r=0;r<5;r+=1)for(let a=0;a<be;a+=1){const o=Yi(a,r,22);e.fillStyle=Va(["#4f873a","#5d9842","#6aad4e","#7bbe60"],o),e.fillRect(n+a,i+r,1,1)}e.fillStyle="#5f9d45";for(let r=1;r<be;r+=2){const a=1+Math.floor(Yi(r,6,23)*3);e.fillRect(n+r,i+5,1,a)}break;case"dirt":wt(e,n,i,["#6d4327","#78492c","#845233","#915b3a"],31),jt(e,n,i,"#ab774f",32,.93),jt(e,n,i,"#59361f",33,.94);break;case"stone":wt(e,n,i,["#6f7379","#7d8289","#8c9299","#999fa6"],41),e.fillStyle="#60646a";for(let r=3;r<be;r+=5)e.fillRect(n,i+r,be,1);jt(e,n,i,"#b2b7bf",42,.94);break;case"wood_side":wt(e,n,i,["#6f4929","#7b5330","#885d36","#956844"],51),e.fillStyle="#5f3f24";for(let r=1;r<be;r+=3)e.fillRect(n+r,i,1,be);Wi(e,n,i,"#f5d7a6","#000000",.1);break;case"wood_top":for(let r=0;r<be;r+=1)for(let a=0;a<be;a+=1){const o=a-7.5,l=r-7.5,h=(Math.sin(Math.hypot(o,l)*1.8+Yi(a,r,61)*.8)*.5+.5)*.8+.2;e.fillStyle=Va(["#7b522d","#8b6238","#9f7546","#b28653"],h),e.fillRect(n+a,i+r,1,1)}e.fillStyle="#5e3f22",e.fillRect(n+7,i,1,be),e.fillRect(n,i+7,be,1);break;case"leaves":wt(e,n,i,["#356937","#3e7840","#4e8b4e","#5f9f5b"],71),jt(e,n,i,"#2d572e",72,.91),jt(e,n,i,"#78bb71",73,.93);break;case"bedrock":wt(e,n,i,["#2c2f33","#34383d","#3d4247","#474c52"],81),e.fillStyle="#1d2024",e.fillRect(n+2,i+4,11,1),e.fillRect(n+4,i+9,8,1);break;case"planks":wt(e,n,i,["#b5834c","#bf8b52","#cb9861","#d7a56e"],91),e.fillStyle="#8a5d34";for(let r=4;r<be;r+=6)e.fillRect(n,i+r,be,1);Wi(e,n,i,"#f9d7a1","#000000",.09);break;case"crafting_table_top":wt(e,n,i,["#6d4b2c","#7a5632","#87603a","#946e43"],101),e.fillStyle="#c99d66",e.fillRect(n+1,i+1,be-2,1),e.fillRect(n+1,i+be-2,be-2,1),e.fillRect(n+1,i+1,1,be-2),e.fillRect(n+be-2,i+1,1,be-2),e.fillStyle="#5f3f24",e.fillRect(n+4,i+4,be-8,be-8);break;case"crafting_table_side":wt(e,n,i,["#79512f","#865b36","#93653d","#9f7249"],111),e.fillStyle="#5d3c22",e.fillRect(n+2,i+2,be-4,be-4),e.fillStyle="#b78c57",e.fillRect(n+4,i+4,be-8,3),e.fillRect(n+4,i+9,be-8,3);break;case"stone_bricks":wt(e,n,i,["#7b7f85","#878c93","#949aa2","#a0a6ad"],121),e.fillStyle="#5e6268",e.fillRect(n,i+5,be,1),e.fillRect(n,i+11,be,1),e.fillRect(n+6,i,1,6),e.fillRect(n+12,i+5,1,7),jt(e,n,i,"#c0c5cd",122,.95);break;case"water":wt(e,n,i,["#356eb5","#3f7dc6","#4f90db","#5ca2ea"],131),Wi(e,n,i,"#d6f2ff","#0c2f66",.22),e.fillStyle="rgba(255,255,255,0.24)";for(let r=2;r<be;r+=5)e.fillRect(n,i+r,be,1);break;case"sand":wt(e,n,i,["#c6b172","#d1bb7d","#dbc78e","#e4d49f"],141),jt(e,n,i,"#b29d63",142,.92);break;case"clay":wt(e,n,i,["#7f93a8","#8ea2b7","#9eb1c5","#aebfd0"],151),jt(e,n,i,"#6a7e95",152,.93);break;case"mud":wt(e,n,i,["#3f382f","#4a4238","#564d42","#62584b"],161),Wi(e,n,i,"#8f7d65","#261f18",.17),jt(e,n,i,"#746652",162,.93);break;case"grass_plant":e.fillStyle="#00000000",e.fillRect(n,i,be,be),e.fillStyle="#5ca246";for(let r=be-1;r>=4;r-=1){const a=3+Math.floor((be-r)/4),o=be-a-1;e.fillRect(n+a,i+r,1,1),e.fillRect(n+o,i+r,1,1)}e.fillStyle="#7ec960",e.fillRect(n+7,i+4,2,be-4);break;case"flower_red":e.fillStyle="#00000000",e.fillRect(n,i,be,be),e.fillStyle="#5e9f49",e.fillRect(n+7,i+6,2,be-6),e.fillStyle="#dd5a52",e.fillRect(n+4,i+2,8,5),e.fillStyle="#f2d7a5",e.fillRect(n+7,i+4,2,2);break;default:e.fillStyle="#ff00ff",e.fillRect(n,i,be,be)}}}const Ds=75,zg=4.65,Gg=5.45,kl=.98,Fl=-.93,Ol=-.96,zl=-.28,Gl=-.34,Hl=-.09,Hr=1.15,Hg=.01,Vg=12,Vl={bobSpeed:3.8,walkBobX:.036,walkBobY:.018,walkBobZ:.009,swingDuration:.24,swingPitch:.62,swingYaw:.23,swingRoll:.41,swingForward:.09,swingRight:.11,mineSpeed:9.2,minePitch:1.12,mineYaw:.36,mineRoll:.58,mineForward:.16},Wg={bobSpeed:3.4,walkBobX:.026,walkBobY:.014,walkBobZ:.007,swingDuration:.22,swingPitch:.42,swingYaw:.18,swingRoll:.29,swingForward:.065,swingRight:.08,mineSpeed:7.1,minePitch:.68,mineYaw:.24,mineRoll:.31,mineForward:.09};class Xg{scene=new Ks;camera=new Rt(Ds,1,.1,500);handScene=new Ks;handCamera=new Rt(Ds,1,Hg,Vg);atlas=new Og;sky=new Fg;renderer;chunkMeshes=new Map;droppedItems=new Map;breakParticles=[];lights;miningOverlay;handRig=new en;handModel=null;handPhase=0;miningPhase=0;miningBlend=0;wasMiningActive=!1;actionTimer=0;actionStrength=0;jumpTimer=0;jumpStrength=0;handAnimationProfile={...Vl};skinRequestId=0;constructor(e){this.renderer=new mo({canvas:e,antialias:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.25)),this.renderer.setSize(e.clientWidth||window.innerWidth,e.clientHeight||window.innerHeight,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ac,this.renderer.outputColorSpace=St,this.renderer.toneMapping=oc,this.renderer.toneMappingExposure=1.03,this.renderer.setClearColor(new Ne(Ge.skyColor)),this.scene.background=new Ne(Ge.skyColor),this.scene.fog=new lo(new Ne("#95b9dd"),60,190),this.scene.add(this.sky.group),this.scene.add(this.camera),this.handScene.add(this.handCamera),this.handCamera.add(this.handRig),this.handRig.position.set(kl,Fl,Ol),this.handRig.rotation.set(zl,Gl,Hl),this.handRig.scale.set(Hr,Hr,Hr);const t=new fo("#ffffff",.6),n=new js("#fff2db",.95);n.position.set(1.6,2.2,2.1),this.handScene.add(t,n),this.lights=Sg(this.scene),Ll(this.lights,0,0),this.setPlayerSkin(null),this.miningOverlay=new Mt(new Gt(1.01,1.01,1.01),new Ji({color:"#111317",transparent:!0,opacity:0,depthWrite:!1})),this.miningOverlay.visible=!1,this.miningOverlay.renderOrder=10,this.scene.add(this.miningOverlay)}resize(e,t){this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.handCamera.aspect=e/t,this.handCamera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(e,t,!1)}setCameraTransform(e,t,n){this.camera.position.set(e.x,e.y,e.z),this.camera.rotation.order="YXZ",this.camera.rotation.y=t,this.camera.rotation.x=n,this.sky.update(e.x,e.z),Ll(this.lights,e.x,e.z)}upsertChunkMesh(e,t,n){const i=this.chunkMeshes.get(e);if(t.getAttribute("position").count===0){t.dispose(),i&&(this.scene.remove(i),i.geometry.dispose(),this.chunkMeshes.delete(e));return}if(i){i.geometry.dispose(),i.geometry=t,i.position.set(n.x,0,n.z);return}const r=new Mt(t,this.atlas.material);r.position.set(n.x,0,n.z),r.castShadow=!0,r.receiveShadow=!0,this.scene.add(r),this.chunkMeshes.set(e,r)}removeChunkMesh(e){const t=this.chunkMeshes.get(e);t&&(this.scene.remove(t),t.geometry.dispose(),this.chunkMeshes.delete(e))}clearChunks(){for(const e of[...this.chunkMeshes.keys()])this.removeChunkMesh(e)}setPlayerSkin(e){this.applyPlayerSkin(e)}setFirstPersonHandVisible(e){this.handRig.visible=e}setFirstPersonAnimationPreset(e){this.handAnimationProfile=e==="item"?{...Wg}:{...Vl}}setFirstPersonAnimationProfile(e){this.handAnimationProfile={...this.handAnimationProfile,...e}}triggerFirstPersonAction(e=1){const t=Math.max(.25,Math.min(1.6,e));this.actionStrength=Math.max(this.actionStrength,t),this.actionTimer=this.handAnimationProfile.swingDuration}triggerFirstPersonJump(e=1){const t=Math.max(.3,Math.min(1,e));this.jumpStrength=Math.max(this.jumpStrength,t),this.jumpTimer=.16}updateHand(e,t,n){const i=this.handAnimationProfile;this.handPhase+=e*(i.bobSpeed+t*4.4);const r=Math.max(0,t-.04),a=Math.sin(this.handPhase),o=a*(r*i.walkBobX),l=(1-Math.cos(this.handPhase*2))*.5*r*i.walkBobY*.42,c=a*r*i.walkBobZ*.22;this.actionTimer>0&&(this.actionTimer=Math.max(0,this.actionTimer-e));const h=i.swingDuration>0?1-this.actionTimer/i.swingDuration:1,d=Math.max(0,Math.min(1,h)),u=Math.sin(d*Math.PI)*Math.min(1,this.actionStrength);this.actionTimer<=0&&(this.actionStrength=Math.max(0,this.actionStrength-e*8)),this.jumpTimer>0&&(this.jumpTimer=Math.max(0,this.jumpTimer-e));const p=1-this.jumpTimer/.16,g=Math.max(0,Math.min(1,p)),m=(this.jumpTimer>0?Math.sin(g*Math.PI):0)*this.jumpStrength;this.jumpTimer<=0&&(this.jumpStrength=Math.max(0,this.jumpStrength-e*7.5)),n&&!this.wasMiningActive&&(this.miningPhase=0,this.miningBlend=0);const f=n?1:0,E=n?26:7;this.miningBlend+=(f-this.miningBlend)*Math.min(1,e*E);const b=.9+this.miningBlend*1.9;this.miningPhase+=e*i.mineSpeed*b;const y=(Math.sin(this.miningPhase)+1)*.5,C=(Math.sin(this.miningPhase*2+.35)+1)*.5,w=this.miningBlend*(y*.78+C*.22);this.wasMiningActive=n;const R=w+u;this.handRig.position.x=kl+o+R*.11,this.handRig.position.y=Fl-l-R*.058-m*.018,this.handRig.position.z=Ol+c+-R*i.mineForward+m*.01,this.handRig.rotation.x=zl-t*.022-R*i.minePitch-m*.06,this.handRig.rotation.y=Gl+R*i.mineYaw,this.handRig.rotation.z=Hl-R*i.mineRoll+m*.024}updateSpeedFov(e,t,n,i){const r=t&&n?Ds+(i?zg:Gg):Ds,a=1-Math.exp(-e*10),o=this.camera.fov+(r-this.camera.fov)*a;Math.abs(o-this.camera.fov)>.01&&(this.camera.fov=o,this.camera.updateProjectionMatrix(),this.handCamera.fov=o,this.handCamera.updateProjectionMatrix())}spawnDroppedItem(e,t,n,i,r){const a=this.droppedItems.get(e);a&&(this.scene.remove(a),a.geometry.dispose(),a.material.dispose());const o=new Mt(new Gt(.26,.26,.26),new er({color:new Ne(t)}));o.position.set(n,i,r),o.castShadow=!0,o.receiveShadow=!0,this.scene.add(o),this.droppedItems.set(e,o)}updateDroppedItem(e,t,n,i,r,a){const o=this.droppedItems.get(e);o&&(o.position.set(t,n+a,i),o.rotation.y=r)}removeDroppedItem(e){const t=this.droppedItems.get(e);t&&(this.scene.remove(t),t.geometry.dispose(),t.material.dispose(),this.droppedItems.delete(e))}clearDroppedItems(){for(const e of[...this.droppedItems.keys()])this.removeDroppedItem(e)}spawnBreakParticles(e,t,n,i){for(let r=0;r<11;r+=1){const a=new Mt(new Gt(.08,.08,.08),new Ji({color:new Ne(e),transparent:!0,opacity:.9}));a.position.set(t+.5+(Math.random()-.5)*.6,n+.5+(Math.random()-.5)*.6,i+.5+(Math.random()-.5)*.6),this.scene.add(a),this.breakParticles.push({mesh:a,velocity:new B((Math.random()-.5)*4.5,Math.random()*3.2+1.2,(Math.random()-.5)*4.5),lifeMs:360+Math.random()*260,maxLifeMs:360+Math.random()*260})}}updateTransientEffects(e){const t=e*1e3;for(let n=this.breakParticles.length-1;n>=0;n-=1){const i=this.breakParticles[n];i.lifeMs-=t,i.velocity.y-=12.5*e,i.mesh.position.x+=i.velocity.x*e,i.mesh.position.y+=i.velocity.y*e,i.mesh.position.z+=i.velocity.z*e,i.mesh.rotation.x+=e*8,i.mesh.rotation.y+=e*10;const r=Math.max(0,i.lifeMs/i.maxLifeMs),a=i.mesh.material;a.opacity=r,i.mesh.scale.setScalar(Math.max(.2,r)),i.lifeMs<=0&&(this.scene.remove(i.mesh),i.mesh.geometry.dispose(),a.dispose(),this.breakParticles.splice(n,1))}}setMiningOverlay(e,t){if(!e||t<=0){this.miningOverlay.visible=!1;return}const n=this.miningOverlay.material,i=Math.max(0,Math.min(1,t));n.opacity=.08+i*.4,this.miningOverlay.scale.setScalar(1.005+i*.02),this.miningOverlay.position.set(e.blockWorldX+.5,e.blockWorldY+.5,e.blockWorldZ+.5),this.miningOverlay.visible=!0}render(){this.renderer.autoClear=!0,this.renderer.render(this.scene,this.camera),this.handRig.visible&&(this.renderer.autoClear=!1,this.renderer.clearDepth(),this.renderer.render(this.handScene,this.handCamera),this.renderer.autoClear=!0)}async applyPlayerSkin(e){const t=++this.skinRequestId;let n=await Ti(null);if(e)try{n=await Ti(e)}catch{n=await Ti(null)}if(t!==this.skinRequestId){n.texture.dispose();return}this.handModel&&(this.handRig.remove(this.handModel),Ha(this.handModel),this.handModel=null),this.handModel=kg(n.texture,n.model),this.handRig.add(this.handModel)}}const Wa=(s,e)=>e.some(t=>s instanceof t);let Wl,Xl;function Yg(){return Wl||(Wl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function qg(){return Xl||(Xl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Xa=new WeakMap,Vr=new WeakMap,nr=new WeakMap;function Kg(s){const e=new Promise((t,n)=>{const i=()=>{s.removeEventListener("success",r),s.removeEventListener("error",a)},r=()=>{t(ti(s.result)),i()},a=()=>{n(s.error),i()};s.addEventListener("success",r),s.addEventListener("error",a)});return nr.set(e,s),e}function jg(s){if(Xa.has(s))return;const e=new Promise((t,n)=>{const i=()=>{s.removeEventListener("complete",r),s.removeEventListener("error",a),s.removeEventListener("abort",a)},r=()=>{t(),i()},a=()=>{n(s.error||new DOMException("AbortError","AbortError")),i()};s.addEventListener("complete",r),s.addEventListener("error",a),s.addEventListener("abort",a)});Xa.set(s,e)}let Ya={get(s,e,t){if(s instanceof IDBTransaction){if(e==="done")return Xa.get(s);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ti(s[e])},set(s,e,t){return s[e]=t,!0},has(s,e){return s instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in s}};function Oc(s){Ya=s(Ya)}function $g(s){return qg().includes(s)?function(...e){return s.apply(qa(this),e),ti(this.request)}:function(...e){return ti(s.apply(qa(this),e))}}function Zg(s){return typeof s=="function"?$g(s):(s instanceof IDBTransaction&&jg(s),Wa(s,Yg())?new Proxy(s,Ya):s)}function ti(s){if(s instanceof IDBRequest)return Kg(s);if(Vr.has(s))return Vr.get(s);const e=Zg(s);return e!==s&&(Vr.set(s,e),nr.set(e,s)),e}const qa=s=>nr.get(s);function Jg(s,e,{blocked:t,upgrade:n,blocking:i,terminated:r}={}){const a=indexedDB.open(s,e),o=ti(a);return n&&a.addEventListener("upgradeneeded",l=>{n(ti(a.result),l.oldVersion,l.newVersion,ti(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),o.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),o}const Qg=["get","getKey","getAll","getAllKeys","count"],eA=["put","add","delete","clear"],Wr=new Map;function Yl(s,e){if(!(s instanceof IDBDatabase&&!(e in s)&&typeof e=="string"))return;if(Wr.get(e))return Wr.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=eA.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||Qg.includes(t)))return;const r=async function(a,...o){const l=this.transaction(a,i?"readwrite":"readonly");let c=l.store;return n&&(c=c.index(o.shift())),(await Promise.all([c[t](...o),i&&l.done]))[0]};return Wr.set(e,r),r}Oc(s=>({...s,get:(e,t,n)=>Yl(e,t)||s.get(e,t,n),has:(e,t)=>!!Yl(e,t)||s.has(e,t)}));const tA=["continue","continuePrimaryKey","advance"],ql={},Ka=new WeakMap,zc=new WeakMap,nA={get(s,e){if(!tA.includes(e))return s[e];let t=ql[e];return t||(t=ql[e]=function(...n){Ka.set(this,zc.get(this)[e](...n))}),t}};async function*iA(...s){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...s)),!e)return;e=e;const t=new Proxy(e,nA);for(zc.set(t,e),nr.set(t,qa(e));e;)yield t,e=await(Ka.get(t)||e.continue()),Ka.delete(t)}function Kl(s,e){return e===Symbol.asyncIterator&&Wa(s,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&Wa(s,[IDBIndex,IDBObjectStore])}Oc(s=>({...s,get(e,t,n){return Kl(e,t)?iA:s.get(e,t,n)},has(e,t){return Kl(e,t)||s.has(e,t)}}));const ja=()=>({blocksMined:0,blocksPlaced:0,distanceTravelled:0,playTimeMs:0,jumps:0,craftedItems:0}),Zs=()=>({totalBlocksMined:0,totalBlocksPlaced:0,totalDistanceTravelled:0,totalPlayTimeMs:0,totalJumps:0,totalCraftedItems:0,worldsCreated:0}),ht=s=>typeof s=="number"&&Number.isFinite(s),Gc=s=>ht(s)&&Number.isInteger(s)&&s>=0&&s<=15,Xr=s=>Array.isArray(s)&&s.length===3&&s.every(e=>ht(e)),es=s=>s===null||typeof s=="string",Gs=s=>typeof s=="string"&&s.length>0,Hc=s=>{if(!s||typeof s!="object")return!1;const e=s;return ht(e.blocksMined)&&ht(e.blocksPlaced)&&ht(e.distanceTravelled)&&ht(e.playTimeMs)&&ht(e.jumps)&&ht(e.craftedItems)},Vc=s=>Array.isArray(s)&&s.every(e=>e&&typeof e=="object"&&ht(e.count)&&(e.blockId===null||Gc(e.blockId))),Wc=s=>{if(!s||typeof s!="object")return!1;const e=s;return Xr(e.position)&&Xr(e.velocity)&&Xr(e.spawnPoint)&&ht(e.yaw)&&ht(e.pitch)&&ht(e.selectedSlot)},An=s=>{if(!s||typeof s!="object")return!1;const e=s,t=e.previewImageDataUrl;return e.schemaVersion===5&&typeof e.id=="string"&&e.id.length>0&&typeof e.worldId=="string"&&e.worldId.length>0&&typeof e.name=="string"&&e.name.length>0&&typeof e.seed=="string"&&(typeof t>"u"||es(t))&&Gs(e.createdAt)&&Gs(e.updatedAt)&&Gs(e.lastPlayedAt)&&Wc(e.player)&&Vc(e.inventory)&&Hc(e.worldStats)},sA=s=>{if(!s||typeof s!="object")return!1;const e=s;return e.schemaVersion===4&&e.worldId==="default-world"&&typeof e.seed=="string"&&Gs(e.createdAt)&&Wc(e.player)&&Vc(e.inventory)&&Hc(e.worldStats)},Xc=s=>{if(!s||typeof s!="object")return!1;const e=s;return typeof e.chunkKey=="string"&&typeof e.revision=="number"&&Array.isArray(e.changes)&&e.changes.every(t=>t&&typeof t=="object"&&ht(t.index)&&Gc(t.blockId))},Yr=s=>{if(!Xc(s))return!1;const e=s;return typeof e.id=="string"&&e.id.length>0&&typeof e.worldId=="string"&&e.worldId.length>0},rA=s=>{if(!s||typeof s!="object")return!1;const e=s;return e.schemaVersion!==1||!e.keyBindings||typeof e.keyBindings!="object"?!1:Vs.every(n=>{const i=e.keyBindings[n];return i&&typeof i=="object"&&typeof i.primary=="string"&&es(i.secondary)})&&es(e.skinDataUrl)&&(typeof e.startFullscreen=="boolean"||typeof e.startFullscreen>"u")},jl=s=>{if(!s||typeof s!="object")return!1;const e=s;return e.schemaVersion===1&&ht(e.totalBlocksMined)&&ht(e.totalBlocksPlaced)&&ht(e.totalDistanceTravelled)&&ht(e.totalPlayTimeMs)&&ht(e.totalJumps)&&ht(e.totalCraftedItems)&&ht(e.worldsCreated)},qr=s=>{if(!s||typeof s!="object")return!1;const e=s;return e.schemaVersion===1&&es(e.activeWorldId)&&es(e.lastWorldId)},$l={schemaVersion:1,activeWorldId:null,lastWorldId:null},Ls=s=>[...s].sort((e,t)=>{const n=Date.parse(e.lastPlayedAt||e.updatedAt||e.createdAt);return Date.parse(t.lastPlayedAt||t.updatedAt||t.createdAt)-n}),jn=s=>({id:s.id,name:s.name,seed:s.seed,previewImageDataUrl:s.previewImageDataUrl??null,createdAt:s.createdAt,updatedAt:s.updatedAt,lastPlayedAt:s.lastPlayedAt,worldStats:{...s.worldStats}}),aA=s=>s.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,32);class oA{dbPromise=null;migrationPromise=null;getDb(){return this.dbPromise||(this.dbPromise=Jg("mineblow",ut.databaseVersion,{upgrade(e){e.objectStoreNames.contains("meta")||e.createObjectStore("meta"),e.objectStoreNames.contains("chunkDiffs")||e.createObjectStore("chunkDiffs"),e.objectStoreNames.contains("settings")||e.createObjectStore("settings"),e.objectStoreNames.contains("globalStats")||e.createObjectStore("globalStats"),e.objectStoreNames.contains("worlds")||e.createObjectStore("worlds")}})),this.dbPromise}async hasContinueState(){return await this.ensureMigrated(),await(await this.getDb()).count("worlds")>0}async listWorlds(){await this.ensureMigrated();const t=await(await this.getDb()).getAll("worlds");return Ls(t.filter(An).map(n=>jn(n)))}async loadWorld(e){await this.ensureMigrated();const t=await this.getDb(),n=e??await this.getPreferredWorldId(t);if(!n)return null;const i=t.transaction(["worlds","chunkDiffs","meta"],"readwrite"),r=i.objectStore("worlds"),a=await r.get(n);if(!An(a))return await i.done,null;const o=new Date().toISOString(),l={...a,updatedAt:o,lastPlayedAt:o};await r.put(l,l.id),await i.objectStore("meta").put({schemaVersion:1,activeWorldId:l.id,lastWorldId:l.id},ut.appMetaKey);const c=new Map,h=await i.objectStore("chunkDiffs").getAll();for(const d of h)Yr(d)&&d.worldId===l.id&&c.set(d.chunkKey,{chunkKey:d.chunkKey,revision:d.revision,changes:d.changes});return await i.done,{save:l,chunkDiffs:c}}async loadWorldSummary(e){await this.ensureMigrated();const t=await this.getDb(),n=e??await this.getPreferredWorldId(t);if(!n)return null;const i=await t.get("worlds",n);return An(i)?jn(i):null}async createNewWorld(e,t,n,i,r){await this.ensureMigrated();const a=await this.getDb(),o=new Date().toISOString(),l=await this.createUniqueWorldId(e),c=e.trim()||`New World ${new Date().toLocaleDateString("en-CA")}`,h={schemaVersion:ut.schemaVersion,id:l,worldId:l,name:c,seed:t,previewImageDataUrl:null,createdAt:o,updatedAt:o,lastPlayedAt:o,player:n,inventory:i,worldStats:r},d=a.transaction(["worlds","meta","globalStats"],"readwrite");await d.objectStore("worlds").put(h,h.id),await d.objectStore("meta").put({schemaVersion:1,activeWorldId:h.id,lastWorldId:h.id},ut.appMetaKey);const u=await d.objectStore("globalStats").get("global"),p=jl(u)?u:{schemaVersion:1,...Zs()};return await d.objectStore("globalStats").put({...p,worldsCreated:p.worldsCreated+1},"global"),await d.done,h}async renameWorld(e,t){await this.ensureMigrated();const n=await this.getDb(),i=await n.get("worlds",e);if(!An(i))return null;const r=t.trim();if(!r)return jn(i);const a={...i,name:r,updatedAt:new Date().toISOString()};return await n.put("worlds",a,a.id),jn(a)}async saveWorldPreview(e,t){await this.ensureMigrated();const n=await this.getDb(),i=await n.get("worlds",e);if(!An(i))return;const r=typeof t=="string"&&t.length>0?t:null;await n.put("worlds",{...i,previewImageDataUrl:r,updatedAt:new Date().toISOString()},i.id)}async deleteWorld(e){await this.ensureMigrated();const t=await this.getDb(),n=(await t.getAll("worlds")).filter(An),i=await this.loadAppMeta(t),r=n.filter(u=>u.id!==e),a=Ls(r.map(u=>jn(u)))[0]?.id??null,o=t.transaction(["worlds","chunkDiffs","meta"],"readwrite");await o.objectStore("worlds").delete(e);const l=o.objectStore("chunkDiffs"),c=await l.getAllKeys(),h=await l.getAll();for(let u=0;u<h.length;u+=1){const p=h[u],g=c[u];Yr(p)&&p.worldId===e&&typeof g=="string"&&await l.delete(g)}const d={schemaVersion:1,activeWorldId:i.activeWorldId===e?a:i.activeWorldId,lastWorldId:i.lastWorldId===e?a:i.lastWorldId};d.activeWorldId&&!r.some(u=>u.id===d.activeWorldId)&&(d.activeWorldId=a),d.lastWorldId&&!r.some(u=>u.id===d.lastWorldId)&&(d.lastWorldId=a),await o.objectStore("meta").put(d,ut.appMetaKey),await o.done}async savePlayer(e,t,n,i){await this.ensureMigrated();const r=await this.getDb(),a=await r.get("worlds",e);An(a)&&await r.put("worlds",{...a,player:t,inventory:n,worldStats:i,updatedAt:new Date().toISOString()},a.id)}async saveChunkDiffs(e,t){if(await this.ensureMigrated(),t.length===0)return;const i=(await this.getDb()).transaction("chunkDiffs","readwrite"),r=i.objectStore("chunkDiffs");for(const a of t){const o=this.getChunkRecordKey(e,a.chunkKey);a.changes.length===0?await r.delete(o):await r.put({id:o,worldId:e,chunkKey:a.chunkKey,revision:a.revision,changes:a.changes},o)}await i.done}async clear(){const t=(await this.getDb()).transaction(["worlds","chunkDiffs","meta"],"readwrite");await t.objectStore("worlds").clear(),await t.objectStore("chunkDiffs").clear(),await t.objectStore("meta").delete(ut.appMetaKey),await t.objectStore("meta").delete(ut.legacyWorldId),await t.done}async loadSettings(){const t=await(await this.getDb()).get("settings","settings");if(rA(t))return{keyBindings:t.keyBindings,skinDataUrl:t.skinDataUrl,startFullscreen:t.startFullscreen??!0};const n=Ws();return await this.saveSettings(n),n}async saveSettings(e){await(await this.getDb()).put("settings",{schemaVersion:1,...e},"settings")}async loadGlobalStats(){const t=await(await this.getDb()).get("globalStats","global");if(jl(t))return{totalBlocksMined:t.totalBlocksMined,totalBlocksPlaced:t.totalBlocksPlaced,totalDistanceTravelled:t.totalDistanceTravelled,totalPlayTimeMs:t.totalPlayTimeMs,totalJumps:t.totalJumps,totalCraftedItems:t.totalCraftedItems,worldsCreated:t.worldsCreated};const n=Zs();return await this.saveGlobalStats(n),n}async saveGlobalStats(e){await(await this.getDb()).put("globalStats",{schemaVersion:1,...e},"global")}async ensureMigrated(){this.migrationPromise||(this.migrationPromise=this.runMigration()),await this.migrationPromise}async runMigration(){const e=await this.getDb(),t=(await e.getAll("worlds")).filter(An),n=await e.get("meta",ut.appMetaKey);if(t.length>0){if(!qr(n)){const h=Ls(t.map(d=>jn(d)))[0]?.id??null;await e.put("meta",{schemaVersion:1,activeWorldId:h,lastWorldId:h},ut.appMetaKey)}return}const i=await e.get("meta",ut.legacyWorldId);if(!sA(i)){qr(n)||await e.put("meta",$l,ut.appMetaKey);return}const r={schemaVersion:ut.schemaVersion,id:ut.legacyWorldId,worldId:ut.legacyWorldId,name:"Imported World",seed:i.seed,previewImageDataUrl:null,createdAt:i.createdAt,updatedAt:i.createdAt,lastPlayedAt:i.createdAt,player:i.player,inventory:i.inventory,worldStats:i.worldStats},a=e.transaction(["worlds","chunkDiffs","meta"],"readwrite");await a.objectStore("worlds").put(r,r.id);const o=a.objectStore("chunkDiffs"),l=await o.getAllKeys(),c=await o.getAll();for(let h=0;h<c.length;h+=1){const d=c[h],u=l[h];if(!Xc(d)||Yr(d))continue;const p=this.getChunkRecordKey(r.id,d.chunkKey);await o.put({id:p,worldId:r.id,chunkKey:d.chunkKey,revision:d.revision,changes:d.changes},p),typeof u=="string"&&u!==p&&await o.delete(u)}await a.objectStore("meta").put({schemaVersion:1,activeWorldId:r.id,lastWorldId:r.id},ut.appMetaKey),await a.objectStore("meta").delete(ut.legacyWorldId),await a.done}async createUniqueWorldId(e){const t=await this.getDb(),n=aA(e)||"world";let i=n,r=1;for(;await t.get("worlds",i);)r+=1,i=`${n}-${r}`;return i}async getPreferredWorldId(e){const t=await this.loadAppMeta(e);if(t.activeWorldId)return t.activeWorldId;if(t.lastWorldId)return t.lastWorldId;const n=(await e.getAll("worlds")).filter(An).map(i=>jn(i));return Ls(n)[0]?.id??null}async loadAppMeta(e){const t=await e.get("meta",ut.appMetaKey);return qr(t)?t:$l}getChunkRecordKey(e,t){return`${e}:${t}`}}const lA=(s,e)=>{let t;return(...n)=>{t!==void 0&&window.clearTimeout(t),t=window.setTimeout(()=>{t=void 0,s(...n)},e)}};class cA{root=document.createElement("div");panel=document.createElement("div");visible=!1;constructor(e){this.root.className="debug-layer",this.panel.className="debug-panel",this.root.append(this.panel),e.append(this.root),this.setVisible(!1)}toggle(){this.setVisible(!this.visible)}setVisible(e){this.visible=e,this.root.style.display=e?"":"none"}update(e){this.panel.textContent=e}}class dA{root=document.createElement("div");crosshair=document.createElement("div");generationLabel=document.createElement("div");fpsLabel=document.createElement("div");healthFill=document.createElement("div");healthLabel=document.createElement("div");levelFill=document.createElement("div");levelLabel=document.createElement("div");hotbar=document.createElement("div");slotElements=[];constructor(e){this.root.className="hud-layer",this.crosshair.className="crosshair",this.generationLabel.className="generation-label",this.generationLabel.textContent="Generating...",this.generationLabel.style.display="none",this.fpsLabel.className="fps-label",this.fpsLabel.textContent="FPS 0";const t=document.createElement("div");t.className="status-bars";const n=document.createElement("div");n.className="status-bar health",this.healthFill.className="status-fill",this.healthLabel.className="status-label",this.healthLabel.textContent="HP 20/20",n.append(this.healthFill,this.healthLabel);const i=document.createElement("div");i.className="status-bar level",this.levelFill.className="status-fill",this.levelLabel.className="status-label",this.levelLabel.textContent="LVL 1",i.append(this.levelFill,this.levelLabel),t.append(n,i),this.hotbar.className="hotbar";for(let r=0;r<9;r+=1){const a=document.createElement("div");a.className="hotbar-slot";const o=document.createElement("div");o.className="slot-preview";const l=document.createElement("div");l.className="slot-count",l.style.display="none",a.append(o,l),this.hotbar.append(a),this.slotElements.push(a)}this.root.append(this.crosshair,this.generationLabel,this.fpsLabel,t,this.hotbar),e.append(this.root),this.setHealth(20,20),this.setLevel(1,0)}setVisible(e){this.root.style.display=e?"":"none"}setTargetLabel(e){}setGenerating(e){this.generationLabel.style.display=e?"":"none"}setFps(e){this.fpsLabel.textContent=`FPS ${e}`}setMiningProgress(e){if(e<=0){this.crosshair.classList.remove("mining");return}this.crosshair.classList.add("mining")}setHealth(e,t){const n=Math.max(1,t),i=Math.max(0,Math.min(1,e/n));this.healthFill.style.width=`${i*100}%`,this.healthLabel.textContent=`HP ${Math.round(e)}/${n}`}setLevel(e,t){const n=Math.max(0,Math.min(1,t));this.levelFill.style.width=`${n*100}%`,this.levelLabel.textContent=`LVL ${Math.max(1,Math.floor(e))}`}setHandSkin(e){}updateHand(e,t,n){}updateHotbar(e,t){e.forEach((n,i)=>{const r=this.slotElements[i],a=r.children[0],o=r.children[1];r.classList.toggle("selected",i===t),a.style.background=wi(n.blockId),n.count>0?(o.textContent=String(n.count),o.style.display=""):o.style.display="none"})}}class Hs{constructor(e){this.container=e,this.renderer=new mo({antialias:!1,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setClearColor(new Ne("#000000"),0),this.renderer.domElement.className="paperdoll-canvas",this.container.append(this.renderer.domElement),this.camera.position.set(0,1.02,3.9),this.scene.add(new fo("#dbe9ff",.6));const t=new js("#ffe9bd",1.1);t.position.set(3.2,4,2.4),this.scene.add(t);const n=new js("#8ab8ff",.38);n.position.set(-3,2.2,-1.8),this.scene.add(n),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container),this.resize(),this.animate(),this.setSkin(null)}scene=new Ks;camera=new Rt(42,1,.1,20);renderer;clock=new Ic;resizeObserver;model=null;rafId=0;skinRequestId=0;disposed=!1;async setSkin(e){const t=++this.skinRequestId;let n=await Ti(null);if(e)try{n=await Ti(e)}catch{n=await Ti(null)}if(this.disposed||t!==this.skinRequestId){n.texture.dispose();return}this.model&&(this.scene.remove(this.model),Ha(this.model),this.model=null),this.model=Bg(n.texture,n.model),this.model.position.y=0,this.scene.add(this.model)}dispose(){this.disposed=!0,this.resizeObserver.disconnect(),cancelAnimationFrame(this.rafId),this.model&&(this.scene.remove(this.model),Ha(this.model),this.model=null),this.renderer.dispose()}resize(){const e=Math.max(20,this.container.clientWidth),t=Math.max(20,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(e,t,!1)}animate=()=>{this.rafId=requestAnimationFrame(this.animate);const e=this.clock.getDelta();this.model&&(this.model.rotation.y+=e*.55,this.model.position.y=Math.sin(performance.now()*.0018)*.03),this.renderer.render(this.scene,this.camera)}}class hA{constructor(e,t){this.handlers=t,this.root.className="inventory-layer",this.root.addEventListener("mousemove",M=>{this.pointerX=M.clientX,this.pointerY=M.clientY,this.positionHoverLabel()});const n=document.createElement("div");n.className="inventory-panel";const i=document.createElement("div");i.className="inventory-rail",i.append(this.createFilterButton("craftable","Craftable"),this.createFilterButton("all","All"));const r=document.createElement("div");r.className="inventory-sidebar",this.title.className="inventory-title",this.status.className="inventory-status",this.recipeList.className="recipe-list";const a=document.createElement("div");a.className="inventory-workspace";const o=document.createElement("div");o.className="inventory-board";const l=document.createElement("div");l.className="inventory-board-header";const c=document.createElement("h3");c.className="inventory-section-title",c.textContent="Storage";const h=document.createElement("span");h.textContent="Left click swap, right click split, shift click quick-move.",l.append(c,h);const d=document.createElement("section");d.className="inventory-section",this.mainGrid.className="inventory-grid inventory-grid-main";const u=document.createElement("section");u.className="inventory-section inventory-hotbar-section";const p=document.createElement("h3");p.className="inventory-section-title",p.textContent="Hotbar",this.hotbarGrid.className="inventory-grid inventory-grid-hotbar";for(let M=0;M<36;M+=1){const S=document.createElement("button");S.type="button",S.className=`inventory-slot${M>=27?" hotbar":""}`,S.addEventListener("click",G=>{this.handlers.onSlotInteract({index:M,button:"left",shift:G.shiftKey})}),S.addEventListener("contextmenu",G=>{G.preventDefault(),this.handlers.onSlotInteract({index:M,button:"right",shift:G.shiftKey})}),S.addEventListener("mouseenter",()=>{this.hoveredSlotIndex=M,this.renderHoverLabel()}),S.addEventListener("mouseleave",()=>{this.hoveredSlotIndex=null,this.renderHoverLabel()});const P=document.createElement("div");P.className="inventory-slot-preview";const k=document.createElement("div");k.className="inventory-slot-count",S.append(P,k),M<27?this.mainGrid.append(S):this.hotbarGrid.append(S),this.slotButtons.push(S)}d.append(this.mainGrid),u.append(p,this.hotbarGrid),this.cursorLabel.className="inventory-cursor",this.hoverLabel.className="inventory-hover",o.append(l,d,u,this.cursorLabel);const g=document.createElement("div");g.className="inventory-preview";const _=document.createElement("div");_.className="inventory-side-card";const m=document.createElement("h3");m.className="inventory-section-title",m.textContent="Character";const f=document.createElement("div");f.className="paperdoll",f.innerHTML=`
      <div class="paperdoll-scale">3D player preview</div>
      <div class="paperdoll-stage"></div>
    `;const E=f.querySelector(".paperdoll-stage");if(!E)throw new Error("Paperdoll stage missing");this.skinViewer=new Hs(E);const b=document.createElement("label");b.className="skin-loader",b.textContent="Load skin (64x64 PNG)",this.skinInput.type="file",this.skinInput.accept="image/png",this.skinInput.addEventListener("change",()=>{const M=this.skinInput.files?.[0];if(!M)return;const S=new FileReader;S.onload=()=>{typeof S.result=="string"&&(this.loadedSkinDataUrl=S.result,this.skinViewer.setSkin(S.result),this.handlers.onSkinChange(S.result))},S.readAsDataURL(M),this.skinInput.value=""}),b.append(this.skinInput),_.append(m,f,b);const y=document.createElement("div");y.className="inventory-side-card";const C=document.createElement("h3");C.className="inventory-section-title",C.textContent="Equipment";const w=document.createElement("p");w.className="inventory-side-note",w.textContent="Reserved vertical slots for future armor/equipment.";const R=document.createElement("div");R.className="equipment-slot-column";for(let M=0;M<4;M+=1){const S=document.createElement("div");S.className="equipment-slot",S.textContent="Soon",R.append(S)}y.append(C,w,R);const U=document.createElement("button");U.type="button",U.className="inventory-close",U.textContent="Close",U.addEventListener("click",()=>this.handlers.onClose()),r.append(this.title,this.status,this.recipeList),a.append(o,U),g.append(_,y),n.append(i,r,a,g,this.hoverLabel),this.root.append(n),e.append(this.root),this.setVisible(!1)}root=document.createElement("div");title=document.createElement("h2");status=document.createElement("div");recipeList=document.createElement("div");mainGrid=document.createElement("div");hotbarGrid=document.createElement("div");cursorLabel=document.createElement("div");hoverLabel=document.createElement("div");skinInput=document.createElement("input");slotButtons=[];filterButtons=new Map;skinViewer;visible=!1;loadedSkinDataUrl=null;hoveredSlotIndex=null;pointerX=0;pointerY=0;latestState=null;recipeFilter="craftable";setVisible(e){this.visible=e,this.root.style.display=e?"grid":"none",e||(this.hoveredSlotIndex=null,this.renderHoverLabel())}isVisible(){return this.visible}dispose(){this.skinViewer.dispose()}render(e){this.latestState=e,this.title.textContent=e.mode==="crafting_table"?"Crafting Table":"Inventory";const t=this.recipeFilter==="craftable"?e.recipes.filter(i=>e.craftableRecipeIds.has(i.id)):e.recipes,n=e.recipes.filter(i=>e.craftableRecipeIds.has(i.id)).length;if(this.status.textContent=e.mode==="crafting_table"?`${n} recipe(s) available on the table.`:`${n} recipe(s) available from the player inventory.`,this.filterButtons.forEach((i,r)=>{i.classList.toggle("active",r===this.recipeFilter)}),this.loadedSkinDataUrl!==e.skinDataUrl&&(this.loadedSkinDataUrl=e.skinDataUrl,this.skinViewer.setSkin(e.skinDataUrl)),this.recipeList.replaceChildren(),t.length===0){const i=document.createElement("div");i.className="recipe-empty",i.textContent=this.recipeFilter==="craftable"?"Nothing craftable right now.":"No recipes available in this mode.",this.recipeList.append(i)}else t.forEach(i=>{const r=e.craftableRecipeIds.has(i.id),a=document.createElement("button");a.type="button",a.className="recipe-card",a.disabled=!r,a.addEventListener("click",()=>this.handlers.onRecipeCraft(i.id));const o=document.createElement("div");o.className="recipe-icon",o.style.background=wi(i.output.blockId);const l=document.createElement("div");l.className="recipe-card-body";const c=document.createElement("strong");c.textContent=i.label;const h=document.createElement("span");h.textContent=i.description;const d=document.createElement("div");d.className="recipe-ingredients",i.ingredients.forEach(u=>{const p=document.createElement("div");p.className="recipe-chip",p.innerHTML=`<b style="background:${wi(u.blockId)}"></b>${u.count} x ${Rs(u.blockId)}`,d.append(p)}),l.append(c,h,d),a.append(o,l),this.recipeList.append(a)});e.slots.forEach((i,r)=>{const a=this.slotButtons[r],o=a.children[0],l=a.children[1],c=r-27;a.classList.toggle("selected",c===e.selectedHotbarIndex&&c>=0),a.classList.toggle("filled",i.blockId!==null&&i.count>0),o.style.background=wi(i.blockId),o.textContent=i.blockId===null?"":Rs(i.blockId).slice(0,1).toUpperCase(),l.textContent=i.count>0?String(i.count):"",l.style.display=i.count>0?"":"none"}),e.cursor.blockId===null||e.cursor.count===0?this.cursorLabel.textContent="Cursor: empty":this.cursorLabel.textContent=`Cursor: ${e.cursor.count} x ${Rs(e.cursor.blockId)}`,this.renderHoverLabel()}createFilterButton(e,t){const n=document.createElement("button");return n.type="button",n.className="inventory-filter-button",n.textContent=t,n.addEventListener("click",()=>{this.recipeFilter=e,this.latestState&&this.render(this.latestState)}),this.filterButtons.set(e,n),n}renderHoverLabel(){if(!this.latestState||this.hoveredSlotIndex===null){this.hoverLabel.style.visibility="hidden",this.hoverLabel.textContent="";return}const e=this.latestState.slots[this.hoveredSlotIndex];if(!e||e.blockId===null||e.count<=0){this.hoverLabel.style.visibility="hidden",this.hoverLabel.textContent="";return}this.hoverLabel.style.visibility="visible",this.hoverLabel.textContent=`${Rs(e.blockId)} x${e.count}`,this.positionHoverLabel()}positionHoverLabel(){if(this.hoverLabel.style.visibility!=="visible")return;const e=14,t=18;this.hoverLabel.style.left=`${this.pointerX+e}px`,this.hoverLabel.style.top=`${this.pointerY+t}px`}}const uA="data:text/plain;base64,RHJvcCA2NHg2NCBQTkcgc2tpbnMgaGVyZSBmb3IgdGhlIGJveXMgY2F0ZWdvcnkuCg==",fA="data:text/plain;base64,RHJvcCA2NHg2NCBQTkcgc2tpbnMgaGVyZSBmb3IgdGhlIGdpcmxzIGNhdGVnb3J5Lgo=",pA=Object.assign({}),mA=Object.assign({"../../assets/skins/boys/README.txt":uA,"../../assets/skins/girls/README.txt":fA}),gA=s=>{const e=s.match(/assets\/skins\/([^/]+)\//);return e?e[1]:null},Ao=Object.entries(pA).map(([s,e])=>{const t=s.match(/assets\/skins\/([^/]+)\/([^/]+)\.png$/);if(!t)return null;const[,n,i]=t;return{category:n,name:i,url:e}}).filter(s=>s!==null).sort((s,e)=>{const t=s.category.localeCompare(e.category);return t!==0?t:s.name.localeCompare(e.name)}),_o=new Set;Ao.forEach(s=>_o.add(s.category));Object.keys(mA).forEach(s=>{const e=gA(s);e&&_o.add(e)});const AA=[..._o].sort((s,e)=>s.localeCompare(e)).map(s=>{const e=Ao.filter(t=>t.category===s);return{name:s,skins:e,previewSkinUrl:e[0]?.url??null}}),_A=s=>Ao.filter(e=>e.category===s),Zl=()=>AA.map(s=>({name:s.name,skins:[...s.skins],previewSkinUrl:s.previewSkinUrl})),vA=[new URL("/assets/panorama_0-C130K_z-.png",import.meta.url).href,new URL("/assets/panorama_1-Bi4QlnSC.png",import.meta.url).href,new URL("/assets/panorama_2-VlSWZaRQ.png",import.meta.url).href,new URL("/assets/panorama_3-B3Pu-mDD.png",import.meta.url).href,new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAFnklEQVR42u3VMQ0AAAgEsReOIFyCB1aaVMEtl+oB4KFIAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAKgAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQAYgAoABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGACAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGACAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgBgABIAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAGIAKAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAAAagAoABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgDAzQI0a4A1nrPDEwAAAABJRU5ErkJggg==",import.meta.url).href,new URL("/assets/panorama_5-BlJokPgz.png",import.meta.url).href],SA=[1,3,4,5,0,2];class MA{constructor(e){this.container=e,this.renderer=new mo({antialias:!1,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setClearColor(0,0),this.renderer.outputColorSpace=St,this.renderer.domElement.className="menu-panorama-canvas",this.container.append(this.renderer.domElement),this.cubeTexture.colorSpace=St,this.cubeTexture.generateMipmaps=!0,this.cubeTexture.magFilter=Jt,this.cubeTexture.minFilter=Un,this.cubeTexture.needsUpdate=!0,this.scene.background=this.cubeTexture,this.loadCubeTexture(),this.camera.position.set(0,0,0),this.camera.rotation.order="YXZ",this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container),this.resize(),this.animate()}scene=new Ks;camera=new Rt(85,1,.05,10);renderer;resizeObserver;clock=new Ic;cubeTexture=new oo;rafId=0;disposed=!1;dispose(){this.disposed=!0,cancelAnimationFrame(this.rafId),this.resizeObserver.disconnect(),this.scene.background=null,this.cubeTexture.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}resize(){const e=Math.max(20,this.container.clientWidth),t=Math.max(20,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(e,t,!1)}async loadCubeTexture(){try{const e=await Promise.all(SA.map(t=>this.loadPanoramaFace(vA[t])));if(this.disposed)return;this.cubeTexture.images=e,this.cubeTexture.needsUpdate=!0}catch{}}async loadPanoramaFace(e){return this.loadImage(e)}loadImage(e){return new Promise((t,n)=>{const i=new Image;i.decoding="async",i.onload=()=>t(i),i.onerror=()=>n(new Error(`Unable to load panorama face: ${e}`)),i.src=e})}animate=()=>{if(this.disposed)return;this.rafId=requestAnimationFrame(this.animate);const e=this.clock.getElapsedTime(),t=(25+Math.sin(e*.02)*5)*Math.PI/180,n=e*2*Math.PI/180;this.camera.rotation.x=-t,this.camera.rotation.y=n,this.camera.rotation.z=0,this.renderer.render(this.scene,this.camera)}}const yA=new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAA7d7JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHku3/QAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADr4AAA6+AepCscAAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAAi+SURBVHhe7VcJctw4DEz+/+gs+wJAShqP7aR2tyrtIbrRAA9pTv/4+fNXIPkzhEgh9XP9kVM4+9MoP2n8Yg+v9uuHqFENxpkXtN5j/aN5wY8yDl5EccMoY/FqlDEKpNM3G0l/LKK6YeLkCJAHlxp8jq2OncUIOICNG0b9wpnInjcGFzw8+QjfuQOLIS8sGX2pL8G6klcHyMmvjHKLB371GoBIenkX/C7UbgfWxlvp+QBnZy0pRqQ62z6JPsCxYen49UEUjq3xVdQnYdaF0Mq9wUvs5/401geRRO0LozyEPsg2AOlvnWAeIHxZWLk6win7HF/G3QHIPkdtsCIFchkI9Et/BfgklOqF2xKRM1AnVX+1fwkvPgf6ZOI/g/E2LJbq56Jiq6bcr6/cB8yoA/T1WtVBZKyx+d0vnko40is44XqA7NMbB9XR8Vpfwdao3EI7Xg5QGCch17r13BBDp99UE4kzT3sfwBzMCWQna/utdSRpq86X8DL9IjxRz7U7V4QwFfo4+8HSdnGdhx/vwDLSWpFqzdx6fcC+XztOO2n4+Q78JtwfqzF+FTPiyM7r7OSVymja+8JXbH4l7ufXMVSmz5yWGxnAESnbKqbbPBUw6pT8TUiv20aPGpXctyFCFMMc7DbOp3K+QLUOkB0QgHS4vys0sk7Zybuw4WrWfHI9Bfs2BBXWrZKGcruVS19RVePovjwFqYMjGfyclZ9ickmFwVG5kPaFehfkOtNYxlKK3SBmvPhtW7RFnPYf+xzYdn0B3gE2N2nubre4sMawKRA56C5AbEN9ehFq0FiRFXrMmVZ+MgI7mBCeIKvs5apPjAdSvA25tR5okFCykHnKLryqrLdhecxjHw2TRx/ABQgSAoAaSHYzZIQ5UH5Zh/sgijR4ADh60K0GwoXkzVoPIRw4v6yTMaReA4D9EstXKQsdC0bDpOdC+pCDK2WizJJc7wLnqLxkJQsj53Bb90NuKSOY2oU//nvgI+A/Ix9OfOZlrHAyAmiO9Nd0xs7bEfC/oSagB86Rz4XOgbjK7itWXQ3Fw4hD4AC1ICvJmQAS9I7BWCfct0rSC6WtHaC/jDySF2fiOTqsAZjHesJRP8A7AIAo+4TmjhypL7ahBiasi0ULV2eiD6Dl2AeBaWUoaqVxh9hTB67I3CYgOYyJOgAa1Oje48ou+WK2eVR0X7UvsGfkE//a5wAOiiPhJ9mGu4Pu3n02TMryt+4r6rtgdUqd+QJF1fNUAWAkN4jfXNOUi+e7QE7WzYurc6+AMHO3IQiSVWfGZSBXEFPO14AbUqFGam37bIOQDy1I1gUwQ0p5jjoAumGkQi2p4Y27ME4iErQP62LG6jlHH8AjJ1nEFSQTPAzKFabtFJFTHKunxgrg7SnYRF1Bs3xmK8UDQpbtxemP19PmwHqgr38O5GAnHuwnfHyAz6030FdOnmKsuf0goUhn+Yxk1XceA8RlLBBlAp1nB0L/mCyRwgqsd65+6rvRL9aMntC00EpQXv8dI5BpI7cadDfSmPmVI+zYLV/o5Snorn2l1JbpPq2QHO3OBXPSqQD2rrF9GcUEsBC1V0TqPESRAWx5zxOcB+l7PEA2gjAlD1EgcKwgTqNIOlkjfZcDfBnZ95OoH6XY3Sv46OU7ZbZQQnjoc1r19jUS8TZMbUM3PiALezzhUs+BjX4KlqCuK3rNCBJPfYwLFqHcGvfVAcAeXmHPb5i48cnVENGUMrmeghrjSigeuMZuF2t5wCLkhnC9CFdwwYmI+R0vYUK4spoAiyaqML8N5WhBcPLT33jh7NsZAbBoSpm8DtALfg5fnbcDd2BfaVyJcp84TVVm1vVjNLJOzQiYX36Q1LvE48STf7OBsFzOMTe0E78NWagrPU58crAyGGOwIaPnMY66DfP4LlBp3IEsePI+Vrh4Gur3QbCuhWAfd4B5OscB3ho97xz7hmiKL4jHJ6FU8SKoC0sWA8xhSKvuXKH9hrLxGsiVdA76iBEtHuotQEEu9OOf5R/hWLjxYAcu1+fAWCbSvnYIQ4CKHzbinDGe8KU74EVzAiEHNFIfbOjm91OQC2O6UFcoL+tSOxcr77gcScPrFBvpMuNdoAWRiSvn4MoywUswB4MykevhkXoK5s52xTsA0fbT6KkT8dYi1UCiQd7Wry4zfpBQpWHkNXHLs2CxfBpgSIzaX/XUoJTLefEaaH+OC3rfDcusjTPu8P3PgW9iHcDnwz3B7cLw4X3qg1M+Ef+sX/ytyu8CDf2tMhppufFg1ql2xD/rF3+rvn0HVsF5ykJ8kpUexL2PicblDqifLWk8mA1URmdUo75x+XGJD+8ADnwyKszDw+c0+2HJwWO9b7wGwk9++BGsfuNdEH7yw49g9RuvgfCTH34Eq/ggStvZ/pSbF1GFg7dzxv/pAfgcrUGHzDwYMn0bZv577kDyWzz5gg5wg498Lmye+UTqd36AA5zArMnB4XMhKuEpf/KFvwdYBzgbgvJvqzf1rc9PcVmnDv47B3A+1pBPIT9sqE5zQUbDdlmnDj5zB46u13WvX9apA/13fIO0pb+ZdA8u/9ygshost3eB3UVdnzjq1We/4OoVKqtm+fcAtx9EGzjz2GGi62kLtyjQ6HZwH8AGCEKsi2QhiJFiqiOVY38g9WgM/W+oxzbiKZCBauBDdZNCJxXVYZapIgb+O+66CwQLFmc6Ckk5f4lhIoXkoxkyLTqAfpTawCCWoLaRlLFVpTOZnlLuGibAGB/egTFAEGqUrdwZhTljBXU0o7vq22sghQjozIOIbxxGt1GtUJ1AZenTqHfB3v2Msw/7vDP3qWd8DrilO0t5h0uD8Lw/j8aghOYBfxlBpuFkCGobRXmO4lxAv+u3beMpyEHc2O1LMWlngabdrTCw19NV+xBv3oHm7g8q3e0FTygW9vnvvAZOFrDM6QyucjNpCGLcgUd4vtip8lfzesKBfb/La+BklhRm+gZq/kuMp+ARWuet5Ta8MePXr38AsR8Obsh0700AAAAASUVORK5CYII=",import.meta.url).href,xA=63,Jl=16,Dn=8;let Kr=null;const Ql=new Map,bA=s=>{const e=s.charCodeAt(0);return Number.isNaN(e)||e<0||e>255?xA:e},Yc=()=>(Kr||(Kr=new Promise((s,e)=>{const t=new Image;t.decoding="async",t.onload=()=>s(t),t.onerror=()=>e(new Error("Failed to load ascii font atlas.")),t.src=yA})),Kr),EA=async s=>{const e=Ql.get(s);if(e)return e;const t=await Yc(),n=s%Jl*Dn,i=Math.floor(s/Jl)*Dn,r=document.createElement("canvas");r.width=Dn,r.height=Dn;const a=r.getContext("2d");if(!a)return"";a.imageSmoothingEnabled=!1,a.drawImage(t,n,i,Dn,Dn,0,0,Dn,Dn);const o=r.toDataURL("image/png");return Ql.set(s,o),o},wA=(s,e)=>{const t=String(e);s.dataset.glyphCode=t,EA(e).then(n=>{!n||s.dataset.glyphCode!==t||(s.style.backgroundImage=`url("${n}")`)}).catch(()=>{})},TA=s=>{const e=document.createElement("span");return e.className="bitmap-glyph",s===" "?(e.classList.add("space"),e):(wA(e,bA(s)),e)},jr=(s,e={})=>{const t=document.createElement("span");t.className="bitmap-text",e.className&&(t.className=`bitmap-text ${e.className}`),typeof e.glyphGapEm=="number"&&t.style.setProperty("--glyph-gap",`${e.glyphGapEm}em`);const n=(e.uppercase?s.toUpperCase():s).replace(/\r?\n/g," ");t.setAttribute("role","img"),t.setAttribute("aria-label",e.ariaLabel??s);for(const i of n)t.append(TA(i));return t};Yc().catch(()=>{});const CA=`Every block tells a story
Build rough, then build right
One voxel at a time
Small chunks, big adventures
Ship first, polish after
`,RA=new Set(["singleplayer","create-world","edit-world","settings","keybindings","graphics","stats"]),$r=CA.split(/\r?\n/).map(s=>s.trim()).filter(s=>s.length>0),PA=()=>{if($r.length===0)return"Build your world, block by block.";const s=Math.floor(Math.random()*$r.length);return $r[s]};class IA{constructor(e,t){this.handlers=t,this.root.className="menu-layer",this.panoramaHost.className="menu-panorama",this.classicBackdrop.className="menu-classic-backdrop",this.vignette.className="menu-vignette",this.wardrobeShade.className="wardrobe-shade",this.panel.className="menu-panel",this.panorama=new MA(this.panoramaHost),this.panoramaHost.dataset.panorama=this.panorama?"ready":"off";const n=this.buildHomeView(),i=this.buildSingleplayerView(),r=this.buildCreateWorldView(),a=this.buildEditWorldView(),o=this.buildSettingsView(),l=this.buildKeybindingsView(),c=this.buildGraphicsView(),h=this.buildStatsView(),d=this.buildPauseView(),u=this.buildWardrobeView();this.views.set("home",n),this.views.set("singleplayer",i),this.views.set("create-world",r),this.views.set("edit-world",a),this.views.set("settings",o),this.views.set("keybindings",l),this.views.set("graphics",c),this.views.set("stats",h),this.views.set("pause",d),this.views.set("wardrobe",u),this.panel.append(n,i,r,a,o,l,c,h,d,u),this.root.append(this.panoramaHost,this.classicBackdrop,this.vignette,this.wardrobeShade,this.panel),e.append(this.root),window.addEventListener("resize",this.handleHomeAlignmentResize),this.createNameInput.value="New World",this.wardrobeImportInput.type="file",this.wardrobeImportInput.accept="image/png",this.wardrobeImportInput.addEventListener("change",()=>{const p=this.wardrobeImportInput.files?.[0];if(!p)return;const g=new FileReader;g.onload=()=>{typeof g.result=="string"&&(this.selectedSkinUrl=g.result,this.commitSkinSelection(g.result),this.renderWardrobe(),this.updateViewerSkins())},g.readAsDataURL(p),this.wardrobeImportInput.value=""}),this.handleKeyCapture=this.handleKeyCapture.bind(this),window.addEventListener("keydown",this.handleKeyCapture),this.renderBindings(),this.syncSkinSelectionFromSettings(),this.renderWorldSelection(),this.renderEditWorldScreen(),this.renderStatsView(),this.renderGraphicsView(),this.renderWardrobe(),this.renderPauseView(),this.updateViewerSkins(),this.showScreen("home"),this.alignHomeToViewportCenter(),this.hide()}root=document.createElement("div");panoramaHost=document.createElement("div");classicBackdrop=document.createElement("div");vignette=document.createElement("div");wardrobeShade=document.createElement("div");panel=document.createElement("div");panorama;views=new Map;bindingButtons=new Map;wardrobeCategoryButtons=new Map;statsCategoryButtons=new Map;worldPreviewCache=new Map;worldList=document.createElement("div");editWorldPreview=document.createElement("div");editWorldTitle=document.createElement("h3");editWorldMeta=document.createElement("div");editNameInput=document.createElement("input");createNameInput=document.createElement("input");createSeedInput=document.createElement("input");playWorldButton=document.createElement("button");editWorldButton=document.createElement("button");deleteWorldButton=document.createElement("button");saveEditWorldButton=document.createElement("button");startupFullscreenToggleButton=document.createElement("button");statsList=document.createElement("div");wardrobeCategoryList=document.createElement("div");wardrobeGallery=document.createElement("div");wardrobeImportInput=document.createElement("input");wardrobeEmptyLabel=document.createElement("div");wardrobeSkinName=document.createElement("div");pauseTitle=document.createElement("h2");pauseMeta=document.createElement("div");pauseStats=document.createElement("dl");homeSkinViewer;wardrobeSkinViewer;mode="boot";currentScreen="home";settings=Ws();globalStats=Zs();worlds=[];selectedWorldId=null;listeningBinding=null;pauseWorld=null;selectedWardrobeCategory="";selectedSkinUrl=null;selectedStatsCategory="general";wardrobeCategoryViewers=[];homeLeftColumn=null;homeActionsColumn=null;handleHomeAlignmentResize=()=>{this.alignHomeToViewportCenter()};setSettings(e){this.settings={keyBindings:sn(e.keyBindings),skinDataUrl:e.skinDataUrl,startFullscreen:e.startFullscreen},this.renderBindings(),this.syncSkinSelectionFromSettings(),this.renderGraphicsView(),this.renderWardrobe(),this.updateViewerSkins()}setGlobalStats(e){this.globalStats={...e},this.renderStatsView()}setWorlds(e){if(this.worlds=[...e],(!this.selectedWorldId||!this.worlds.some(t=>t.id===this.selectedWorldId))&&(this.selectedWorldId=this.worlds[0]?.id??null),this.currentScreen==="edit-world"&&!this.getSelectedWorld()){this.showScreen("singleplayer");return}this.renderWorldSelection(),this.renderEditWorldScreen(),this.renderStatsView()}setSelectedWorld(e){if(e&&this.worlds.some(t=>t.id===e)?this.selectedWorldId=e:e===null&&(this.selectedWorldId=null),this.currentScreen==="edit-world"&&!this.getSelectedWorld()){this.showScreen("singleplayer");return}this.renderWorldSelection(),this.renderEditWorldScreen(),this.renderStatsView()}setPauseWorld(e){this.pauseWorld=e?{id:e.id,name:e.name,seed:e.seed,worldStats:{...e.worldStats}}:null,this.renderPauseView()}showBoot(){this.mode="boot",this.root.style.display="grid",this.showScreen("home"),this.alignHomeToViewportCenter()}showPause(){this.mode="pause",this.root.style.display="grid",this.showScreen("pause")}hide(){this.root.style.display="none",this.listeningBinding=null,this.renderBindings()}isVisible(){return this.root.style.display!=="none"}getMode(){return this.mode}buildHomeView(){const e=document.createElement("section");e.className="menu-view home-view";const t=document.createElement("div");t.className="home-layout";const n=document.createElement("div");n.className="home-left-column",this.homeLeftColumn=n;const i=document.createElement("div");i.className="title-masthead";const r=document.createElement("div");r.className="title-brand";const a=jr("MINEBLOW",{className:"menu-logo-text",ariaLabel:"Mineblow"}),o=document.createElement("div");o.className="menu-splash",o.textContent="1.0 ALPHA BUILD !!";const l=document.createElement("p");l.textContent=PA(),r.append(a,o),i.append(r,l);const c=document.createElement("div");c.className="title-actions",this.homeActionsColumn=c;const h=this.buildMainButton("Wardrobe",()=>this.showScreen("wardrobe"));h.classList.add("mobile-wardrobe-button"),c.append(this.buildMainButton("Solo",()=>this.showScreen("singleplayer")),this.buildMainButton("Multijoueur (soon !)",()=>{},!0),this.buildMainButton("Stats",()=>this.showScreen("stats")),this.buildMainButton("Settings",()=>this.showScreen("settings")),h),n.append(i,c);const d=document.createElement("div");d.className="home-right-column home-avatar-column";const u=document.createElement("div");u.className="menu-player-stage bare-player-stage home-avatar-stage",this.homeSkinViewer=new Hs(u);const p=document.createElement("button");p.type="button",p.className="wardrobe-launch-button",p.setAttribute("aria-label","Vestiaire"),p.addEventListener("click",()=>this.showScreen("wardrobe"));const g=document.createElementNS("http://www.w3.org/2000/svg","svg");g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("aria-hidden","true"),g.classList.add("wardrobe-launch-icon-svg");const _=document.createElementNS("http://www.w3.org/2000/svg","path");return _.setAttribute("d","M9 3h6l2.4 2 3.1 1.4V11h-2.1v10H5.6V11H3.5V6.4L6.6 5 9 3z"),_.setAttribute("fill","currentColor"),g.append(_),p.append(g),d.append(u,p),t.append(n,d),e.append(t),e}buildSingleplayerView(){const e=document.createElement("section");e.className="menu-view menu-view-classic singleplayer-view",e.append(this.buildClassicTitle("Select World"));const t=document.createElement("div");t.className="classic-screen-frame world-select-frame",this.worldList.className="minecraft-world-list",t.append(this.worldList);const n=document.createElement("div");n.className="classic-footer-stack";const i=document.createElement("div");i.className="classic-footer-row two-columns",this.playWorldButton.type="button",this.playWorldButton.className="menu-button",this.playWorldButton.textContent="Jouer",this.playWorldButton.addEventListener("click",()=>{this.selectedWorldId&&this.handlers.onPlayWorld(this.selectedWorldId)});const r=document.createElement("button");r.type="button",r.className="menu-button",r.textContent="Creer un monde",r.addEventListener("click",()=>this.openCreateWorldScreen()),i.append(this.playWorldButton,r);const a=document.createElement("div");a.className="classic-footer-row three-columns",this.editWorldButton.type="button",this.editWorldButton.className="menu-button",this.editWorldButton.textContent="Modifier",this.editWorldButton.addEventListener("click",()=>this.openEditWorldScreen()),this.deleteWorldButton.type="button",this.deleteWorldButton.className="menu-button",this.deleteWorldButton.textContent="Supprimer",this.deleteWorldButton.addEventListener("click",()=>{const l=this.getSelectedWorld();l&&window.confirm(`Supprimer le monde "${l.name}" ?`)&&this.handlers.onDeleteWorld(l.id)});const o=document.createElement("button");return o.type="button",o.className="menu-button secondary",o.textContent="Back",o.addEventListener("click",()=>this.showScreen("home")),a.append(this.editWorldButton,this.deleteWorldButton,o),n.append(i,a),e.append(t,n),e}buildCreateWorldView(){const e=document.createElement("section");e.className="menu-view menu-view-classic create-world-view",e.append(this.buildClassicTitle("Create New World"));const t=document.createElement("div");t.className="classic-screen-frame form-screen-frame";const n=document.createElement("div");n.className="classic-form-card";const i=document.createElement("label");i.className="classic-input-group";const r=document.createElement("span");r.textContent="World Name",this.createNameInput.type="text",this.createNameInput.placeholder="New World",i.append(r,this.createNameInput);const a=document.createElement("label");a.className="classic-input-group";const o=document.createElement("span");o.textContent="Seed for the world generator",this.createSeedInput.type="text",this.createSeedInput.placeholder="Laisse vide pour une seed aleatoire",a.append(o,this.createSeedInput),n.append(i,a),t.append(n);const l=document.createElement("div");l.className="classic-footer-row two-columns";const c=document.createElement("button");c.type="button",c.className="menu-button",c.textContent="Create New World",c.addEventListener("click",()=>{const d=this.createNameInput.value.trim()||"New World",u=this.createSeedInput.value.trim();this.handlers.onCreateWorld(d,u),this.createSeedInput.value=""});const h=document.createElement("button");return h.type="button",h.className="menu-button secondary",h.textContent="Back",h.addEventListener("click",()=>this.showScreen("singleplayer")),l.append(c,h),e.append(t,l),e}buildEditWorldView(){const e=document.createElement("section");e.className="menu-view menu-view-classic edit-world-view",e.append(this.buildClassicTitle("Edit World"));const t=document.createElement("div");t.className="classic-screen-frame form-screen-frame";const n=document.createElement("div");n.className="world-edit-card",this.editWorldPreview.className="world-preview-large";const i=document.createElement("div");i.className="world-edit-detail",this.editWorldTitle.className="world-edit-title",this.editWorldMeta.className="world-edit-meta";const r=document.createElement("label");r.className="classic-input-group";const a=document.createElement("span");a.textContent="World Name",this.editNameInput.type="text",this.editNameInput.placeholder="World name",r.append(a,this.editNameInput),i.append(this.editWorldTitle,this.editWorldMeta,r),n.append(this.editWorldPreview,i),t.append(n);const o=document.createElement("div");o.className="classic-footer-row two-columns",this.saveEditWorldButton.type="button",this.saveEditWorldButton.className="menu-button",this.saveEditWorldButton.textContent="Save",this.saveEditWorldButton.addEventListener("click",()=>{const c=this.getSelectedWorld();c&&(this.handlers.onRenameWorld(c.id,this.editNameInput.value.trim()),this.showScreen("singleplayer"))});const l=document.createElement("button");return l.type="button",l.className="menu-button secondary",l.textContent="Back",l.addEventListener("click",()=>this.showScreen("singleplayer")),o.append(this.saveEditWorldButton,l),e.append(t,o),e}buildSettingsView(){const e=document.createElement("section");e.className="menu-view menu-view-classic settings-view",e.append(this.buildClassicTitle("Settings"));const t=document.createElement("div");t.className="classic-screen-frame settings-screen-frame";const n=document.createElement("div");n.className="classic-button-stack settings-buttons-grid";const i=document.createElement("button");i.type="button",i.className="menu-button settings-compact-button",i.textContent="Assignation des touches",i.addEventListener("click",()=>this.showScreen("keybindings"));const r=document.createElement("button");r.type="button",r.className="menu-button settings-compact-button",r.textContent="Options graphiques",r.addEventListener("click",()=>this.showScreen("graphics")),n.append(i,r),t.append(n);const a=document.createElement("div");a.className="classic-footer-row one-column";const o=document.createElement("button");return o.type="button",o.className="menu-button secondary",o.textContent="Back",o.addEventListener("click",()=>this.showScreen(this.mode==="pause"?"pause":"home")),a.append(o),e.append(t,a),e}buildGraphicsView(){const e=document.createElement("section");e.className="menu-view menu-view-classic graphics-view",e.append(this.buildClassicTitle("Options graphiques"));const t=document.createElement("div");t.className="classic-screen-frame settings-screen-frame";const n=document.createElement("div");n.className="classic-button-stack graphics-options-stack",this.startupFullscreenToggleButton.type="button",this.startupFullscreenToggleButton.className="menu-button graphics-toggle-button",this.startupFullscreenToggleButton.addEventListener("click",()=>{this.settings={keyBindings:sn(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:!this.settings.startFullscreen},this.renderGraphicsView(),this.handlers.onSettingsChange({keyBindings:sn(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen})}),n.append(this.startupFullscreenToggleButton),t.append(n);const i=document.createElement("div");i.className="classic-footer-row one-column";const r=document.createElement("button");return r.type="button",r.className="menu-button secondary",r.textContent="Back",r.addEventListener("click",()=>this.showScreen("settings")),i.append(r),e.append(t,i),e}buildKeybindingsView(){const e=document.createElement("section");e.className="menu-view menu-view-classic keybindings-view",e.append(this.buildClassicTitle("Key Bindings"));const t=document.createElement("div");t.className="classic-screen-frame keybindings-screen-frame";const n=document.createElement("div");n.className="binding-list",Vs.forEach(o=>{const l=document.createElement("div");l.className="binding-row";const c=document.createElement("div");c.className="binding-label",c.textContent=ed[o];const h=document.createElement("div");h.className="binding-buttons";const d=document.createElement("button");d.type="button",d.className="binding-button",d.addEventListener("click",()=>this.startBindingCapture(o,"primary")),this.bindingButtons.set(`${o}:primary`,d);const u=document.createElement("button");u.type="button",u.className="binding-button",u.addEventListener("click",()=>this.startBindingCapture(o,"secondary")),this.bindingButtons.set(`${o}:secondary`,u),h.append(d,u),l.append(c,h),n.append(l)}),t.append(n);const i=document.createElement("div");i.className="classic-footer-row two-columns";const r=document.createElement("button");r.type="button",r.className="menu-button",r.textContent="Reset Defaults",r.addEventListener("click",()=>{const o=Ws();this.settings={keyBindings:sn(o.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen},this.renderBindings(),this.handlers.onSettingsChange({keyBindings:sn(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen})});const a=document.createElement("button");return a.type="button",a.className="menu-button secondary",a.textContent="Back",a.addEventListener("click",()=>this.showScreen("settings")),i.append(r,a),e.append(t,i),e}buildStatsView(){const e=document.createElement("section");e.className="menu-view menu-view-classic stats-view",e.append(this.buildClassicTitle("Statistiques globales"));const t=document.createElement("div");t.className="classic-screen-frame stats-screen-frame";const n=document.createElement("div");n.className="classic-tab-row";const i=document.createElement("button");i.type="button",i.className="menu-button classic-tab-button",i.textContent="General",i.addEventListener("click",()=>{this.selectedStatsCategory="general",this.renderStatsView()}),this.statsCategoryButtons.set("general",i);const r=document.createElement("button");r.type="button",r.className="menu-button classic-tab-button",r.textContent="Objets",r.addEventListener("click",()=>{this.selectedStatsCategory="items",this.renderStatsView()}),this.statsCategoryButtons.set("items",r),n.append(i,r),this.statsList.className="stats-line-list",t.append(n,this.statsList);const a=document.createElement("div");a.className="classic-footer-row one-column";const o=document.createElement("button");return o.type="button",o.className="menu-button secondary",o.textContent="Back",o.addEventListener("click",()=>this.showScreen("home")),a.append(o),e.append(t,a),e}buildPauseView(){const e=document.createElement("section");e.className="menu-view pause-view";const t=document.createElement("div");t.className="menu-well pause-well",this.pauseMeta.className="menu-label",this.pauseStats.className="stats-list";const n=document.createElement("div");return n.className="title-actions",n.append(this.buildMainButton("Back to Game",()=>{this.hide(),this.handlers.onResume()}),this.buildMainButton("Settings",()=>this.showScreen("settings")),this.buildMainButton("Quitter la partie",()=>this.handlers.onQuitToTitle())),t.append(this.pauseTitle,this.pauseMeta,this.pauseStats,n),e.append(t),e}buildWardrobeView(){const e=document.createElement("section");e.className="menu-view wardrobe-view",e.append(this.buildClassicTitle("Wardrobe"));const t=document.createElement("div");t.className="classic-layout wardrobe-layout";const n=document.createElement("div");n.className="wardrobe-category-rail",this.wardrobeCategoryList.className="wardrobe-category-list",n.append(this.wardrobeCategoryList);const i=document.createElement("div");i.className="menu-well",this.wardrobeGallery.className="wardrobe-gallery",this.wardrobeEmptyLabel.className="empty-worlds",i.append(this.wardrobeGallery,this.wardrobeEmptyLabel);const r=document.createElement("div");r.className="wardrobe-preview-column";const a=document.createElement("div");a.className="menu-player-stage bare-player-stage wardrobe-stage",this.wardrobeSkinViewer=new Hs(a),this.wardrobeSkinName.className="wardrobe-skin-name",r.append(a,this.wardrobeSkinName),t.append(n,i,r);const o=document.createElement("div");o.className="classic-footer-row one-column";const l=document.createElement("button");return l.type="button",l.className="menu-button secondary",l.textContent="Back",l.addEventListener("click",()=>this.showScreen("home")),o.append(l),e.append(t,o),e}buildClassicTitle(e,t){const n=document.createElement("div");n.className="classic-screen-header";const i=jr(e,{className:"classic-screen-title classic-title-text",uppercase:!0,ariaLabel:e,glyphGapEm:.04});if(n.append(i),t&&t.trim().length>0){const r=document.createElement("p");r.className="classic-screen-subtitle",r.textContent=t,n.append(r)}return n}buildMainButton(e,t,n=!1){const i=document.createElement("button");return i.type="button",i.className="menu-button menu-button-large",i.textContent=e,i.disabled=n,i.addEventListener("click",t),i}showScreen(e){this.currentScreen=e,this.panel.dataset.mode=this.mode,this.panel.dataset.screen=e,this.root.classList.toggle("wardrobe-darkened",e==="wardrobe"),this.views.forEach((t,n)=>{t.style.display=n===e?"grid":"none"}),this.applySurfaceForScreen(e),this.renderWorldSelection(),this.renderEditWorldScreen(),this.renderBindings(),this.renderGraphicsView(),this.renderPauseView(),this.renderStatsView(),this.renderWardrobe(),e==="home"&&this.alignHomeToViewportCenter()}applySurfaceForScreen(e){const t=this.getSurfaceForScreen(e);this.root.dataset.surface=t,this.panoramaHost.style.display=t==="panorama"?"block":"none",this.vignette.style.display=t==="panorama"?"block":"none",this.classicBackdrop.style.display=t==="classic"?"block":"none"}getSurfaceForScreen(e){return this.mode==="pause"&&e==="pause"?"transparent":RA.has(e)?"classic":"panorama"}openCreateWorldScreen(){this.createNameInput.value.trim()||(this.createNameInput.value="New World"),this.showScreen("create-world")}openEditWorldScreen(){const e=this.getSelectedWorld();e&&(this.editNameInput.value=e.name,this.editNameInput.dataset.worldId=e.id,this.showScreen("edit-world"))}getSelectedWorld(){return this.worlds.find(e=>e.id===this.selectedWorldId)??null}renderWorldSelection(){if(this.worldList.replaceChildren(),this.worlds.length===0){const t=document.createElement("div");t.className="empty-worlds",t.textContent="Aucun monde.",this.worldList.append(t)}else this.worlds.forEach(t=>{const n=document.createElement("button");n.type="button",n.className="world-entry",n.classList.toggle("selected",t.id===this.selectedWorldId),n.addEventListener("click",()=>{this.selectedWorldId=t.id,this.renderWorldSelection(),this.renderEditWorldScreen()}),n.addEventListener("dblclick",()=>this.handlers.onPlayWorld(t.id));const i=document.createElement("div");i.className="world-entry-preview",i.style.backgroundImage=`url("${this.getWorldPreviewUrl(t)}")`;const r=document.createElement("div");r.className="world-entry-detail";const a=document.createElement("strong");a.textContent=t.name;const o=document.createElement("span");o.textContent=`Creation : ${this.formatDate(t.createdAt)}`;const l=document.createElement("span");l.textContent=`Derniere partie : ${this.formatDate(t.lastPlayedAt)}`,r.append(a,o,l),n.append(i,r),this.worldList.append(n)});const e=this.getSelectedWorld()!==null;this.playWorldButton.disabled=!e,this.editWorldButton.disabled=!e,this.deleteWorldButton.disabled=!e}renderEditWorldScreen(){const e=this.getSelectedWorld();if(!e){this.editWorldPreview.style.backgroundImage="",this.editWorldTitle.textContent="Aucun monde selectionne",this.editWorldMeta.textContent="",this.editNameInput.value="",this.saveEditWorldButton.disabled=!0;return}this.editWorldPreview.style.backgroundImage=`url("${this.getWorldPreviewUrl(e)}")`,this.editWorldTitle.textContent=e.name,this.editWorldMeta.textContent=`Creation : ${this.formatDate(e.createdAt)} | Derniere partie : ${this.formatDate(e.lastPlayedAt)}`,(document.activeElement!==this.editNameInput||this.editNameInput.dataset.worldId!==e.id)&&(this.editNameInput.value=e.name,this.editNameInput.dataset.worldId=e.id),this.saveEditWorldButton.disabled=!1}renderStatsView(){this.statsCategoryButtons.forEach((t,n)=>{t.classList.toggle("active",n===this.selectedStatsCategory)});const e=this.selectedStatsCategory==="general"?[["Temps de jeu",this.formatDuration(this.globalStats.totalPlayTimeMs)],["Distance parcourue",`${Math.round(this.globalStats.totalDistanceTravelled).toLocaleString()} m`],["Sauts",this.globalStats.totalJumps.toLocaleString()],["Mondes crees",this.globalStats.worldsCreated.toLocaleString()]]:[["Blocs casses",this.globalStats.totalBlocksMined.toLocaleString()],["Blocs poses",this.globalStats.totalBlocksPlaced.toLocaleString()],["Objets craftes",this.globalStats.totalCraftedItems.toLocaleString()],["Mondes sauvegardes",this.worlds.length.toLocaleString()]];this.statsList.replaceChildren(...this.buildStatsRows(e))}renderPauseView(){const e=this.pauseWorld??{name:"Game Paused",seed:"N/A",worldStats:ja()};this.pauseTitle.textContent=e.name,this.pauseMeta.textContent=`Seed ${e.seed}`,this.pauseStats.replaceChildren(...this.buildDefinitionListEntries([["Play Time",this.formatDuration(e.worldStats.playTimeMs)],["Blocks Mined",e.worldStats.blocksMined.toLocaleString()],["Blocks Placed",e.worldStats.blocksPlaced.toLocaleString()],["Distance",`${Math.round(e.worldStats.distanceTravelled).toLocaleString()} m`]]))}renderGraphicsView(){this.startupFullscreenToggleButton.textContent=`Activer le plein ecran au demarrage du jeu : ${this.settings.startFullscreen?"ON":"OFF"}`}renderWardrobe(){this.disposeWardrobeCategoryViewers(),this.wardrobeCategoryButtons.clear(),this.wardrobeCategoryList.replaceChildren();const e=Zl();e.length>0&&!e.some(l=>l.name===this.selectedWardrobeCategory)&&(this.selectedWardrobeCategory=e[0].name),e.forEach(l=>{const c=document.createElement("button");c.type="button",c.className="wardrobe-category-tile",c.classList.toggle("active",l.name===this.selectedWardrobeCategory),c.addEventListener("click",()=>{this.selectedWardrobeCategory=l.name,this.renderWardrobe()});const h=document.createElement("div");if(h.className="wardrobe-category-stage",l.previewSkinUrl){const u=new Hs(h);this.wardrobeCategoryViewers.push(u),u.setSkin(l.previewSkinUrl)}else h.classList.add("empty");const d=document.createElement("span");d.textContent=l.name,c.append(h,d),this.wardrobeCategoryButtons.set(l.name,c),this.wardrobeCategoryList.append(c)});const t=document.createElement("label");t.className="wardrobe-category-tile wardrobe-import-tile";const n=document.createElement("span");n.className="wardrobe-import-plus",n.textContent="+";const i=document.createElement("span");i.textContent="Import",t.append(n,i,this.wardrobeImportInput),this.wardrobeCategoryList.append(t);const r=_A(this.selectedWardrobeCategory);this.wardrobeGallery.replaceChildren(),r.forEach(l=>{const c=document.createElement("button");c.type="button",c.className="wardrobe-skin-card",c.classList.toggle("selected",l.url===this.selectedSkinUrl),c.addEventListener("click",()=>this.selectCatalogSkin(l));const h=document.createElement("span");h.textContent=l.name,c.append(h),this.wardrobeGallery.append(c)}),this.wardrobeEmptyLabel.style.display=r.length===0?"":"none",this.wardrobeEmptyLabel.textContent=e.length===0?"Aucune categorie.":"Aucun skin.";const o=e.flatMap(l=>l.skins).find(l=>l.url===this.settings.skinDataUrl)?.name??(this.settings.skinDataUrl?"Imported Skin":"Default Skin");this.renderWardrobeSkinName(o)}selectCatalogSkin(e){this.selectedWardrobeCategory=e.category,this.selectedSkinUrl=e.url,this.commitSkinSelection(e.url),this.renderWardrobe(),this.updateViewerSkins()}syncSkinSelectionFromSettings(){const e=this.settings.skinDataUrl,t=e===null?null:Zl().flatMap(n=>n.skins).find(n=>n.url===e)??null;t?(this.selectedWardrobeCategory=t.category,this.selectedSkinUrl=t.url):e?this.selectedSkinUrl=e:this.selectedSkinUrl=null}updateViewerSkins(){this.homeSkinViewer.setSkin(this.settings.skinDataUrl),this.wardrobeSkinViewer.setSkin(this.settings.skinDataUrl)}alignHomeToViewportCenter(){if(this.currentScreen!=="home"||!this.homeActionsColumn||!this.homeLeftColumn)return;this.panel.style.setProperty("--home-center-nudge","0px");const e=t=>{if(!this.homeActionsColumn||!this.homeLeftColumn||this.currentScreen!=="home")return;const n=this.homeActionsColumn.getBoundingClientRect(),i=n.left+n.width/2,a=window.innerWidth/2-i;if(Math.abs(a)<.5||t>=3)return;const o=Number.parseFloat(this.panel.style.getPropertyValue("--home-center-nudge").replace("px","")),l=(Number.isFinite(o)?o:0)+a;this.panel.style.setProperty("--home-center-nudge",`${l}px`),requestAnimationFrame(()=>e(t+1))};requestAnimationFrame(()=>e(0))}renderWardrobeSkinName(e){const t=jr(e,{className:"wardrobe-skin-name-text",uppercase:!0,ariaLabel:e,glyphGapEm:.02});this.wardrobeSkinName.replaceChildren(t)}disposeWardrobeCategoryViewers(){this.wardrobeCategoryViewers.forEach(e=>e.dispose()),this.wardrobeCategoryViewers=[]}commitSkinSelection(e){this.settings={keyBindings:sn(this.settings.keyBindings),skinDataUrl:e,startFullscreen:this.settings.startFullscreen},this.handlers.onSettingsChange({keyBindings:sn(this.settings.keyBindings),skinDataUrl:e,startFullscreen:this.settings.startFullscreen})}startBindingCapture(e,t){this.listeningBinding={action:e,slot:t},this.renderBindings()}handleKeyCapture(e){if(!this.isVisible()||!this.listeningBinding)return;e.preventDefault();const{action:t,slot:n}=this.listeningBinding;if(e.code==="Escape"){this.listeningBinding=null,this.renderBindings();return}n==="secondary"&&(e.code==="Backspace"||e.code==="Delete")?this.settings.keyBindings[t].secondary=null:n==="primary"?this.settings.keyBindings[t].primary=e.code:this.settings.keyBindings[t].secondary=e.code,this.listeningBinding=null,this.renderBindings(),this.handlers.onSettingsChange({keyBindings:sn(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen})}renderBindings(){Vs.forEach(e=>{["primary","secondary"].forEach(t=>{const n=this.bindingButtons.get(`${e}:${t}`);if(!n)return;const i=this.settings.keyBindings[e][t],r=this.listeningBinding?.action===e&&this.listeningBinding.slot===t;n.textContent=r?"Press key...":nd(i),n.classList.toggle("listening",r)})})}buildStatsRows(e){return e.map(([t,n])=>{const i=document.createElement("div");i.className="stats-line-row";const r=document.createElement("span");r.className="stats-line-label",r.textContent=t;const a=document.createElement("strong");return a.className="stats-line-value",a.textContent=n,i.append(r,a),i})}buildDefinitionListEntries(e){const t=[];return e.forEach(([n,i])=>{const r=document.createElement("dt");r.textContent=n;const a=document.createElement("dd");a.textContent=i,t.push(r,a)}),t}getWorldPreviewUrl(e){if(e.previewImageDataUrl&&e.previewImageDataUrl.length>1200)return e.previewImageDataUrl;const t=`${e.id}:${e.seed}:${e.createdAt}`,n=this.worldPreviewCache.get(t);if(n)return n;const i=document.createElement("canvas");i.width=192,i.height=108;const r=i.getContext("2d");if(!r)return"";const a=this.createSeededRandom(`${e.seed}|${e.name}|${e.createdAt}`),o=r.createLinearGradient(0,0,0,i.height);o.addColorStop(0,"#79aef5"),o.addColorStop(.6,"#a4cbff"),o.addColorStop(1,"#d7ecff"),r.fillStyle=o,r.fillRect(0,0,i.width,i.height),r.fillStyle="#fff8c2",r.fillRect(18,14,14,14),this.drawMountainRange(r,i.width,i.height,a,"#627c96",.46,20,9),this.drawMountainRange(r,i.width,i.height,a,"#46627f",.58,26,12),this.drawMountainRange(r,i.width,i.height,a,"#35556b",.72,32,16);const l=Math.floor(i.height*.68);r.fillStyle="#5a452d",r.fillRect(0,l,i.width,i.height-l),r.fillStyle="#4f8d3d",r.fillRect(0,l,i.width,8);for(let h=0;h<7;h+=1){const d=Math.floor(a()*(i.width-26)),u=16+Math.floor(a()*18);r.fillStyle="#3e2e1f",r.fillRect(d+7,l-u,6,u),r.fillStyle="#2f6a2c",r.fillRect(d,l-u-14,20,14)}for(let h=0;h<28;h+=1){const d=Math.floor(a()*i.width),u=l+10+Math.floor(a()*22);r.fillStyle=a()>.5?"#75604d":"#6a5544",r.fillRect(d,u,6,6)}const c=i.toDataURL("image/png");return this.worldPreviewCache.set(t,c),c}drawMountainRange(e,t,n,i,r,a,o,l){e.beginPath(),e.moveTo(0,n),e.lineTo(0,Math.floor(n*a));let c=0;for(;c<t+o;){const h=Math.floor(n*(a-.18+i()*.12)),d=o+Math.floor(i()*l);e.lineTo(c,h),c+=d}e.lineTo(t,n),e.closePath(),e.fillStyle=r,e.fill()}createSeededRandom(e){let t=2166136261;for(let i=0;i<e.length;i+=1)t^=e.charCodeAt(i),t=Math.imul(t,16777619);let n=t>>>0;return()=>{n+=1831565813;let i=n;return i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296}}formatDate(e){const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)}formatDuration(e){const t=Math.max(0,Math.floor(e/1e3)),n=Math.floor(t/3600),i=Math.floor(t%3600/60),r=t%60;return n>0?`${n}h ${i}m`:i>0?`${i}m ${r}s`:`${r}s`}}class DA{static cast(e,t,n,i){let r=Math.floor(t.x),a=Math.floor(t.y),o=Math.floor(t.z);const l=n.x>0?1:n.x<0?-1:0,c=n.y>0?1:n.y<0?-1:0,h=n.z>0?1:n.z<0?-1:0,d=l===0?Number.POSITIVE_INFINITY:Math.abs(1/n.x),u=c===0?Number.POSITIVE_INFINITY:Math.abs(1/n.y),p=h===0?Number.POSITIVE_INFINITY:Math.abs(1/n.z),g=w=>w-Math.floor(w);let _=l>0?(1-g(t.x))*d:l<0?g(t.x)*d:Number.POSITIVE_INFINITY,m=c>0?(1-g(t.y))*u:c<0?g(t.y)*u:Number.POSITIVE_INFINITY,f=h>0?(1-g(t.z))*p:h<0?g(t.z)*p:Number.POSITIVE_INFINITY,E=0,b=0,y=0,C=0;for(;E<=i;){const w=e.getBlock(r,a,o);if(w!==0)return{blockWorldX:r,blockWorldY:a,blockWorldZ:o,placeWorldX:r+b,placeWorldY:a+y,placeWorldZ:o+C,normalX:b,normalY:y,normalZ:C,blockId:w,distance:E};_<m&&_<f?(r+=l,E=_,_+=d,b=-l,y=0,C=0):m<f?(a+=c,E=m,m+=u,b=0,y=-c,C=0):(o+=h,E=f,f+=p,b=0,y=0,C=-h)}return null}}class Fn{key;coord;blocks;baseBlocks;dirty=!0;revision=0;constructor(e,t,n){this.coord=e,this.blocks=t,this.baseBlocks=n||t.slice(),this.key=Tt(e)}static getIndex(e,t,n){return e+n*Ge.chunkSizeX+t*Ge.chunkSizeX*Ge.chunkSizeZ}getBlock(e,t,n){return this.blocks[Fn.getIndex(e,t,n)]}setBlock(e,t,n,i){const r=Fn.getIndex(e,t,n);return this.blocks[r]===i?!1:(this.blocks[r]=i,this.dirty=!0,this.revision+=1,!0)}}class LA{chunks=new Map;set(e){this.chunks.set(e.key,e)}get(e){return this.chunks.get(e)}delete(e){return this.chunks.delete(e)}has(e){return this.chunks.has(e)}values(){return this.chunks.values()}entries(){return this.chunks.entries()}get size(){return this.chunks.size}clear(){this.chunks.clear()}}const Us=(s,e,t)=>{let n=s^e*374761393^t*668265263;return n=(n^n>>>13)*1274126177,n^=n>>>16,(n>>>0)/4294967295},Nt=s=>{let e=2166136261;for(let t=0;t<s.length;t+=1)e^=s.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0};class $t{constructor(e){this.seed=e}sample(e,t){const n=Math.floor(e),i=Math.floor(t),r=n+1,a=i+1,o=El(0,1,e-n),l=El(0,1,t-i),c=Us(this.seed,n,i),h=Us(this.seed,r,i),d=Us(this.seed,n,a),u=Us(this.seed,r,a),p=Fr(c,h,o),g=Fr(d,u,o);return Fr(p,g,l)*2-1}fractal(e,t,n,i,r){let a=1,o=0,l=0,c=i;for(let h=0;h<n;h+=1)l+=this.sample(e*c,t*c)*a,o+=a,a*=r,c*=2;return o===0?0:l/o}}const UA=.986,ec=(s,e,t)=>{let n=s^Math.imul(e,73428767)^Math.imul(t,912931);return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967295};class NA{constructor(e){this.worldSeed=e}seed=Nt("tree");shouldSpawnTree(e,t){const n=Nt(this.worldSeed)^this.seed;return ec(n,e,t)>UA}getTreeHeight(e,t){const n=Nt(this.worldSeed)^this.seed<<1;return 4+Math.floor(ec(n,e,t)*3)}applyTrees(e,t,n,i,r){const a=Li(t),o=Ui(t);for(let l=a-2;l<a+Ge.chunkSizeX+2;l+=1)for(let c=o-2;c<o+Ge.chunkSizeZ+2;c+=1){if(!this.shouldSpawnTree(l,c))continue;const h=n(l,c);if(h<1||h>=Ge.chunkSizeY-8||!r(l,c,h)||i(l,h,c)!==1)continue;const d=this.getTreeHeight(l,c);this.placeTrunk(e,t,l,c,h,d),this.placeLeaves(e,t,l,c,h+d,d)}}placeTrunk(e,t,n,i,r,a){for(let o=1;o<=a;o+=1)this.setIfInsideChunk(e,t,n,r+o,i,4)}placeLeaves(e,t,n,i,r,a){const l=r+1;for(let c=r-1;c<=l;c+=1)for(let h=n-2;h<=n+2;h+=1)for(let d=i-2;d<=i+2;d+=1){const u=Math.abs(h-n),p=Math.abs(d-i),g=c-r,_=u===2&&p===2,m=g===1&&u+p>2;_||m||this.setIfInsideChunk(e,t,h,c,d,5)}a>=6&&this.setIfInsideChunk(e,t,n,l+1,i,5)}setIfInsideChunk(e,t,n,i,r,a){if(i<0||i>=Ge.chunkSizeY)return;const o=n-Li(t),l=r-Ui(t);if(o<0||o>=Ge.chunkSizeX||l<0||l>=Ge.chunkSizeZ)return;const c=Fn.getIndex(o,i,l);e[c]===0&&(e[c]=a)}}class BA{continentalNoise;hillNoise;detailNoise;peakMaskNoise;peakRidgeNoise;stonePatchNoise;riverNoiseA;riverNoiseB;riverWarpNoise;coverNoise;sedimentNoise;treeGenerator;columnCache=new Map;constructor(e){this.continentalNoise=new $t(Nt(`${e}:continental`)),this.hillNoise=new $t(Nt(`${e}:hills`)),this.detailNoise=new $t(Nt(`${e}:detail`)),this.peakMaskNoise=new $t(Nt(`${e}:peak-mask`)),this.peakRidgeNoise=new $t(Nt(`${e}:peak-ridge`)),this.stonePatchNoise=new $t(Nt(`${e}:stone-patch`)),this.riverNoiseA=new $t(Nt(`${e}:river-a`)),this.riverNoiseB=new $t(Nt(`${e}:river-b`)),this.riverWarpNoise=new $t(Nt(`${e}:river-warp`)),this.coverNoise=new $t(Nt(`${e}:cover`)),this.sedimentNoise=new $t(Nt(`${e}:sediment`)),this.treeGenerator=new NA(e)}getSurfaceHeight(e,t){return this.sampleColumn(e,t).surfaceHeight}getTerrainBlock(e,t,n){if(t<=0)return 6;const i=this.sampleColumn(e,n);if(t>i.surfaceHeight)return t<=i.waterLevel&&i.riverStrength>.04?10:0;const r=this.getDirtDepth(i),a=i.riverStrength>.04&&i.surfaceHeight<=i.waterLevel;return t===i.surfaceHeight?a?this.sedimentToBlock(i.sediment):i.rockySurface?3:1:t>=i.surfaceHeight-r?a&&t>=i.surfaceHeight-Math.max(1,r-1)&&i.sediment==="mud"?13:2:3}generateChunk(e){const t=new Uint8Array(Ge.chunkSizeX*Ge.chunkSizeY*Ge.chunkSizeZ),n=Li(e),i=Ui(e);for(let r=0;r<Ge.chunkSizeX;r+=1)for(let a=0;a<Ge.chunkSizeZ;a+=1){const o=n+r,l=i+a,c=this.sampleColumn(o,l),h=Math.min(Ge.chunkSizeY-1,Math.max(c.surfaceHeight,c.waterLevel));for(let d=0;d<=h;d+=1){const u=this.getTerrainBlock(o,d,l);u!==0&&(t[Fn.getIndex(r,d,a)]=u)}}return this.treeGenerator.applyTrees(t,e,this.getSurfaceHeight.bind(this),this.getTerrainBlock.bind(this),(r,a,o)=>this.canSpawnTreeAt(r,a,o)),this.applyGroundCover(t,e),new Fn(e,t)}findSpawnPoint(){for(let e=0;e<=14;e+=1)for(let t=-e;t<=e;t+=1)for(let n=-e;n<=e;n+=1){const i=this.sampleColumn(t,n);if(i.surfaceHeight<Ge.chunkSizeY-8&&i.riverStrength<.06&&i.slope<=1.2)return[t+.5,i.surfaceHeight+1,n+.5]}return[.5,40,.5]}canSpawnTreeAt(e,t,n){const i=this.sampleColumn(e,t);return i.surfaceHeight!==n?!1:i.biome!=="peaks"&&i.riverStrength<.08&&!i.rockySurface&&i.slope<1.9}applyGroundCover(e,t){const n=Li(t),i=Ui(t);for(let r=0;r<Ge.chunkSizeX;r+=1)for(let a=0;a<Ge.chunkSizeZ;a+=1){const o=n+r,l=i+a,c=this.sampleColumn(o,l),h=c.surfaceHeight;if(h<2||h>=Ge.chunkSizeY-2||c.riverStrength>.09||c.rockySurface||c.biome==="peaks"||this.getTerrainBlock(o,h,l)!==1)continue;const d=this.coverNoise.fractal(o,l,2,.16,.5);if(d<.48)continue;const u=h+1,p=Fn.getIndex(r,u,a);e[p]===0&&(e[p]=d>.82?15:14)}}getDirtDepth(e){return e.rockySurface?1:e.biome==="rolling"?3:e.slope<.9?4:3}sedimentToBlock(e){switch(e){case"sand":return 11;case"clay":return 12;case"mud":return 13;default:return 2}}sampleColumn(e,t){const n=`${e},${t}`,i=this.columnCache.get(n);if(i)return i;const r=this.sampleRiver(e,t),a=this.sampleBaseHeight(e,t),o=rn(Math.round(a-r.depth),4,Ge.chunkSizeY-8),l=this.estimateSlope(e,t,o),c=this.hillNoise.fractal(e,t,3,.0095,.56),h=rn((this.peakMaskNoise.fractal(e,t,3,.0025,.54)-.46)/.4,0,1),d=1-Math.abs(this.peakRidgeNoise.fractal(e,t,4,.0085,.56)),u=h*Math.pow(rn((d-.57)/.43,0,1),1.5),p=this.stonePatchNoise.fractal(e,t,2,.03,.5);let g="plains";r.strength>.11&&o<=r.waterLevel+1?g="river":u>.24?g="peaks":(c>.2||l>1.2)&&(g="rolling");const _=g==="peaks"||o>=56||l>=2.4||l>=1.9&&p>.26||p>.81,m=this.sedimentNoise.fractal(e,t,2,.02,.52),f=m>.36?"clay":m<-.36?"mud":r.widthNoise>.62?"sand":"dirt",E={surfaceHeight:o,biome:g,rockySurface:_,slope:l,riverStrength:r.strength,riverDepth:r.depth,waterLevel:r.waterLevel,sediment:f};return this.columnCache.size>16384&&this.columnCache.clear(),this.columnCache.set(n,E),E}sampleBaseHeight(e,t){const n=this.continentalNoise.fractal(e,t,3,.0038,.56)*3.8,i=this.hillNoise.fractal(e,t,4,.0115,.55)*5.9,r=this.detailNoise.fractal(e,t,2,.04,.5)*1.4,a=rn((this.peakMaskNoise.fractal(e,t,3,.0025,.54)-.48)/.38,0,1),o=1-Math.abs(this.peakRidgeNoise.fractal(e,t,4,.0085,.56)),l=Math.pow(rn((o-.58)/.42,0,1),1.8),c=a*(6+l*18);return 30+n+i+r+c}sampleRiver(e,t){const n=this.riverWarpNoise.fractal(e,t,2,.0035,.55)*18,i=e+n,r=t-n*.72,a=Math.abs(this.riverNoiseA.fractal(i,r,3,.0047,.56)),o=Math.abs(this.riverNoiseB.fractal(i*1.21,r*1.21,2,.0088,.53)),l=Math.min(a,o*.82+.055),c=rn((this.riverNoiseB.fractal(e-340,t+410,2,.0029,.5)+1)*.5,0,1),h=.046+c*.1,d=rn((h-l)/h,0,1),u=rn((this.detailNoise.fractal(e+820,t-700,2,.01,.55)+1)*.5,0,1),p=1.6+(1-c)*2.8+u*1.8,g=Math.pow(d,1.45)*p,_=30+Math.round(this.continentalNoise.fractal(e+1200,t-1200,2,.0018,.5)*2);return{strength:d,depth:g,widthNoise:c,waterLevel:_}}estimateSlope(e,t,n){const i=Math.abs(this.sampleBaseHeight(e+1,t)-n),r=Math.abs(this.sampleBaseHeight(e-1,t)-n),a=Math.abs(this.sampleBaseHeight(e,t+1)-n),o=Math.abs(this.sampleBaseHeight(e,t-1)-n);return Math.max(i,r,a,o)}}class tc{constructor(e,t){if(this.seed=e,this.generator=new BA(e),t)for(const[n,i]of t.entries())this.chunkDiffs.set(n,new Map(i.changes.map(r=>[r.index,r.blockId])))}generator;chunkStore=new LA;queuedKeys=new Set;generationQueue=[];meshDirtyKeys=new Set;meshQueue=[];removedKeys=new Set;chunkDiffs=new Map;diffDirtyKeys=new Set;getChunkCount(){return this.chunkStore.size}hasPendingGeneration(){return this.generationQueue.length>0}hasPendingMeshes(){return this.meshQueue.length>0}getPlayerChunkCoord(e,t){return Gr(Math.floor(e),Math.floor(t))}enqueueStreamingAround(e,t){const n=this.getPlayerChunkCoord(e,t),i=new Set,r=[];for(let o=n.x-Ge.preloadRadius;o<=n.x+Ge.preloadRadius;o+=1)for(let l=n.z-Ge.preloadRadius;l<=n.z+Ge.preloadRadius;l+=1){const c={x:o,z:l},h=Tt(c);i.add(h),!this.chunkStore.has(h)&&!this.queuedKeys.has(h)&&r.push({coord:c,distance:fg(o,l,n.x,n.z)})}const a=this.generationQueue.filter(o=>{const l=Tt(o);return i.has(l)&&!this.chunkStore.has(l)});this.generationQueue.length=0,this.generationQueue.push(...a),this.queuedKeys.clear(),a.forEach(o=>{this.queuedKeys.add(Tt(o))}),r.sort((o,l)=>o.distance-l.distance).forEach(({coord:o})=>{this.generationQueue.push(o),this.queuedKeys.add(Tt(o))});for(const[o,l]of this.chunkStore.entries())i.has(o)||(this.chunkStore.delete(o),this.removedKeys.add(o),this.markNeighborsDirty(l.coord))}processGenerationBudget(e=Ge.generationBudgetPerFrame){for(let t=0;t<e;t+=1){const n=this.generationQueue.shift();if(!n)return;const i=Tt(n);this.queuedKeys.delete(i),!this.chunkStore.has(i)&&(this.chunkStore.set(this.createChunk(n)),this.queueMeshUpdate(i),this.markNeighborsDirty(n))}}primeAround(e,t,n=2){const i=this.getPlayerChunkCoord(e,t);for(let r=i.x-n;r<=i.x+n;r+=1)for(let a=i.z-n;a<=i.z+n;a+=1){const o={x:r,z:a},l=Tt(o);this.chunkStore.has(l)||(this.chunkStore.set(this.createChunk(o)),this.queueMeshUpdate(l))}}getBlock(e,t,n){if(t<0||t>=Ge.chunkSizeY)return 0;const i=Gr(e,n),r=this.chunkStore.get(Tt(i));if(!r)return 0;const a=Dl(e,t,n);return r.getBlock(a.x,a.y,a.z)}setBlock(e,t,n,i){if(t<0||t>=Ge.chunkSizeY)return!1;const r=Gr(e,n),a=this.chunkStore.get(Tt(r));if(!a)return!1;const o=Dl(e,t,n);if(!a.setBlock(o.x,o.y,o.z,i))return!1;const c=Fn.getIndex(o.x,o.y,o.z),h=this.chunkDiffs.get(a.key)??new Map;return a.baseBlocks[c]===i?h.delete(c):h.set(c,i),h.size===0?this.chunkDiffs.delete(a.key):this.chunkDiffs.set(a.key,h),this.queueMeshUpdate(a.key),this.diffDirtyKeys.add(a.key),this.markBoundaryNeighborsDirty(r,o.x,o.z),!0}getTopSolidBlockY(e,t){return this.generator.getSurfaceHeight(e,t)}getChunkByKey(e){return this.chunkStore.get(e)}getChunkOrigin(e){const t=_g(e);return{x:Li(t),z:Ui(t)}}drainMeshUpdates(e=Ge.meshBudgetPerFrame){const t=[];for(let n=0;n<e;n+=1){const i=this.meshQueue.shift();if(!i)break;this.meshDirtyKeys.delete(i);const r=this.chunkStore.get(i);r&&t.push(r)}return t}drainRemovedChunkKeys(){const e=[...this.removedKeys];return this.removedKeys.clear(),e}drainDirtyDiffs(){const e=[];for(const t of this.diffDirtyKeys)e.push(this.getChunkDiffRecord(t));return this.diffDirtyKeys.clear(),e}getAllDiffRecords(){return[...this.chunkDiffs.keys()].map(e=>this.getChunkDiffRecord(e))}createChunk(e){const t=Tt(e),n=this.generator.generateChunk(e),i=this.chunkDiffs.get(t);if(i)for(const[r,a]of i.entries())n.blocks[r]=a;return n}getChunkDiffRecord(e){const n=this.chunkStore.get(e)?.revision??0,r=[...(this.chunkDiffs.get(e)??new Map).entries()].sort((a,o)=>a[0]-o[0]).map(([a,o])=>({index:a,blockId:o}));return{chunkKey:e,changes:r,revision:n}}markNeighborsDirty(e){const t=[{x:e.x+1,z:e.z},{x:e.x-1,z:e.z},{x:e.x,z:e.z+1},{x:e.x,z:e.z-1}];for(const n of t){const i=Tt(n);this.chunkStore.has(i)&&this.queueMeshUpdate(i)}}markBoundaryNeighborsDirty(e,t,n){t===0&&this.queueMeshUpdate(Tt({x:e.x-1,z:e.z})),t===Ge.chunkSizeX-1&&this.queueMeshUpdate(Tt({x:e.x+1,z:e.z})),n===0&&this.queueMeshUpdate(Tt({x:e.x,z:e.z-1})),n===Ge.chunkSizeZ-1&&this.queueMeshUpdate(Tt({x:e.x,z:e.z+1}))}queueMeshUpdate(e){this.meshDirtyKeys.has(e)||(this.meshDirtyKeys.add(e),this.meshQueue.push(e))}}const Zr={blockId:null,count:0},nc=120,ic=0,kA=new URL("/assets/menu-Bu8EUnNp.mp3",import.meta.url).href,FA=4600,OA=700,zA=16,Ns=256;class GA{constructor(e){this.root=e,this.shell.className="mineblow-shell",this.canvas.className="mineblow-canvas",this.entryGate.className="entry-gate",this.entryGateButton.type="button",this.entryGateButton.className="entry-gate-button",this.entryGateButton.textContent="Cliquez pour acceder a Mineblow",this.entryGateButton.disabled=!0,this.introSplash.className="intro-splash",this.introSplash.textContent="made by teddyfresnes",this.shell.append(this.canvas);const t=document.createElement("div");t.className="entry-gate-body",t.append(this.entryGateButton),this.entryGate.append(t),this.shell.append(this.entryGate,this.introSplash),this.root.append(this.shell),this.menuMusic.loop=!0,this.menuMusic.volume=.42,this.handleMenuMusicUnlock=this.handleMenuMusicUnlock.bind(this),this.handleEntryGateClick=this.handleEntryGateClick.bind(this),this.entryGateButton.addEventListener("click",this.handleEntryGateClick),this.renderer=new Xg(this.canvas),this.input=new ad(this.canvas),this.hud=new dA(this.shell),this.debugOverlay=new cA(this.shell),this.inventoryScreen=new hA(this.shell,{onClose:()=>{this.closeInventory()},onSlotInteract:n=>{this.handleInventorySlotInteract(n)},onRecipeCraft:n=>{this.handleCraftRecipe(n)},onSkinChange:n=>{this.applySettings({keyBindings:sn(this.settings.keyBindings),skinDataUrl:n,startFullscreen:this.settings.startFullscreen})}}),this.menu=new IA(this.shell,{onPlayWorld:n=>{this.loadWorld(n)},onCreateWorld:(n,i)=>{this.startNewWorld(n,i)},onRenameWorld:(n,i)=>{this.renameWorld(n,i)},onDeleteWorld:n=>{this.deleteWorld(n)},onResume:()=>{this.resumeSession()},onQuitToTitle:()=>{this.quitToTitle()},onSettingsChange:n=>{this.applySettings(n)}}),this.gameLoop=new id(1/60,n=>this.update(n),()=>this.render()),this.handleResize=this.handleResize.bind(this),this.handleBeforeUnload=this.handleBeforeUnload.bind(this),this.handlePointerLockChange=this.handlePointerLockChange.bind(this)}shell=document.createElement("div");canvas=document.createElement("canvas");entryGate=document.createElement("div");entryGateButton=document.createElement("button");introSplash=document.createElement("div");renderer;input;menu;hud;debugOverlay;inventoryScreen;saveRepository=new oA;gameLoop;menuMusic=new Audio(kA);persistDirtyChunks=lA(()=>{this.saveDirtyChunks()},ut.worldSaveDebounceMs);session=null;settings=Ws();globalStats=Zs();miningTargetKey=null;miningProgressMs=0;targetHit=null;savePlayerElapsedMs=0;statsPanelRefreshElapsedMs=0;fpsFrames=0;fpsElapsedMs=0;fpsValue=0;lastRenderTime=performance.now();inventoryMode="player";inventoryCursor={...Zr};movementIntensity=0;primaryHoldMs=0;primaryPunchPending=!1;primaryPunchLockMs=0;wasPrimaryDown=!1;dropSequence=0;menuMusicUnlockRegistered=!1;entryGateReady=!1;entryGateActivated=!1;entryGateDelayElapsed=!1;entryGateDismissed=!1;introSplashTimeoutId=null;entryGateDelayTimeoutId=null;pendingWorldPreviewCapture=null;droppedItems=new Map;async bootstrap(){this.input.connect(),this.input.setPointerLockListener(this.handlePointerLockChange),this.hud.setVisible(!1),this.handleResize(),window.addEventListener("resize",this.handleResize),window.addEventListener("beforeunload",this.handleBeforeUnload);const[e,t,n]=await Promise.all([this.saveRepository.loadSettings(),this.saveRepository.loadGlobalStats(),this.saveRepository.listWorlds()]);this.settings=e,this.globalStats=t,this.menu.setSettings(e),this.menu.setGlobalStats(t),this.menu.setWorlds(n),this.hud.setHandSkin(e.skinDataUrl),this.entryGateReady=!0,this.entryGateButton.disabled=!1,this.entryGateActivated&&this.finishEntryGate(),this.gameLoop.start()}async refreshMenuWorlds(e){const t=await this.saveRepository.listWorlds();this.menu.setWorlds(t),e!==void 0&&this.menu.setSelectedWorld(e)}async renameWorld(e,t){const n=await this.saveRepository.renameWorld(e,t);await this.refreshMenuWorlds(n?.id??e),this.session&&this.session.id===e&&n&&(this.session.name=n.name,this.updatePauseMenuSnapshot())}async deleteWorld(e){await this.saveRepository.deleteWorld(e),await this.refreshMenuWorlds()}updatePauseMenuSnapshot(){if(!this.session){this.menu.setPauseWorld(null);return}this.menu.setPauseWorld({id:this.session.id,name:this.session.name,seed:this.session.seed,worldStats:this.session.worldStats})}async quitToTitle(){this.session&&await this.flushSaves(),this.session=null,this.pendingWorldPreviewCapture=null,this.input.exitPointerLock(),this.inventoryScreen.setVisible(!1),this.inventoryCursor={...Zr},this.targetHit=null,this.miningTargetKey=null,this.miningProgressMs=0,this.primaryHoldMs=0,this.primaryPunchPending=!1,this.primaryPunchLockMs=0,this.wasPrimaryDown=!1,this.dropSequence=0,this.droppedItems.clear(),this.renderer.clearChunks(),this.renderer.clearDroppedItems(),this.renderer.setMiningOverlay(null,0),this.hud.setMiningProgress(0),this.hud.setVisible(!1),this.menu.setGlobalStats(this.globalStats),this.menu.setPauseWorld(null),await this.refreshMenuWorlds(),this.menu.showBoot(),this.playMenuMusic()}async startNewWorld(e,t){const n=t||`mineblow-${Date.now().toString(36)}`;this.renderer.clearChunks();const i=new tc(n);i.primeAround(0,0,1);const r=Il.resolve(i),a={position:[...r],velocity:[0,0,0],yaw:0,pitch:0,selectedSlot:0,spawnPoint:[...r]},o=new wo,l=ja(),c=await this.saveRepository.createNewWorld(e,n,a,o.snapshot(),l);this.globalStats=await this.saveRepository.loadGlobalStats(),this.menu.setGlobalStats(this.globalStats),await this.refreshMenuWorlds(c.id),await this.activateSession({id:c.id,name:c.name,seed:n,world:i,player:new Pl(a),inventory:o,worldStats:l})}async loadWorld(e){const t=await this.saveRepository.loadWorld(e);if(!t){await this.refreshMenuWorlds(),this.menu.showBoot();return}this.renderer.clearChunks(),await this.activateLoadedWorld(t)}async activateLoadedWorld(e){const t=new tc(e.save.seed,e.chunkDiffs);t.primeAround(e.save.player.position[0],e.save.player.position[2],1),t.primeAround(0,0,1);const n=this.createSafePlayerState(e.save.player,t),i=new wo(e.save.inventory,n.selectedSlot),r=this.normalizeWorldStats(e.save.worldStats);await this.refreshMenuWorlds(e.save.id),await this.activateSession({id:e.save.id,name:e.save.name,seed:e.save.seed,world:t,player:new Pl(n),inventory:i,worldStats:r})}async activateSession(e){this.session=e,this.stopMenuMusic(),this.savePlayerElapsedMs=0,this.statsPanelRefreshElapsedMs=0,this.miningTargetKey=null,this.miningProgressMs=0,this.targetHit=null,this.inventoryCursor={...Zr},this.movementIntensity=0,this.primaryHoldMs=0,this.primaryPunchPending=!1,this.primaryPunchLockMs=0,this.wasPrimaryDown=!1,this.dropSequence=0,this.droppedItems.clear(),this.renderer.clearDroppedItems(),this.renderer.setMiningOverlay(null,0),this.inventoryScreen.setVisible(!1),this.hud.setMiningProgress(0),this.hud.setHealth(20,20),this.updateLevelHud();const[t,,n]=e.player.getPosition();e.world.enqueueStreamingAround(t,n),this.syncChunkMeshes(),this.hud.setVisible(!0),this.hud.setHandSkin(this.settings.skinDataUrl),this.renderer.setPlayerSkin(this.settings.skinDataUrl),this.menu.setPauseWorld({id:e.id,name:e.name,seed:e.seed,worldStats:e.worldStats}),this.updateFirstPersonHandVisibility(e.inventory),this.hud.updateHotbar(e.inventory.getHotbarSlots(),e.inventory.getSelectedHotbarIndex()),this.hud.setGenerating(e.world.hasPendingGeneration()||e.world.hasPendingMeshes()),this.queueWorldPreviewCapture(e.id),await this.resumeSession()}async resumeSession(){this.hud.setVisible(!0),this.menu.hide();try{await this.input.requestPointerLock()}catch{this.updatePauseMenuSnapshot(),this.menu.showPause()}}update(e){this.input.consumeAnyJustPressed([this.settings.keyBindings.debug.primary,this.settings.keyBindings.debug.secondary,"F3"])&&this.debugOverlay.toggle(),this.input.consumeAnyJustPressed([this.settings.keyBindings.inventory.primary,this.settings.keyBindings.inventory.secondary,"KeyI"])&&(this.inventoryScreen.isVisible()?this.closeInventory():this.session&&!this.menu.isVisible()&&this.openInventory("player"));const i=this.input.consumeAnyJustPressed([this.settings.keyBindings.pause.primary,this.settings.keyBindings.pause.secondary,"Escape"]);if(this.inventoryScreen.isVisible()&&i&&this.closeInventory(),!this.session){this.input.endFrame();return}const{world:r,player:a,inventory:o}=this.session;if(i&&this.input.isPointerLocked()&&!this.inventoryScreen.isVisible()&&!this.menu.isVisible()&&(this.input.exitPointerLock(),this.updatePauseMenuSnapshot(),this.menu.showPause(),this.hud.setVisible(!1)),!this.inventoryScreen.isVisible()){const u=this.input.consumeWheelSteps();u!==0&&(o.shiftSelectedHotbar(u),a.setSelectedSlot(o.getSelectedHotbarIndex()));const p=this.input.consumeNumberSlot();p!==null&&(o.setSelectedHotbarIndex(p),a.setSelectedSlot(o.getSelectedHotbarIndex()))}if(this.updateFirstPersonHandVisibility(o),this.input.isPointerLocked()&&!this.menu.isVisible()&&!this.inventoryScreen.isVisible()){this.primaryPunchLockMs=Math.max(0,this.primaryPunchLockMs-e*1e3);const u=this.input.isPrimaryDown();this.input.consumePrimaryClick()&&(u?(this.primaryPunchPending=!0,this.primaryHoldMs=0):(this.primaryPunchLockMs<=0&&(this.primaryPunchLockMs=ic,this.renderer.triggerFirstPersonAction(1.55)),this.primaryPunchPending=!1,this.primaryHoldMs=0)),u&&this.primaryPunchPending&&(this.primaryHoldMs+=e*1e3);const g=a.getPosition(),_=a.update(e,this.input,r,this.settings.keyBindings);_.jumped&&this.renderer.triggerFirstPersonJump(.85);const m=a.getPosition();if(this.trackMovementStats(g,m,e,_),this.targetHit=DA.cast(r,a.getCameraPosition(),a.getLookDirection(),Ge.maxInteractionDistance),u&&this.primaryPunchPending&&this.primaryHoldMs>=nc&&this.targetHit&&Or(this.targetHit.blockId)&&(this.primaryPunchPending=!1),!u&&this.wasPrimaryDown){const y=this.primaryPunchPending&&this.primaryPunchLockMs<=0;this.primaryPunchPending=!1,this.primaryHoldMs=0,y&&(this.primaryPunchLockMs=ic,this.renderer.triggerFirstPersonAction(1.55))}const b=this.primaryPunchLockMs<=0&&u&&!this.primaryPunchPending&&this.primaryHoldMs>=nc&&!!this.targetHit&&Or(this.targetHit.blockId);this.handleInteractions(e,b),this.wasPrimaryDown=u,this.updateDroppedItems(e),this.hud.updateHand(e,this.movementIntensity,this.miningProgressMs>0),this.renderer.updateHand(e,this.movementIntensity,this.miningProgressMs>0),this.renderer.updateSpeedFov(e,_.sprinting,_.moving,a.isGrounded())}else this.input.consumePrimaryClick(),this.primaryHoldMs=0,this.primaryPunchPending=!1,this.primaryPunchLockMs=0,this.wasPrimaryDown=!1,this.resetMining(),this.targetHit=null,this.renderer.setMiningOverlay(null,0),this.hud.setMiningProgress(0),this.hud.updateHand(e,0,!1),this.renderer.updateHand(e,0,!1),this.renderer.updateSpeedFov(e,!1,!1,!0);this.renderer.updateTransientEffects(e),r.enqueueStreamingAround(a.getPosition()[0],a.getPosition()[2]),r.processGenerationBudget(),this.syncChunkMeshes(),this.hud.updateHotbar(o.getHotbarSlots(),o.getSelectedHotbarIndex()),this.hud.setGenerating(r.hasPendingGeneration()||r.hasPendingMeshes()),this.hud.setFps(this.fpsValue),this.hud.setHealth(20,20),this.updateLevelHud(),this.inventoryScreen.isVisible()&&this.refreshInventoryScreen(),this.savePlayerElapsedMs+=e*1e3,this.savePlayerElapsedMs>=ut.playerSaveIntervalMs&&(this.savePlayerElapsedMs=0,this.persistProfile(!0)),this.statsPanelRefreshElapsedMs+=e*1e3,this.statsPanelRefreshElapsedMs>=500&&(this.statsPanelRefreshElapsedMs=0,this.menu.setGlobalStats(this.globalStats),this.updatePauseMenuSnapshot());const[c,h,d]=a.getPosition();this.updateDebugPanel(c,h,d),this.input.endFrame()}render(){if(this.session){const t=this.session.player.getCameraPosition(),n=this.session.player.getRotation();this.renderer.setCameraTransform(t,n.yaw,n.pitch)}const e=performance.now();this.fpsFrames+=1,this.fpsElapsedMs+=e-this.lastRenderTime,this.lastRenderTime=e,this.fpsElapsedMs>=500&&(this.fpsValue=Math.round(this.fpsFrames*1e3/this.fpsElapsedMs),this.fpsFrames=0,this.fpsElapsedMs=0),this.renderer.render(),this.capturePendingWorldPreview()}queueWorldPreviewCapture(e){this.pendingWorldPreviewCapture={worldId:e,framesRemaining:zA}}capturePendingWorldPreview(){const e=this.pendingWorldPreviewCapture;if(!e)return;if(!this.session||this.session.id!==e.worldId){this.pendingWorldPreviewCapture=null;return}if(e.framesRemaining>0){e.framesRemaining-=1;return}this.pendingWorldPreviewCapture=null;const t=this.captureWorldPreviewPng();t&&this.saveRepository.saveWorldPreview(e.worldId,t)}captureWorldPreviewPng(){const e=this.canvas.width,t=this.canvas.height;if(e<8||t<8)return null;const n=Math.min(e,t),i=Math.floor((e-n)*.5),r=Math.floor((t-n)*.5),a=document.createElement("canvas");a.width=Ns,a.height=Ns;const o=a.getContext("2d");return o?(o.imageSmoothingEnabled=!0,o.drawImage(this.canvas,i,r,n,n,0,0,Ns,Ns),a.toDataURL("image/png")):null}handleInteractions(e,t){if(!this.session)return;const{world:n,player:i,inventory:r}=this.session;if(t&&this.targetHit&&Or(this.targetHit.blockId)){const a=`${this.targetHit.blockWorldX},${this.targetHit.blockWorldY},${this.targetHit.blockWorldZ}`;this.miningTargetKey!==a&&(this.miningTargetKey=a,this.miningProgressMs=0),this.miningProgressMs+=e*1e3;const o=mg(this.targetHit.blockId),l=Math.min(1,this.miningProgressMs/o);if(this.hud.setMiningProgress(l),this.renderer.setMiningOverlay(this.targetHit,l),this.miningProgressMs>=o){const c=this.targetHit.blockId;n.setBlock(this.targetHit.blockWorldX,this.targetHit.blockWorldY,this.targetHit.blockWorldZ,0)&&(this.spawnDroppedItem(c,this.targetHit.blockWorldX+.5,this.targetHit.blockWorldY+.5,this.targetHit.blockWorldZ+.5),this.renderer.spawnBreakParticles(wi(c),this.targetHit.blockWorldX,this.targetHit.blockWorldY,this.targetHit.blockWorldZ),this.session.worldStats.blocksMined+=1,this.globalStats.totalBlocksMined+=1,this.persistDirtyChunks(),this.persistProfile(!0)),this.resetMining()}}else this.resetMining(),this.hud.setMiningProgress(0),this.renderer.setMiningOverlay(null,0);if(this.targetHit&&this.input.consumeSecondaryClick()){if(this.targetHit.blockId===8){this.openInventory("crafting_table");return}const a=r.getSelectedBlock();a!==null&&gg(a)&&n.getBlock(this.targetHit.placeWorldX,this.targetHit.placeWorldY,this.targetHit.placeWorldZ)===0&&i.canOccupyBlock(this.targetHit.placeWorldX,this.targetHit.placeWorldY,this.targetHit.placeWorldZ)&&n.setBlock(this.targetHit.placeWorldX,this.targetHit.placeWorldY,this.targetHit.placeWorldZ,a)&&(r.consumeSelectedBlock(),this.session.worldStats.blocksPlaced+=1,this.globalStats.totalBlocksPlaced+=1,this.persistDirtyChunks(),this.persistProfile(!0))}}openInventory(e){this.session&&(this.inventoryMode=e,this.inventoryScreen.setVisible(!0),this.hud.setVisible(!1),this.input.exitPointerLock(),this.refreshInventoryScreen())}async closeInventory(){if(this.session){if(this.inventoryCursor=this.session.inventory.returnCursor(this.inventoryCursor),this.inventoryCursor.blockId!==null&&this.inventoryCursor.count>0){this.refreshInventoryScreen();return}this.inventoryScreen.setVisible(!1),await this.persistProfile(!0),await this.resumeSession()}}refreshInventoryScreen(){if(!this.session)return;const e=To(this.inventoryMode),t=new Set(e.filter(i=>sc(this.session.inventory,i)).map(i=>i.id)),n={mode:this.inventoryMode,slots:this.session.inventory.getSlots(),selectedHotbarIndex:this.session.inventory.getSelectedHotbarIndex(),cursor:{...this.inventoryCursor},recipes:e,craftableRecipeIds:t,skinDataUrl:this.settings.skinDataUrl};this.inventoryScreen.render(n)}handleInventorySlotInteract(e){if(!this.session||!this.inventoryScreen.isVisible())return;const t=this.session.inventory,n=e.index;if(e.shift&&this.inventoryCursor.blockId===null){this.transferStackBetweenSections(t,n)&&this.refreshInventoryScreen();return}const i=t.getSlot(n);if(e.button==="left")if(this.inventoryCursor.blockId===null||this.inventoryCursor.count===0){if(i.blockId===null||i.count===0)return;this.inventoryCursor=t.pickUpSlot(n)}else this.inventoryCursor=t.placeCursor(n,this.inventoryCursor);else this.inventoryCursor=this.handleRightClickInventory(t,n,i,this.inventoryCursor);this.refreshInventoryScreen()}handleCraftRecipe(e){if(!this.session||!this.inventoryScreen.isVisible())return;const t=To(this.inventoryMode).find(n=>n.id===e);t&&rd(this.session.inventory,t)&&(this.session.worldStats.craftedItems+=t.output.count,this.globalStats.totalCraftedItems+=t.output.count,this.refreshInventoryScreen(),this.hud.updateHotbar(this.session.inventory.getHotbarSlots(),this.session.inventory.getSelectedHotbarIndex()),this.persistProfile(!0))}syncChunkMeshes(){if(this.session){for(const e of this.session.world.drainRemovedChunkKeys())this.renderer.removeChunkMesh(e);for(const e of this.session.world.drainMeshUpdates()){const t=xi.buildGeometry(e,this.session.world,this.renderer.atlas);this.renderer.upsertChunkMesh(e.key,t,this.session.world.getChunkOrigin(e.key))}}}async saveDirtyChunks(){if(!this.session)return;const e=this.session.world.drainDirtyDiffs();e.length!==0&&await this.saveRepository.saveChunkDiffs(this.session.id,e)}resetMining(){this.miningTargetKey=null,this.miningProgressMs=0,this.hud.setMiningProgress(0)}updateDebugPanel(e,t,n){if(!this.session)return;const i=this.session.world.getPlayerChunkCoord(e,n);this.debugOverlay.update([`FPS: ${this.fpsValue}`,`POS: ${e.toFixed(2)}, ${t.toFixed(2)}, ${n.toFixed(2)}`,`CHUNK: ${i.x}, ${i.z}`,`LOADED: ${this.session.world.getChunkCount()}`,`STREAM: ${this.session.world.hasPendingGeneration()||this.session.world.hasPendingMeshes()?"busy":"steady"}`,`SEED: ${this.session.seed}`,`MODE: ${this.inventoryScreen.isVisible()?this.inventoryMode:"play"}`].join(`
`))}updateFirstPersonHandVisibility(e){const t=e.getSlot(e.getSelectedAbsoluteSlotIndex()),n=t.blockId===null||t.count<=0;this.renderer.setFirstPersonAnimationPreset(n?"hand":"item"),this.renderer.setFirstPersonHandVisible(n)}createSafePlayerState(e,t){const n=Il.resolve(t),i=this.canStandAt(t,e.spawnPoint)?e.spawnPoint:n;return{position:[...this.canStandAt(t,e.position)?e.position:i],velocity:[0,0,0],yaw:Number.isFinite(e.yaw)?e.yaw:0,pitch:Number.isFinite(e.pitch)?Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e.pitch)):0,selectedSlot:Math.max(0,Math.min(8,e.selectedSlot|0)),spawnPoint:[...i]}}canStandAt(e,t){const[n,i,r]=t;if(!Number.isFinite(n)||!Number.isFinite(i)||!Number.isFinite(r)||i<1||i>Ge.chunkSizeY-2)return!1;const a=Math.floor(i),o=Math.floor(i+1),l=a-1,c=[[n,r],[n-.28,r-.28],[n+.28,r-.28],[n-.28,r+.28],[n+.28,r+.28]];return c.some(([d,u])=>kn(e.getBlock(Math.floor(d),l,Math.floor(u))))?c.every(([d,u])=>{const p=Math.floor(d),g=Math.floor(u);return e.getBlock(p,a,g)===0&&e.getBlock(p,o,g)===0}):!1}handleResize(){this.renderer.resize(window.innerWidth,window.innerHeight)}handlePointerLockChange(e){if(this.session){if(e){this.menu.hide(),this.inventoryScreen.isVisible()||this.hud.setVisible(!0);return}this.inventoryScreen.isVisible()||this.menu.isVisible()||(this.menu.setGlobalStats(this.globalStats),this.updatePauseMenuSnapshot(),this.menu.showPause(),this.hud.setVisible(!1))}}handleBeforeUnload(){this.introSplashTimeoutId!==null&&(window.clearTimeout(this.introSplashTimeoutId),this.introSplashTimeoutId=null),this.entryGateDelayTimeoutId!==null&&(window.clearTimeout(this.entryGateDelayTimeoutId),this.entryGateDelayTimeoutId=null),this.stopMenuMusic(),this.flushSaves()}async flushSaves(){if(!this.session)return;await this.persistProfile(!0);const e=this.captureWorldPreviewPng();e&&await this.saveRepository.saveWorldPreview(this.session.id,e),await this.saveRepository.saveChunkDiffs(this.session.id,this.session.world.getAllDiffRecords())}spawnDroppedItem(e,t,n,i){const r=`drop-${++this.dropSequence}`,a=[(Math.random()-.5)*2.6,2.5+Math.random()*1.6,(Math.random()-.5)*2.6],o={id:r,blockId:e,position:[t,n,i],velocity:a,ageMs:0};this.droppedItems.set(r,o),this.renderer.spawnDroppedItem(r,wi(e),t,n,i)}updateDroppedItems(e){if(!this.session||this.droppedItems.size===0)return;const{world:t,player:n,inventory:i}=this.session,r=n.getPosition(),a=1.9*1.9,o=5.5,l=o*o,c=18;for(const[h,d]of this.droppedItems.entries()){d.ageMs+=e*1e3;const u=t.getBlock(Math.floor(d.position[0]),Math.floor(d.position[1]),Math.floor(d.position[2])),p=$s(u);p?(d.velocity[0]*=.9,d.velocity[2]*=.9,d.velocity[1]-=3.5*e,d.velocity[1]<-1.4&&(d.velocity[1]=-1.4)):d.velocity[1]-=c*e,d.position[0]+=d.velocity[0]*e,d.position[1]+=d.velocity[1]*e,d.position[2]+=d.velocity[2]*e;const g=Math.floor(d.position[1]-.14),_=t.getBlock(Math.floor(d.position[0]),g,Math.floor(d.position[2]));kn(_)&&d.velocity[1]<=0&&(d.position[1]=g+1+.14,d.velocity[1]=p?-.2:0,d.velocity[0]*=.72,d.velocity[2]*=.72);const m=r[0]-d.position[0],f=r[1]+.8-d.position[1],E=r[2]-d.position[2],b=m*m+f*f+E*E;if(d.ageMs>120&&b<l){const w=Math.max(1e-4,Math.sqrt(b)),R=Math.max(0,Math.min(1,(o-w)/o)),U=(p?5.6:11.5)*(.25+R*1.35),M=1/w;d.velocity[0]+=m*M*U*e,d.velocity[1]+=f*M*U*e*.58,d.velocity[2]+=E*M*U*e;const S=Math.hypot(d.velocity[0],d.velocity[2]),P=p?3.1:6.3;if(S>P){const k=P/S;d.velocity[0]*=k,d.velocity[2]*=k}}if(d.ageMs>180&&b<a&&i.addBlock(d.blockId)){this.droppedItems.delete(h),this.renderer.removeDroppedItem(h),this.hud.updateHotbar(i.getHotbarSlots(),i.getSelectedHotbarIndex());continue}if(d.ageMs>12e4){this.droppedItems.delete(h),this.renderer.removeDroppedItem(h);continue}const y=.08*Math.sin(d.ageMs*.008),C=d.ageMs*.0032;this.renderer.updateDroppedItem(h,d.position[0],d.position[1],d.position[2],C,y)}}trackMovementStats(e,t,n,i){if(!this.session)return;const r=t[0]-e[0],a=t[1]-e[1],o=t[2]-e[2],l=Math.hypot(r,a,o);this.movementIntensity=Math.max(0,Math.min(1.15,l/Math.max(1e-4,Ie.sprintSpeed*n))),this.session.worldStats.distanceTravelled+=l,this.globalStats.totalDistanceTravelled+=l,this.session.worldStats.playTimeMs+=n*1e3,this.globalStats.totalPlayTimeMs+=n*1e3,i.jumped&&(this.session.worldStats.jumps+=1,this.globalStats.totalJumps+=1)}updateLevelHud(){if(!this.session)return;const e=28,t=Math.floor(this.session.worldStats.blocksMined/e)+1,n=this.session.worldStats.blocksMined%e/e;this.hud.setLevel(t,n)}async persistProfile(e){this.session&&(await this.saveRepository.savePlayer(this.session.id,this.session.player.getState(),this.session.inventory.snapshot(),this.session.worldStats),e&&await this.saveRepository.saveGlobalStats(this.globalStats))}applySettings(e){this.settings={keyBindings:sn(e.keyBindings),skinDataUrl:e.skinDataUrl,startFullscreen:e.startFullscreen},this.menu.setSettings(this.settings),this.hud.setHandSkin(this.settings.skinDataUrl),this.renderer.setPlayerSkin(this.settings.skinDataUrl),this.saveRepository.saveSettings(this.settings),this.inventoryScreen.isVisible()&&this.refreshInventoryScreen()}normalizeWorldStats(e){if(!e)return ja();const t=n=>Number.isFinite(n)?Number(n):0;return{blocksMined:t(e.blocksMined),blocksPlaced:t(e.blocksPlaced),distanceTravelled:t(e.distanceTravelled),playTimeMs:t(e.playTimeMs),jumps:t(e.jumps),craftedItems:t(e.craftedItems)}}handleRightClickInventory(e,t,n,i){if(i.blockId===null||i.count<=0){if(n.blockId===null||n.count<=0)return{blockId:null,count:0};const o=Math.ceil(n.count/2);return e.setSlot(t,{blockId:n.blockId,count:n.count-o}),n.count-o<=0&&e.setSlot(t,{blockId:null,count:0}),{blockId:n.blockId,count:o}}if(n.blockId===null||n.count<=0){e.setSlot(t,{blockId:i.blockId,count:1});const o=i.count-1;return o>0?{blockId:i.blockId,count:o}:{blockId:null,count:0}}if(n.blockId!==i.blockId||n.count>=Xt)return i;e.setSlot(t,{blockId:n.blockId,count:Math.min(Xt,n.count+1)});const a=i.count-1;return a>0?{blockId:i.blockId,count:a}:{blockId:null,count:0}}transferStackBetweenSections(e,t){const n=e.getSlot(t);if(n.blockId===null||n.count<=0)return!1;const i=t<27?[27,35]:[0,26];let r=n.count;for(let a=i[0];a<=i[1];a+=1){const o=e.getSlot(a);if(o.blockId!==n.blockId||o.count>=Xt)continue;const l=Math.min(Xt-o.count,r);if(e.setSlot(a,{blockId:o.blockId,count:o.count+l}),r-=l,r===0)break}for(let a=i[0];a<=i[1]&&r>0;a+=1){const o=e.getSlot(a);if(o.blockId!==null&&o.count>0)continue;const l=Math.min(Xt,r);e.setSlot(a,{blockId:n.blockId,count:l}),r-=l}return r===n.count?!1:(r<=0?e.setSlot(t,{blockId:null,count:0}):e.setSlot(t,{blockId:n.blockId,count:r}),!0)}async playMenuMusic(){if(this.menuMusic.paused)try{await this.menuMusic.play(),this.unregisterMenuMusicUnlock()}catch{this.registerMenuMusicUnlock()}}stopMenuMusic(){this.menuMusic.pause(),this.menuMusic.currentTime=0,this.unregisterMenuMusicUnlock()}registerMenuMusicUnlock(){this.menuMusicUnlockRegistered||(this.menuMusicUnlockRegistered=!0,window.addEventListener("pointerdown",this.handleMenuMusicUnlock),window.addEventListener("keydown",this.handleMenuMusicUnlock))}unregisterMenuMusicUnlock(){this.menuMusicUnlockRegistered&&(this.menuMusicUnlockRegistered=!1,window.removeEventListener("pointerdown",this.handleMenuMusicUnlock),window.removeEventListener("keydown",this.handleMenuMusicUnlock))}handleMenuMusicUnlock(){this.playMenuMusic()}handleEntryGateClick(){this.entryGateDismissed||this.entryGateActivated||(this.entryGateActivated=!0,this.entryGateDelayElapsed=!1,this.entryGateButton.disabled=!0,this.entryGateButton.textContent=this.entryGateReady?"Acces...":"Chargement...",this.settings.startFullscreen&&this.requestFullscreen(),this.showIntroSplash(),this.entryGateDelayTimeoutId!==null&&window.clearTimeout(this.entryGateDelayTimeoutId),this.entryGateDelayTimeoutId=window.setTimeout(()=>{this.entryGateDelayElapsed=!0,this.entryGateDelayTimeoutId=null,this.finishEntryGate()},OA),this.playMenuMusic(),this.finishEntryGate())}finishEntryGate(){!this.entryGateReady||this.entryGateDismissed||!this.entryGateActivated||!this.entryGateDelayElapsed||(this.entryGateDismissed=!0,this.entryGate.remove(),this.menu.showBoot())}showIntroSplash(){this.introSplash.classList.remove("active"),this.introSplash.offsetWidth,this.introSplash.classList.add("active"),this.introSplashTimeoutId!==null&&window.clearTimeout(this.introSplashTimeoutId),this.introSplashTimeoutId=window.setTimeout(()=>{this.introSplash.classList.remove("active"),this.introSplashTimeoutId=null},FA)}async requestFullscreen(){if(!document.fullscreenElement)try{await this.shell.requestFullscreen()}catch{}}}const qc=document.querySelector("#app");if(!qc)throw new Error("App root not found.");const HA=new GA(qc);HA.bootstrap();
