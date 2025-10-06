// WASM Blocks 메인 JavaScript 파일

let workspace;
let wabtModule; // wabt.js 모듈 (WAT를 WASM으로 컴파일하기 위해)
let currentLanguage = 'ko'; // 기본 언어

// 🌍 다국어 지원 시스템
const i18n = {
    ko: {
        // 헤더
        title: "WASM Blocks",
        subtitle: "WebAssembly Visual Programming Environment",
        langBtn: "한국어",
        runBtn: "실행",
        exportBtn: "저장", 
        clearBtn: "초기화",
        helpBtn: "도움말",
        
        // 버튼 툴팁
        runTooltip: "코드 실행 (Ctrl+Enter)",
        exportTooltip: "프로젝트 저장 (Ctrl+S)",
        clearTooltip: "워크스페이스 초기화 (Ctrl+N)",
        helpTooltip: "도움말 보기",
        langTooltip: "언어 전환 / Switch Language",
        
        // 섹션 제목
        blockEditor: "블록 편집기",
        codePreview: "생성된 WAT 코드",
        consoleOutput: "실행 결과",
        
        // 콘솔 메시지
        compileSuccess: "WAT → WASM 컴파일 성공!",
        compileError: "컴파일 실패:",
        executionSuccess: "실행 성공! 결과:",
        executionError: "💥 실행 중 오류:",
        noMainFunction: "main 함수를 찾을 수 없습니다.",
        noExportedFunctions: "내보낸 함수가 없습니다.",
        
        // 도움말 모달
        helpTitle: "WASM Blocks 사용법",
        keyboardShortcuts: "키보드 단축키",
        blockTypes: "WebAssembly 블록 종류",
        wasmFeatures: "WebAssembly 특징",
        gettingStarted: "시작하기",
        
        // 툴박스 카테고리
        basicTypes: "기본 타입",
        arithmetic: "산술 연산", 
        comparison: "비교 연산",
        bitwise: "비트 연산",
        math: "수학 함수",
        typeConversion: "타입 변환",
        controlFlow: "제어문",
        functions: "함수",
        localVars: "로컬 변수",
        globalVars: "글로벌 변수", 
        memory: "메모리",
        tables: "테이블",
        dataSegments: "데이터/세그먼트",
        modules: "모듈",
        
        // 콘솔 메시지들
        exampleLoaded: "WebAssembly 기본 예제가 로드되었습니다.",
        exampleInfo: "10 + 5를 계산하는 main 함수입니다 (파라미터 없음).",
        runInstruction: "실행 버튼을 눌러 WebAssembly로 컴파일하고 실행해보세요!",
        simpleModule: "단순한 WebAssembly 모듈이 생성되었습니다.",
        dragBlocks: "좌측 툴박스에서 블록을 드래그하여 WebAssembly 코드를 만들어보세요!",
        exampleLoadFailed: "예제 로드에 실패했습니다. 수동으로 블록을 추가해주세요.",
        exportedFunctions: "export된 함수들:",
        mainResult: "main() 실행 결과:",
        executionResult: "",
        executionFailed: "[ERROR]",
        executionFailedMsg: "실행 실패:",
        parameterNeeded: "이 함수는 파라미터가 필요할 수 있습니다.",
        noExportedFunctions: "export된 함수를 찾을 수 없습니다.",
        error: "오류:",
        wabtReady: "상태: WABT 준비 완료"
    },
    en: {
        // Header
        title: "WASM Blocks", 
        subtitle: "WebAssembly Visual Programming Environment",
        langBtn: "English",
        runBtn: "Run",
        exportBtn: "Save",
        clearBtn: "Clear", 
        helpBtn: "Help",
        
        // Button tooltips
        runTooltip: "Run code (Ctrl+Enter)",
        exportTooltip: "Save project (Ctrl+S)",
        clearTooltip: "Clear workspace (Ctrl+N)",
        helpTooltip: "Show help",
        langTooltip: "언어 전환 / Switch Language",
        
        // Section titles
        blockEditor: "Block Editor",
        codePreview: "Generated WAT Code",
        consoleOutput: "Execution Results",
        
        // Console messages
        compileSuccess: "WAT → WASM compiled successfully!",
        compileError: "Compilation failed:",
        executionSuccess: "Execution successful! Result:",
        executionError: "💥 Runtime error:",
        noMainFunction: "Cannot find main function.",
        noExportedFunctions: "No exported functions found.",
        
        // Help modal
        helpTitle: "How to Use WASM Blocks",
        keyboardShortcuts: "Keyboard Shortcuts",
        blockTypes: "WebAssembly Block Types", 
        wasmFeatures: "WebAssembly Features",
        gettingStarted: "Getting Started",
        
        // Toolbox categories
        basicTypes: "Basic Types",
        arithmetic: "Arithmetic", 
        comparison: "Comparison",
        bitwise: "Bitwise",
        math: "Math Functions",
        typeConversion: "Type Conversion",
        controlFlow: "Control Flow",
        functions: "Functions",
        localVars: "Local Variables",
        globalVars: "Global Variables", 
        memory: "Memory",
        tables: "Tables",
        dataSegments: "Data/Segments",
        modules: "Modules",
        
        // Console messages
        exampleLoaded: "WebAssembly example loaded successfully.",
        exampleInfo: "Main function that calculates 10 + 5 (no parameters).",
        runInstruction: "Click Run button to compile to WebAssembly and execute!",
        simpleModule: "Simple WebAssembly module created.",
        dragBlocks: "Drag blocks from the left toolbox to create WebAssembly code!",
        exampleLoadFailed: "Failed to load example. Please add blocks manually.",
        exportedFunctions: "Exported functions:",
        mainResult: "main() execution result:",
        executionResult: "",
        executionFailed: "[ERROR]",
        executionFailedMsg: "execution failed:",
        parameterNeeded: "This function may require parameters.",
        noExportedFunctions: "No exported functions found.",
        error: "Error:",
        wabtReady: "Status: WABT ready"
    }
};

// 현재 언어의 텍스트 가져오기
function t(key) {
    return i18n[currentLanguage][key] || key;
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 시스템 초기화
    initializeLanguage(); // 저장된 언어 설정 복원
    initializeBlockly();
    setupEventListeners();
    loadWabt();
});

// Blockly 워크스페이스 초기화
function initializeBlockly() {
    const blocklyDiv = document.getElementById('blocklyDiv');
    const toolbox = document.getElementById('toolbox');
    
    workspace = Blockly.inject(blocklyDiv, {
        toolbox: toolbox,
        collapse: true,
        comments: true,
        disable: true,
        maxBlocks: Infinity,
        trashcan: true,
        horizontalLayout: false,
        toolboxPosition: 'start',
        css: true,
        media: 'https://unpkg.com/blockly/media/',
        rtl: false,
        scrollbars: true,
        sounds: true,
        oneBasedIndex: true,
        grid: {
            spacing: 20,
            length: 1,
            colour: '#888',
            snap: true
        },
        zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
        }
    });
    
    // 워크스페이스 변경 시 코드 업데이트
    workspace.addChangeListener(updateGeneratedCode);
    
    // 기본 예제 로드
    loadDefaultExample();
}

// 이벤트 리스너 설정
function setupEventListeners() {
    document.getElementById('runBtn').addEventListener('click', runCode);
    document.getElementById('exportBtn').addEventListener('click', exportCode);
    document.getElementById('clearBtn').addEventListener('click', clearWorkspace);
    document.getElementById('helpBtn').addEventListener('click', showHelp);
    document.getElementById('langBtn').addEventListener('click', toggleLanguage);
    
    // 키보드 단축키
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // 드래그 앤 드롭으로 프로젝트 파일 로드
    setupDragAndDrop();
    
    // 모달 닫기 이벤트
    setupModalEvents();
}

// 키보드 단축키 처리
function handleKeyboardShortcuts(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
            case 'Enter':
                event.preventDefault();
                runCode();
                break;
            case 's':
                event.preventDefault();
                exportCode();
                break;
            case 'n':
                event.preventDefault();
                clearWorkspace();
                break;
        }
    }
}

// 드래그 앤 드롭 설정
function setupDragAndDrop() {
    const dropZone = document.body;
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = 'rgba(103, 126, 234, 0.1)';
    });
    
    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = '';
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = '';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            loadProjectFile(files[0]);
        }
    });
}

// wabt.js 라이브러리 로드
async function loadWabt() {
    try {
        // CDN에서 wabt.js 로드
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/wabt@1.0.24/index.js';
        script.onload = async () => {
            wabtModule = await WabtModule();
            console.log('WABT 모듈이 로드되었습니다.');
            console.log('WABT ready'); // 실행 결과가 아닌 일반 로그
        };
        script.onerror = () => {
            console.error('WABT 모듈 로드에 실패했습니다.');
            updateStatus('WABT load failed - WAT code only displayed.');
        };
        document.head.appendChild(script);
    } catch (error) {
        console.error('WABT 로드 중 오류:', error);
        updateStatus('WABT load error');
    }
}

// 생성된 코드 업데이트
function updateGeneratedCode(forceUpdate = false) {
    try {
        if (!Blockly.WAT) {
            document.getElementById('generatedCode').textContent = '// Generator 로딩 중...';
            return;
        }
        
        if (!workspace) {
            document.getElementById('generatedCode').textContent = '// Workspace 초기화 중...';
            return;
        }
        
        const code = Blockly.WAT.workspaceToCode(workspace);
        
        // 중복 생성 방지: 같은 코드 연속 출력 방지 (언어 전환 시 강제 업데이트)
        const codeElement = document.getElementById('generatedCode');
        const currentCode = codeElement.textContent;
        
        if (forceUpdate || (code && code !== currentCode)) {
            codeElement.textContent = code || '// 블록을 추가하여 코드를 생성하세요';
        } else if (!code) {
            codeElement.textContent = '// 블록을 추가하여 코드를 생성하세요';
        }
        
        // syntax highlighting 임시 비활성화 (디버깅용)
        // highlightWatCode();
    } catch (error) {
        console.error('코드 생성 중 오류:', error);
        document.getElementById('generatedCode').textContent = '// 코드 생성 오류: ' + error.message;
    }
}

// WAT 코드 구문 강조 (간단한 버전)
function highlightWatCode() {
    const codeElement = document.getElementById('generatedCode');
    let code = codeElement.textContent;
    
    // WAT 키워드들 강조
    const keywords = [
        'module', 'func', 'param', 'result', 'local', 'export', 'import',
        'memory', 'table', 'global', 'type', 'start',
        'if', 'then', 'else', 'end', 'loop', 'block', 'br', 'br_if', 'br_table',
        'call', 'call_indirect', 'return',
        'i32', 'i64', 'f32', 'f64',
        'const', 'add', 'sub', 'mul', 'div', 'div_s', 'div_u',
        'load', 'store', 'get_local', 'set_local', 'tee_local',
        'get_global', 'set_global'
    ];
    
    // 키워드 강조는 CSS로 처리 (간단한 구현)
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        code = code.replace(regex, `<span class="keyword">${keyword}</span>`);
    });
    
    // 숫자 강조
    code = code.replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$&</span>');
    
    // 문자열 강조
    code = code.replace(/"[^"]*"/g, '<span class="string">$&</span>');
    
    // 주석 강조
    code = code.replace(/;;.*$/gm, '<span class="comment">$&</span>');
    
    codeElement.innerHTML = code;
}

// 코드 실행
async function runCode() {
    try {
        // 실행 시작 시 결과 영역 정리 (실행 결과만 깔끔하게 표시)
        clearConsole();
        
        updateStatus('Running code...');
        
        const watCode = Blockly.WAT.workspaceToCode(workspace);
        if (!watCode.trim()) {
            updateStatus('No code to execute.');
            return;
        }
        
        if (!wabtModule) {
            updateStatus('WABT module not loaded.');
            return;
        }
        
        // WAT를 WASM으로 컴파일
        let wasmModule;
        try {
            const wasmResult = wabtModule.parseWat('inline', watCode);
            const wasmBinary = wasmResult.toBinary({});
            wasmModule = await WebAssembly.compile(wasmBinary.buffer);
        } catch (compileError) {
            throw new Error('컴파일 오류: ' + compileError.message);
        }
        
        // 환경 객체 준비 (필요한 경우)
        const importObject = {
            env: {
                // 필요한 imported 함수들을 여기에 추가
                log: (value) => {
                    // console.log('WASM 출력:', value); // 디버깅용 로그 비활성화
                    addToConsole('Output: ' + value);
                }
            }
        };
        
        // WASM 모듈 인스턴스화 및 실행
        const wasmInstance = await WebAssembly.instantiate(wasmModule, importObject);
        
        // export된 함수들 찾아서 실행
        const exportedFunctions = Object.keys(wasmInstance.exports)
            .filter(key => typeof wasmInstance.exports[key] === 'function');
        
        if (exportedFunctions.length > 0) {
            addToConsole(`Exported functions: ${exportedFunctions.join(', ')}`);
            
            // main 함수가 있으면 우선 실행
            if (wasmInstance.exports.main) {
                const result = wasmInstance.exports.main();
                addToConsole(`main() execution result: ${result}`);
            } 
            // 아니면 첫 번째 함수 실행 (파라미터가 없는 경우)
            else {
                const firstFunc = exportedFunctions[0];
                try {
                    const result = wasmInstance.exports[firstFunc]();
                    addToConsole(`${firstFunc}() execution result: ${result}`);
                } catch (err) {
                    addToConsole(`[ERROR] ${firstFunc}() execution failed: ${err.message}`);
                    addToConsole('This function may require parameters.');
                }
            }
            updateStatus('Execution completed');
        } else {
            addToConsole('No exported functions found.');
            updateStatus('No executable functions');
        }
        
    } catch (error) {
        console.error('실행 오류:', error);
        addToConsole(`Error: ${error.message}`);
        updateStatus('Execution error');
    }
}

// 코드 내보내기
function exportCode() {
    const watCode = Blockly.WAT.workspaceToCode(workspace);
    const workspaceXml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.utils.xml.domToText(workspaceXml);
    
    if (!watCode.trim()) {
        alert('내보낼 코드가 없습니다.');
        return;
    }
    
    // 프로젝트 데이터 준비
    const projectData = {
        version: '1.0',
        created: new Date().toISOString(),
        workspace: xmlText,
        watCode: watCode
    };
    
    // 프로젝트 파일로 다운로드
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wasm-blocks-project.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    updateStatus('Project exported.');
}

// 프로젝트 파일 로드
async function loadProjectFile(file) {
    try {
        const text = await file.text();
        let projectData;
        
        // JSON 형태의 프로젝트 파일인지 확인
        try {
            projectData = JSON.parse(text);
        } catch {
            // XML 형태의 워크스페이스 파일일 수 있음
            if (text.includes('<xml')) {
                Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(text), workspace);
                updateStatus('Workspace file loaded.');
                return;
            } else {
                throw new Error('지원하지 않는 파일 형식입니다.');
            }
        }
        
        // 프로젝트 데이터가 있으면 로드
        if (projectData.workspace) {
            workspace.clear();
            Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(projectData.workspace), workspace);
            updateStatus('Project loaded.');
        }
        
    } catch (error) {
        console.error('파일 로드 오류:', error);
        alert('파일을 로드할 수 없습니다: ' + error.message);
    }
}

// 워크스페이스 초기화
function clearWorkspace() {
    if (confirm('모든 블록을 삭제하시겠습니까?')) {
        workspace.clear();
        clearConsole();
        
        // 코드 영역도 명시적으로 초기화 (고정 문제 방지)
        const codeElement = document.getElementById('generatedCode');
        if (codeElement) {
            codeElement.textContent = '// 블록을 추가하여 코드를 생성하세요';
        }
        
        updateStatus('Workspace initialized.');
    }
}

// 기본 예제 로드  
function loadDefaultExample() {
    // WebAssembly 기본 예제: 두 수를 더하는 함수
    const xml = `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="wasm_module" x="20" y="20">
            <statement name="CONTENT">
                <block type="wasm_function">
                    <field name="NAME">$main</field>
                    <field name="PARAMS"></field>
                    <field name="RESULT">i32</field>
                    <statement name="BODY">
                        <block type="wasm_return">
                            <value name="VALUE">
                                <block type="wasm_add">
                                    <value name="LEFT">
                                        <block type="wasm_i32">
                                            <field name="VALUE">10</field>
                                        </block>
                                    </value>
                                    <value name="RIGHT">
                                        <block type="wasm_i32">
                                            <field name="VALUE">5</field>
                                        </block>
                                    </value>
                                </block>
                            </value>
                        </block>
                    </statement>
                    <next>
                        <block type="wasm_export">
                            <field name="NAME">"main"</field>
                            <field name="FUNCTION">$main</field>
                        </block>
                    </next>
                </block>
            </statement>
        </block>
    </xml>`;
    
    try {
        // 🔥 중복 방지: 기존 블록 확인
        if (workspace.getAllBlocks().length > 0) {
            // console.log('워크스페이스에 이미 블록이 있어 기본 예제를 건너뜁니다.'); // verbose 로그 비활성화
            return;
        }
        
        const dom = Blockly.utils.xml.textToDom(xml);
        Blockly.Xml.domToWorkspace(dom, workspace);
        // addToConsole('WebAssembly example loaded successfully.'); // 안내 메시지는 실행 결과가 아님
        // addToConsole('Main function that calculates 10 + 5 (no parameters).'); // 안내 메시지는 실행 결과가 아님
        // addToConsole('Click Run button to compile to WebAssembly and execute!'); // 안내 메시지는 실행 결과가 아님
    } catch (error) {
        console.error('기본 예제 로드 오류:', error);
        // 오류 발생 시 더 단순한 예제 시도
        loadSimpleExample();
    }
}

// 더 단순한 예제 (오류 발생 시 백업용)
function loadSimpleExample() {
    try {
        // 🔥 중복 방지: 기존 블록 확인 후 선택적 초기화
        if (workspace.getAllBlocks().length > 0) {
            // console.log('워크스페이스에 이미 블록이 있어 단순 예제를 건너뜁니다.'); // verbose 로그 비활성화
            return;
        }
        
        // 모듈 블록 생성
        const moduleBlock = workspace.newBlock('wasm_module');
        moduleBlock.moveBy(20, 20);
        moduleBlock.initSvg();
        moduleBlock.render();
        
        // addToConsole('Simple WebAssembly module created.'); // 안내 메시지는 실행 결과가 아님
        // addToConsole('Drag blocks from the left toolbox to create WebAssembly code!'); // 안내 메시지는 실행 결과가 아님
        
    } catch (error) {
        console.error('단순 예제 로드 오류:', error);
        // addToConsole('Failed to load example. Please add blocks manually.'); // 안내 메시지는 실행 결과가 아님
    }
}

// 콘솔에 메시지 추가
function addToConsole(message) {
    const console = document.getElementById('outputConsole');
    const timestamp = new Date().toLocaleTimeString();
    console.innerHTML += `<div class="console-line">[${timestamp}] ${message}</div>`;
    console.scrollTop = console.scrollHeight;
}

// 콘솔 초기화
function clearConsole() {
    document.getElementById('outputConsole').innerHTML = '';
}

// 상태 업데이트 (실행 결과 영역에 표시하지 않음)
function updateStatus(message) {
    // 상태 메시지는 실행 결과에 표시하지 않고 콘솔에만 로그
    console.log('Status:', message);
}

// 도움말 모달 표시
function showHelp() {
    document.getElementById('helpModal').style.display = 'block';
}

// 도움말 모달 숨기기
function hideHelp() {
    document.getElementById('helpModal').style.display = 'none';
}

// 모달 이벤트 설정
function setupModalEvents() {
    const modal = document.getElementById('helpModal');
    const closeBtn = modal.querySelector('.close');
    
    // X 버튼 클릭 시 모달 닫기
    closeBtn.addEventListener('click', hideHelp);
    
    // 모달 외부 클릭 시 모달 닫기
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideHelp();
        }
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            hideHelp();
        }
    });
}

// 언어 전환 시스템
function toggleLanguage() {
    try {
        currentLanguage = currentLanguage === 'ko' ? 'en' : 'ko';
        
        // 언어 전환 시에는 실행 결과를 정리하지 않음 (실행과 무관)
        // const console = document.getElementById('outputConsole');
        // if (console) {
        //     console.innerHTML = '';
        // }
        
        // WAT 코드 영역도 초기화 (고정 문제 해결)
        const codeElement = document.getElementById('generatedCode');
        if (codeElement) {
            codeElement.textContent = '// 블록을 추가하여 코드를 생성하세요';
        }
        
        // UI 먼저 업데이트 (즉시 반영)
        updateUI();
        
        // Blockly 메시지 언어 변경
        loadBlocklyMessages();
        
        // 코드 영역과 콘솔 강제 업데이트 (고정 문제 해결)
        setTimeout(() => {
            updateGeneratedCode(true); // forceUpdate = true
        }, 200);
        
        // 로컬 스토리지에 언어 설정 저장
        localStorage.setItem('wasmblocks_language', currentLanguage);
        
        const langName = currentLanguage === 'ko' ? 'Korean' : 'English';
        console.log(`Language changed to ${langName}`); // 실행 결과가 아닌 일반 로그
        
    } catch (error) {
        console.error('언어 전환 중 오류:', error);
        console.error('Error occurred during language switching.'); // 실행 결과가 아닌 에러 로그
    }
}

// Blockly 메시지 언어 동적 로드 (중복 방지 버전)
function loadBlocklyMessages() {
    if (!workspace) {
        console.error('Workspace가 초기화되지 않았습니다.');
        return;
    }
    
    try {
    
    // 🔥 중복 방지: 기존 블록들을 XML로 백업
    const workspaceXml = Blockly.Xml.workspaceToDom(workspace);
    const hasBlocks = workspaceXml.children.length > 0;
    
    // 영어는 기본이므로 스크립트 로드 불필요
    if (currentLanguage === 'en') {
        // 워크스페이스 완전 초기화
        workspace.dispose();
        updateToolboxLanguage();
        initializeBlockly();
        
        // 블록이 있었다면 복원 (중복 없이)
        if (hasBlocks) {
            workspace.clear(); // 혹시 모를 중복 제거
            Blockly.Xml.domToWorkspace(workspaceXml, workspace);
        } else {
            // 기본 예제만 로드
            loadDefaultExample();
        }
        
        // 코드 영역 강제 업데이트 (고정 문제 해결)
        setTimeout(() => {
            updateGeneratedCode(true); // forceUpdate = true
        }, 100);
        
        return;
    }
    
    const script = document.createElement('script');
    script.src = `https://unpkg.com/blockly/msg/${currentLanguage}.js`;
    script.onload = () => {
        // 워크스페이스 완전 초기화
        workspace.dispose();
        updateToolboxLanguage();
        initializeBlockly();
        
        // 블록이 있었다면 복원 (중복 없이)
        if (hasBlocks) {
            workspace.clear(); // 혹시 모를 중복 제거
            Blockly.Xml.domToWorkspace(workspaceXml, workspace);
        } else {
            // 기본 예제만 로드
            loadDefaultExample();
        }
        
        // 코드 영역 강제 업데이트 (고정 문제 해결)
        setTimeout(() => {
            updateGeneratedCode(true); // forceUpdate = true
        }, 100);
    };
    
    // 기존 언어 스크립트 제거
    const existingScript = document.querySelector('script[src*="/msg/"]');
    if (existingScript) {
        existingScript.remove();
    }
    
    document.head.appendChild(script);
    
    } catch (error) {
        console.error('Blockly 메시지 로드 중 오류:', error);
        console.error('Error occurred during language switching.'); // 실행 결과가 아닌 에러 로그
    }
}

// 툴박스 언어 업데이트 (완전 개선 버전)
function updateToolboxLanguage() {
    const toolbox = document.getElementById('toolbox');
    if (!toolbox) return;
    
    // 정확한 카테고리 이름 매핑
    const categoryMap = [
        { korean: "기본 타입", english: "Basic Types", key: 'basicTypes' },
        { korean: "산술 연산", english: "Arithmetic", key: 'arithmetic' },
        { korean: "비교 연산", english: "Comparison", key: 'comparison' },
        { korean: "비트 연산", english: "Bitwise", key: 'bitwise' },
        { korean: "수학 함수", english: "Math Functions", key: 'math' },
        { korean: "타입 변환", english: "Type Conversion", key: 'typeConversion' },
        { korean: "제어문", english: "Control Flow", key: 'controlFlow' },
        { korean: "함수", english: "Functions", key: 'functions' },
        { korean: "로컬 변수", english: "Local Variables", key: 'localVars' },
        { korean: "글로벌 변수", english: "Global Variables", key: 'globalVars' },
        { korean: "메모리", english: "Memory", key: 'memory' },
        { korean: "테이블", english: "Tables", key: 'tables' },
        { korean: "데이터/세그먼트", english: "Data/Segments", key: 'dataSegments' },
        { korean: "모듈", english: "Modules", key: 'modules' }
    ];
    
    // 모든 카테고리 찾아서 업데이트
    const categories = toolbox.querySelectorAll('category');
    categories.forEach(category => {
        const currentName = category.getAttribute('name');
        
        // 매핑에서 찾기
        const mapping = categoryMap.find(map => 
            currentName === map.korean || currentName === map.english ||
            currentName.includes(map.key) // 키 기반 fallback
        );
        
        if (mapping) {
            const newName = currentLanguage === 'ko' ? mapping.korean : mapping.english;
            category.setAttribute('name', newName);
        }
    });
}

// UI 텍스트 업데이트 (완전 강화 버전)
function updateUI() {
    try {
    // 🎯 헤더 업데이트
    const headerH1 = document.querySelector('.header h1');
    const headerP = document.querySelector('.header p');
    if (headerH1) headerH1.textContent = t('title');
    if (headerP) headerP.textContent = t('subtitle');
    
    // 🎯 버튼 텍스트 및 툴팁 업데이트
    const buttons = [
        { id: 'langBtn', textKey: 'langBtn', tooltipKey: 'langTooltip' },
        { id: 'runBtn', textKey: 'runBtn', tooltipKey: 'runTooltip' },
        { id: 'exportBtn', textKey: 'exportBtn', tooltipKey: 'exportTooltip' },
        { id: 'clearBtn', textKey: 'clearBtn', tooltipKey: 'clearTooltip' },
        { id: 'helpBtn', textKey: 'helpBtn', tooltipKey: 'helpTooltip' }
    ];
    
    buttons.forEach(({ id, textKey, tooltipKey }) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.textContent = t(textKey);
            btn.title = t(tooltipKey);
        }
    });
    
    // 🎯 섹션 제목 업데이트 (더 정확하게)
    // 블록 편집기 제목 업데이트
    const blockEditorTitle = document.getElementById('blockEditorTitle');
    if (blockEditorTitle) {
        blockEditorTitle.textContent = t('blockEditor');
    }
    
    const allH3 = document.querySelectorAll('h3');
    allH3.forEach(h3 => {
        const text = h3.textContent.toLowerCase();
        if (text.includes('wat') || text.includes('코드') || text.includes('generated')) {
            h3.textContent = t('codePreview');
        } else if (text.includes('실행') || text.includes('결과') || text.includes('execution')) {
            h3.textContent = t('consoleOutput');
        }
    });
    
    // 🎯 HTML lang 속성 업데이트
    document.documentElement.lang = currentLanguage;
    
    // 🎯 툴박스 업데이트 (강제 실행)
    setTimeout(() => {
        updateToolboxLanguage();
    }, 100);
    
    // 로그 비활성화
    // console.log(`UI updated to ${currentLanguage} language`);
    
    } catch (error) {
        console.error('UI 업데이트 중 오류:', error);
    }
}

// 페이지 로드 시 저장된 언어 설정 복원
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('wasmblocks_language');
    if (savedLanguage && ['ko', 'en'].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
    }
    // 언어 설정에 맞게 UI 초기화
    updateUI();
}

// 창 크기 변경 시 Blockly 크기 조정
window.addEventListener('resize', function() {
    if (workspace) {
        Blockly.svgResize(workspace);
    }
});
