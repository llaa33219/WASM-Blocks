// WebAssembly 전용 커스텀 블록 정의

// 기본 타입 블록들
Blockly.Blocks['wasm_i32'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("i32")
        .appendField(new Blockly.FieldNumber(0, -2147483648, 2147483647), "VALUE");
    this.setOutput(true, "i32");
    this.setColour("#5C6BC0");
    this.setTooltip("32비트 정수");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_i64'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("i64")
        .appendField(new Blockly.FieldNumber(0), "VALUE");
    this.setOutput(true, "i64");
    this.setColour("#5C6BC0");
    this.setTooltip("64비트 정수");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_f32'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("f32")
        .appendField(new Blockly.FieldNumber(0.0), "VALUE");
    this.setOutput(true, "f32");
    this.setColour("#5C6BC0");
    this.setTooltip("32비트 부동소수점");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_f64'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("f64")
        .appendField(new Blockly.FieldNumber(0.0), "VALUE");
    this.setOutput(true, "f64");
    this.setColour("#5C6BC0");
    this.setTooltip("64비트 부동소수점");
    this.setHelpUrl("");
  }
};

// 산술 연산 블록들
Blockly.Blocks['wasm_add'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.appendDummyInput()
        .appendField("add");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64", "f32", "f64"]);
    this.setColour("#FF7043");
    this.setTooltip("두 값을 더합니다");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_sub'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.appendDummyInput()
        .appendField("sub");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64", "f32", "f64"]);
    this.setColour("#FF7043");
    this.setTooltip("첫 번째 값에서 두 번째 값을 뺍니다");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_mul'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.appendDummyInput()
        .appendField("mul");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64", "f32", "f64"]);
    this.setColour("#FF7043");
    this.setTooltip("두 값을 곱합니다");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_div'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.appendDummyInput()
        .appendField("div");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64", "f32", "f64"]);
    this.setColour("#FF7043");
    this.setTooltip("첫 번째 값을 두 번째 값으로 나눕니다");
    this.setHelpUrl("");
  }
};

// 제어문 블록들
Blockly.Blocks['wasm_if'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck(["i32"])
        .appendField("if");
    this.appendStatementInput("THEN")
        .appendField("then");
    this.appendStatementInput("ELSE")
        .appendField("else");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#66BB6A");
    this.setTooltip("조건부 실행");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_loop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("loop")
        .appendField(new Blockly.FieldTextInput("$label"), "LABEL");
    this.appendStatementInput("BODY")
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#66BB6A");
    this.setTooltip("반복문");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("block")
        .appendField(new Blockly.FieldTextInput("$label"), "LABEL");
    this.appendStatementInput("BODY")
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#66BB6A");
    this.setTooltip("블록 스코프");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_br'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("br")
        .appendField(new Blockly.FieldTextInput("$label"), "LABEL");
    this.setPreviousStatement(true, null);
    this.setColour("#66BB6A");
    this.setTooltip("분기 (break)");
    this.setHelpUrl("");
  }
};

// 함수 블록들
Blockly.Blocks['wasm_function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("func")
        .appendField(new Blockly.FieldTextInput("$main"), "NAME");
    this.appendDummyInput()
        .appendField("params:")
        .appendField(new Blockly.FieldTextInput(""), "PARAMS");
    this.appendDummyInput()
        .appendField("result:")
        .appendField(new Blockly.FieldDropdown([
          ["none", "none"],
          ["i32", "i32"],
          ["i64", "i64"],
          ["f32", "f32"],
          ["f64", "f64"]
        ]), "RESULT");
    this.appendStatementInput("BODY")
        .appendField("body");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFA726");
    this.setTooltip("함수 정의");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_call'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("call")
        .appendField(new Blockly.FieldTextInput("$func"), "FUNCTION");
    this.appendValueInput("ARGS")
        .setCheck(null)
        .appendField("args:");
    this.setOutput(true, null);
    this.setColour("#FFA726");
    this.setTooltip("함수 호출");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_return'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField("return");
    this.setPreviousStatement(true, null);
    this.setColour("#FFA726");
    this.setTooltip("함수에서 값 반환");
    this.setHelpUrl("");
  }
};

// 메모리 블록들
Blockly.Blocks['wasm_memory'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("memory")
        .appendField(new Blockly.FieldNumber(1, 0, 65535), "PAGES");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#673AB7");
    this.setTooltip("메모리 선언 (페이지 단위)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_load'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("load");
    this.appendDummyInput()
        .appendField("type:")
        .appendField(new Blockly.FieldDropdown([
          ["i32", "i32"],
          ["i64", "i64"],
          ["f32", "f32"],
          ["f64", "f64"]
        ]), "TYPE");
    this.setOutput(true, null);
    this.setColour("#673AB7");
    this.setTooltip("메모리에서 값 로드");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_store'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("store at");
    this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField("value:");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#673AB7");
    this.setTooltip("메모리에 값 저장");
    this.setHelpUrl("");
  }
};

// 🔥 고급 메모리 블록들 대량 추가
Blockly.Blocks['wasm_load8_s'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i32.load8_s");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setOutput(true, "i32");
    this.setColour("#673AB7");
    this.setTooltip("8비트 메모리를 i32로 로드 (부호 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_load8_u'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i32.load8_u");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setOutput(true, "i32");
    this.setColour("#673AB7");
    this.setTooltip("8비트 메모리를 i32로 로드 (0 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_load16_s'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i32.load16_s");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setOutput(true, "i32");
    this.setColour("#673AB7");
    this.setTooltip("16비트 메모리를 i32로 로드 (부호 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_load16_u'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i32.load16_u");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setOutput(true, "i32");
    this.setColour("#673AB7");
    this.setTooltip("16비트 메모리를 i32로 로드 (0 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_store8'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i32.store8");
    this.appendValueInput("VALUE")
        .setCheck(["i32"])
        .appendField("value");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#673AB7");
    this.setTooltip("i32의 하위 8비트를 메모리에 저장");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_store16'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i32.store16");
    this.appendValueInput("VALUE")
        .setCheck(["i32"])
        .appendField("value");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#673AB7");
    this.setTooltip("i32의 하위 16비트를 메모리에 저장");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_memory_size'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("memory.size");
    this.setOutput(true, "i32");
    this.setColour("#673AB7");
    this.setTooltip("현재 메모리 크기 (페이지 단위)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_memory_grow'] = {
  init: function() {
    this.appendValueInput("PAGES")
        .setCheck(["i32"])
        .appendField("memory.grow");
    this.setOutput(true, "i32");
    this.setColour("#673AB7");
    this.setTooltip("메모리를 지정한 페이지만큼 확장 (이전 크기 반환)");
    this.setHelpUrl("");
  }
};

// 🔥 테이블 블록들 대량 추가 (함수 포인터 시스템)
Blockly.Blocks['wasm_table'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("table")
        .appendField(new Blockly.FieldTextInput("10"), "SIZE")
        .appendField("funcref");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF7043");
    this.setTooltip("함수 레퍼런스 테이블 선언");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_table_get'] = {
  init: function() {
    this.appendValueInput("INDEX")
        .setCheck(["i32"])
        .appendField("table.get");
    this.setOutput(true, "funcref");
    this.setColour("#FF7043");
    this.setTooltip("테이블에서 함수 레퍼런스 가져오기");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_table_set'] = {
  init: function() {
    this.appendValueInput("INDEX")
        .setCheck(["i32"])
        .appendField("table.set");
    this.appendValueInput("VALUE")
        .setCheck(["funcref"])
        .appendField("value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF7043");
    this.setTooltip("테이블에 함수 레퍼런스 저장");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_call_indirect'] = {
  init: function() {
    this.appendValueInput("INDEX")
        .setCheck(["i32"])
        .appendField("call_indirect");
    this.appendDummyInput()
        .appendField("type:")
        .appendField(new Blockly.FieldTextInput("(param i32) (result i32)"), "TYPE");
    this.setOutput(true, ["i32", "i64", "f32", "f64"]);
    this.setColour("#FF7043");
    this.setTooltip("테이블 인덱스로 간접 함수 호출 (함수 포인터)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_table_size'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("table.size");
    this.setOutput(true, "i32");
    this.setColour("#FF7043");
    this.setTooltip("현재 테이블 크기");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_table_grow'] = {
  init: function() {
    this.appendValueInput("SIZE")
        .setCheck(["i32"])
        .appendField("table.grow");
    this.appendValueInput("INIT")
        .setCheck(["funcref"])
        .appendField("init");
    this.setOutput(true, "i32");
    this.setColour("#FF7043");
    this.setTooltip("테이블을 확장하고 초기값으로 채움");
    this.setHelpUrl("");
  }
};

// 🔥 i64 메모리 연산들 추가
Blockly.Blocks['wasm_i64_load32_s'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i64.load32_s");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setOutput(true, "i64");
    this.setColour("#673AB7");
    this.setTooltip("32비트 메모리를 i64로 로드 (부호 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_i64_load32_u'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i64.load32_u");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setOutput(true, "i64");
    this.setColour("#673AB7");
    this.setTooltip("32비트 메모리를 i64로 로드 (0 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_i64_load8_s'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i64.load8_s");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setOutput(true, "i64");
    this.setColour("#673AB7");
    this.setTooltip("8비트 메모리를 i64로 로드 (부호 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_i64_load8_u'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i64.load8_u");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setOutput(true, "i64");
    this.setColour("#673AB7");
    this.setTooltip("8비트 메모리를 i64로 로드 (0 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_i64_load16_s'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i64.load16_s");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setOutput(true, "i64");
    this.setColour("#673AB7");
    this.setTooltip("16비트 메모리를 i64로 로드 (부호 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_i64_load16_u'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i64.load16_u");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setOutput(true, "i64");
    this.setColour("#673AB7");
    this.setTooltip("16비트 메모리를 i64로 로드 (0 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_i64_store32'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i64.store32");
    this.appendValueInput("VALUE")
        .setCheck(["i64"])
        .appendField("value");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#673AB7");
    this.setTooltip("i64의 하위 32비트를 메모리에 저장");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_i64_store8'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i64.store8");
    this.appendValueInput("VALUE")
        .setCheck(["i64"])
        .appendField("value");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#673AB7");
    this.setTooltip("i64의 하위 8비트를 메모리에 저장");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_i64_store16'] = {
  init: function() {
    this.appendValueInput("ADDRESS")
        .setCheck(["i32"])
        .appendField("i64.store16");
    this.appendValueInput("VALUE")
        .setCheck(["i64"])
        .appendField("value");
    this.appendDummyInput()
        .appendField("offset:")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#673AB7");
    this.setTooltip("i64의 하위 16비트를 메모리에 저장");
    this.setHelpUrl("");
  }
};

// 🔥 데이터 세그먼트 블록들 추가
Blockly.Blocks['wasm_data'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("data")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.appendDummyInput()
        .appendField("data:")
        .appendField(new Blockly.FieldTextInput('"Hello World"'), "DATA");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#78909C");
    this.setTooltip("메모리 초기화 데이터 세그먼트");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_data_drop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("data.drop")
        .appendField(new Blockly.FieldNumber(0, 0), "INDEX");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#78909C");
    this.setTooltip("데이터 세그먼트를 메모리에서 제거");
    this.setHelpUrl("");
  }
};

// 🔥 엘리먼트 세그먼트 블록들 추가
Blockly.Blocks['wasm_elem'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("elem")
        .appendField(new Blockly.FieldNumber(0, 0), "OFFSET");
    this.appendDummyInput()
        .appendField("funcs:")
        .appendField(new Blockly.FieldTextInput("$func1 $func2"), "FUNCS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#78909C");
    this.setTooltip("테이블 초기화 엘리먼트 세그먼트");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_elem_drop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("elem.drop")
        .appendField(new Blockly.FieldNumber(0, 0), "INDEX");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#78909C");
    this.setTooltip("엘리먼트 세그먼트를 제거");
    this.setHelpUrl("");
  }
};

// 🔥 start 함수 블록 추가
Blockly.Blocks['wasm_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("start")
        .appendField(new Blockly.FieldTextInput("$main"), "FUNCTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFA726");
    this.setTooltip("모듈 로드 시 자동 실행할 함수 지정");
    this.setHelpUrl("");
  }
};

// 🔥 타입 정의 블록 추가
Blockly.Blocks['wasm_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("type")
        .appendField(new Blockly.FieldTextInput("$sig"), "NAME");
    this.appendDummyInput()
        .appendField("signature:")
        .appendField(new Blockly.FieldTextInput("(func (param i32) (result i32))"), "SIG");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFA726");
    this.setTooltip("함수 타입 시그니처 정의");
    this.setHelpUrl("");
  }
};

// 🔥 funcref 블록 (함수 레퍼런스)
Blockly.Blocks['wasm_funcref'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ref.func")
        .appendField(new Blockly.FieldTextInput("$func"), "FUNCTION");
    this.setOutput(true, "funcref");
    this.setColour("#FF7043");
    this.setTooltip("함수의 레퍼런스 생성");
    this.setHelpUrl("");
  }
};

// 🔥 ref.null 블록
Blockly.Blocks['wasm_ref_null'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ref.null")
        .appendField(new Blockly.FieldDropdown([
          ["funcref", "funcref"],
          ["externref", "externref"]
        ]), "TYPE");
    this.setOutput(true, ["funcref", "externref"]);
    this.setColour("#FF7043");
    this.setTooltip("null 레퍼런스 생성");
    this.setHelpUrl("");
  }
};

// 🔥 진짜 기본적인 명령어들 추가! (이게 왜 없었지??)

// drop - 스택에서 값 제거 (매우 기본적!)
Blockly.Blocks['wasm_drop'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["i32", "i64", "f32", "f64"])
        .appendField("drop");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#66BB6A");
    this.setTooltip("스택에서 값을 제거");
    this.setHelpUrl("");
  }
};

// eqz - 0과 비교 (0이면 1, 아니면 0)
Blockly.Blocks['wasm_i32_eqz'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["i32"])
        .appendField("i32.eqz");
    this.setOutput(true, "i32");
    this.setColour("#9C27B0");
    this.setTooltip("값이 0인지 확인 (0이면 1, 아니면 0)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_i64_eqz'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["i64"])
        .appendField("i64.eqz");
    this.setOutput(true, "i32");
    this.setColour("#9C27B0");
    this.setTooltip("i64 값이 0인지 확인 (0이면 1, 아니면 0)");
    this.setHelpUrl("");
  }
};

// 부호 구분 나눗셈 (현재 일반 div만 있었음)
Blockly.Blocks['wasm_div_s'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("div_s")
        .appendField(new Blockly.FieldDropdown([
          ["i32", "i32"],
          ["i64", "i64"]
        ]), "TYPE");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#FF7043");
    this.setTooltip("부호 있는 나눗셈");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_div_u'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("div_u")
        .appendField(new Blockly.FieldDropdown([
          ["i32", "i32"],
          ["i64", "i64"]
        ]), "TYPE");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#FF7043");
    this.setTooltip("부호 없는 나눗셈");
    this.setHelpUrl("");
  }
};

// 나머지 연산 (완전 기본인데 없었음!)
Blockly.Blocks['wasm_rem_s'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("rem_s")
        .appendField(new Blockly.FieldDropdown([
          ["i32", "i32"],
          ["i64", "i64"]
        ]), "TYPE");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#FF7043");
    this.setTooltip("부호 있는 나머지 연산");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_rem_u'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("rem_u")
        .appendField(new Blockly.FieldDropdown([
          ["i32", "i32"],
          ["i64", "i64"]
        ]), "TYPE");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#FF7043");
    this.setTooltip("부호 없는 나머지 연산");
    this.setHelpUrl("");
  }
};

// 비트 카운트 연산들 (기본적인데 왜 없었지??)
Blockly.Blocks['wasm_clz'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("clz")
        .appendField(new Blockly.FieldDropdown([
          ["i32", "i32"],
          ["i64", "i64"]
        ]), "TYPE");
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#FF7043");
    this.setTooltip("선행 0 비트 개수 (count leading zeros)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_ctz'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("ctz")
        .appendField(new Blockly.FieldDropdown([
          ["i32", "i32"],
          ["i64", "i64"]
        ]), "TYPE");
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#FF7043");
    this.setTooltip("후행 0 비트 개수 (count trailing zeros)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_popcnt'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("popcnt")
        .appendField(new Blockly.FieldDropdown([
          ["i32", "i32"],
          ["i64", "i64"]
        ]), "TYPE");
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#FF7043");
    this.setTooltip("1 비트 개수 (population count)");
    this.setHelpUrl("");
  }
};

// reinterpret 명령어들 (비트 재해석 - 매우 중요!)
Blockly.Blocks['wasm_reinterpret_i32'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["f32"])
        .appendField("i32.reinterpret_f32");
    this.setOutput(true, "i32");
    this.setColour("#9C27B0");
    this.setTooltip("f32 비트를 i32로 재해석");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_reinterpret_i64'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["f64"])
        .appendField("i64.reinterpret_f64");
    this.setOutput(true, "i64");
    this.setColour("#9C27B0");
    this.setTooltip("f64 비트를 i64로 재해석");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_reinterpret_f32'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["i32"])
        .appendField("f32.reinterpret_i32");
    this.setOutput(true, "f32");
    this.setColour("#9C27B0");
    this.setTooltip("i32 비트를 f32로 재해석");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_reinterpret_f64'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["i64"])
        .appendField("f64.reinterpret_i64");
    this.setOutput(true, "f64");
    this.setColour("#9C27B0");
    this.setTooltip("i64 비트를 f64로 재해석");
    this.setHelpUrl("");
  }
};

// 모듈 블록들
Blockly.Blocks['wasm_module'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("module");
    this.appendStatementInput("CONTENT")
        .appendField("content");
    this.setColour("#26C6DA");
    this.setTooltip("WebAssembly 모듈");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_export'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("export")
        .appendField(new Blockly.FieldTextInput("\"main\""), "NAME")
        .appendField("func")
        .appendField(new Blockly.FieldTextInput("$main"), "FUNCTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#26C6DA");
    this.setTooltip("함수 내보내기");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("import")
        .appendField(new Blockly.FieldTextInput("\"env\""), "MODULE")
        .appendField(new Blockly.FieldTextInput("\"func\""), "NAME")
        .appendField("func")
        .appendField(new Blockly.FieldTextInput("$imported"), "FUNCTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#26C6DA");
    this.setTooltip("함수 가져오기");
    this.setHelpUrl("");
  }
};

// WebAssembly 로컬 변수 블록들
Blockly.Blocks['wasm_local_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("local.get")
        .appendField(new Blockly.FieldTextInput("$var"), "VARIABLE");
    this.setOutput(true, ["i32", "i64", "f32", "f64"]);
    this.setColour("#4CAF50");
    this.setTooltip("로컬 변수 값 가져오기");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_local_set'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["i32", "i64", "f32", "f64"])
        .appendField("local.set")
        .appendField(new Blockly.FieldTextInput("$var"), "VARIABLE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4CAF50");
    this.setTooltip("로컬 변수에 값 저장");
    this.setHelpUrl("");
  }
};

// 🔥 매우 중요한 local.tee 블록 (값 저장 후 반환)
Blockly.Blocks['wasm_local_tee'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["i32", "i64", "f32", "f64"])
        .appendField("local.tee")
        .appendField(new Blockly.FieldTextInput("$var"), "VARIABLE");
    this.setOutput(true, ["i32", "i64", "f32", "f64"]);
    this.setColour("#4CAF50");
    this.setTooltip("로컬 변수에 값 저장 후 그 값을 반환 (스택에 남김)");
    this.setHelpUrl("");
  }
};

// 함수 내 로컬 변수 선언 블록
Blockly.Blocks['wasm_local_declare'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("local")
        .appendField(new Blockly.FieldTextInput("$var"), "NAME")
        .appendField(new Blockly.FieldDropdown([
          ["i32", "i32"],
          ["i64", "i64"],
          ["f32", "f32"],
          ["f64", "f64"]
        ]), "TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#673AB7");
    this.setTooltip("함수 내에서 새 로컬 변수 선언");
    this.setHelpUrl("");
  }
};

// 파라미터 전용 get (더 명확한 구분)
Blockly.Blocks['wasm_param_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("param.get")
        .appendField(new Blockly.FieldTextInput("$a"), "PARAM");
    this.setOutput(true, ["i32", "i64", "f32", "f64"]);
    this.setColour("#4CAF50");
    this.setTooltip("함수 파라미터 값 가져오기");
    this.setHelpUrl("");
  }
};

// 로컬 변수 초기화 (타입별)
Blockly.Blocks['wasm_local_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("init local")
        .appendField(new Blockly.FieldTextInput("$var"), "NAME")
        .appendField("as")
        .appendField(new Blockly.FieldDropdown([
          ["i32 (0)", "i32"],
          ["i64 (0)", "i64"], 
          ["f32 (0.0)", "f32"],
          ["f64 (0.0)", "f64"]
        ]), "TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#673AB7");
    this.setTooltip("로컬 변수를 기본값으로 초기화");
    this.setHelpUrl("");
  }
};

// WebAssembly 글로벌 변수 블록들
Blockly.Blocks['wasm_global'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("global")
        .appendField(new Blockly.FieldTextInput("$g"), "NAME")
        .appendField(new Blockly.FieldDropdown([
          ["(mut i32)", "(mut i32)"],
          ["(mut i64)", "(mut i64)"],
          ["(mut f32)", "(mut f32)"],
          ["(mut f64)", "(mut f64)"],
          ["i32", "i32"],
          ["i64", "i64"],
          ["f32", "f32"],
          ["f64", "f64"]
        ]), "TYPE");
    this.appendValueInput("INIT")
        .setCheck(["i32", "i64", "f32", "f64"])
        .appendField("init:");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#2196F3");
    this.setTooltip("글로벌 변수 선언");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_global_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("global.get")
        .appendField(new Blockly.FieldTextInput("$g"), "VARIABLE");
    this.setOutput(true, ["i32", "i64", "f32", "f64"]);
    this.setColour("#2196F3");
    this.setTooltip("글로벌 변수 값 가져오기");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_global_set'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["i32", "i64", "f32", "f64"])
        .appendField("global.set")
        .appendField(new Blockly.FieldTextInput("$g"), "VARIABLE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#2196F3");
    this.setTooltip("글로벌 변수에 값 저장");
    this.setHelpUrl("");
  }
};

// WebAssembly 비교 연산 블록들  
Blockly.Blocks['wasm_eq'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.appendDummyInput()
        .appendField("eq");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, "i32");
    this.setColour("#9C27B0");
    this.setTooltip("같음 비교 (결과: i32)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_lt'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.appendDummyInput()
        .appendField("lt");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, "i32");
    this.setColour("#9C27B0");
    this.setTooltip("작음 비교 (결과: i32)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_gt'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.appendDummyInput()
        .appendField("gt");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, "i32");
    this.setColour("#9C27B0");
    this.setTooltip("큼 비교 (결과: i32)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_le'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.appendDummyInput()
        .appendField("le");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, "i32");
    this.setColour("#9C27B0");
    this.setTooltip("작거나 같음 비교 (결과: i32)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_ge'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.appendDummyInput()
        .appendField("ge");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, "i32");
    this.setColour("#9C27B0");
    this.setTooltip("크거나 같음 비교 (결과: i32)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_ne'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.appendDummyInput()
        .appendField("ne");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, "i32");
    this.setColour("#9C27B0");
    this.setTooltip("다름 비교 (결과: i32)");
    this.setHelpUrl("");
  }
};

// 비트 연산 블록들
Blockly.Blocks['wasm_and'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("and");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#455A64");
    this.setTooltip("비트 AND 연산");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_or'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("or");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#455A64");
    this.setTooltip("비트 OR 연산");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_xor'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("xor");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#455A64");
    this.setTooltip("비트 XOR 연산");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_shl'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("shl");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#455A64");
    this.setTooltip("비트 왼쪽 시프트");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_shr_s'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("shr_s");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#455A64");
    this.setTooltip("부호 있는 오른쪽 시프트");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_shr_u'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("shr_u");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#455A64");
    this.setTooltip("부호 없는 오른쪽 시프트");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_rotl'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("rotl");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#455A64");
    this.setTooltip("왼쪽 회전");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_rotr'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["i32", "i64"]);
    this.appendDummyInput()
        .appendField("rotr");
    this.appendValueInput("RIGHT")
        .setCheck(["i32", "i64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["i32", "i64"]);
    this.setColour("#455A64");
    this.setTooltip("오른쪽 회전");
    this.setHelpUrl("");
  }
};

// 수학 함수 블록들
Blockly.Blocks['wasm_min'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["f32", "f64"]);
    this.appendDummyInput()
        .appendField("min");
    this.appendValueInput("RIGHT")
        .setCheck(["f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["f32", "f64"]);
    this.setColour(270);
    this.setTooltip("최솟값 반환");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_max'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["f32", "f64"]);
    this.appendDummyInput()
        .appendField("max");
    this.appendValueInput("RIGHT")
        .setCheck(["f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["f32", "f64"]);
    this.setColour(270);
    this.setTooltip("최댓값 반환");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_abs'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["f32", "f64"])
        .appendField("abs");
    this.setOutput(true, ["f32", "f64"]);
    this.setColour(270);
    this.setTooltip("절댓값");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_sqrt'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["f32", "f64"])
        .appendField("sqrt");
    this.setOutput(true, ["f32", "f64"]);
    this.setColour(270);
    this.setTooltip("제곱근");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_ceil'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["f32", "f64"])
        .appendField("ceil");
    this.setOutput(true, ["f32", "f64"]);
    this.setColour(270);
    this.setTooltip("올림");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_floor'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["f32", "f64"])
        .appendField("floor");
    this.setOutput(true, ["f32", "f64"]);
    this.setColour(270);
    this.setTooltip("내림");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_trunc'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["f32", "f64"])
        .appendField("trunc");
    this.setOutput(true, ["f32", "f64"]);
    this.setColour(270);
    this.setTooltip("소수점 자르기 (0에 가까운 방향)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_nearest'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["f32", "f64"])
        .appendField("nearest");
    this.setOutput(true, ["f32", "f64"]);
    this.setColour(270);
    this.setTooltip("가장 가까운 정수로 반올림");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_copysign'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(["f32", "f64"]);
    this.appendDummyInput()
        .appendField("copysign");
    this.appendValueInput("RIGHT")
        .setCheck(["f32", "f64"]);
    this.setInputsInline(true);
    this.setOutput(true, ["f32", "f64"]);
    this.setColour(270);
    this.setTooltip("오른쪽 값의 부호를 왼쪽 값에 복사");
    this.setHelpUrl("");
  }
};

// 타입 변환 블록들  
Blockly.Blocks['wasm_wrap'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("i64")
        .appendField("i32.wrap_i64");
    this.setOutput(true, "i32");
    this.setColour("#795548");
    this.setTooltip("i64를 i32로 랩 (하위 32비트 사용)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_extend_s'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("i32")
        .appendField("i64.extend_i32_s");
    this.setOutput(true, "i64");
    this.setColour("#795548");
    this.setTooltip("i32를 i64로 확장 (부호 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_extend_u'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("i32")
        .appendField("i64.extend_i32_u");
    this.setOutput(true, "i64");
    this.setColour("#795548");
    this.setTooltip("i32를 i64로 확장 (0 확장)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_trunc_f32_s'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("f32")
        .appendField("i32.trunc_f32_s");
    this.setOutput(true, "i32");
    this.setColour("#795548");
    this.setTooltip("f32를 i32로 변환 (부호 있는 자르기)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_trunc_f32_u'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("f32")
        .appendField("i32.trunc_f32_u");
    this.setOutput(true, "i32");
    this.setColour("#795548");
    this.setTooltip("f32를 i32로 변환 (부호 없는 자르기)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_trunc_f64_s'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("f64")
        .appendField("i32.trunc_f64_s");
    this.setOutput(true, "i32");
    this.setColour("#795548");
    this.setTooltip("f64를 i32로 변환 (부호 있는 자르기)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_trunc_f64_u'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("f64")
        .appendField("i32.trunc_f64_u");
    this.setOutput(true, "i32");
    this.setColour("#795548");
    this.setTooltip("f64를 i32로 변환 (부호 없는 자르기)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_convert_i32_s'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("i32")
        .appendField("f32.convert_i32_s");
    this.setOutput(true, "f32");
    this.setColour("#795548");
    this.setTooltip("i32를 f32로 변환 (부호 있는)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_convert_i32_u'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("i32")
        .appendField("f32.convert_i32_u");
    this.setOutput(true, "f32");
    this.setColour("#795548");
    this.setTooltip("i32를 f32로 변환 (부호 없는)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_demote'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("f64")
        .appendField("f32.demote_f64");
    this.setOutput(true, "f32");
    this.setColour("#795548");
    this.setTooltip("f64를 f32로 다운캐스트");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_promote'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("f32")
        .appendField("f64.promote_f32");
    this.setOutput(true, "f64");
    this.setColour("#795548");
    this.setTooltip("f32를 f64로 업캐스트");
    this.setHelpUrl("");
  }
};

// 고급 제어 흐름 블록들
Blockly.Blocks['wasm_select'] = {
  init: function() {
    this.appendValueInput("VALUE1")
        .setCheck(["i32", "i64", "f32", "f64"])
        .appendField("select");
    this.appendValueInput("VALUE2")
        .setCheck(["i32", "i64", "f32", "f64"]);
    this.appendValueInput("CONDITION")
        .setCheck("i32")
        .appendField("if");
    this.setOutput(true, ["i32", "i64", "f32", "f64"]);
    this.setColour("#66BB6A");
    this.setTooltip("조건이 참이면 첫 번째 값, 거짓이면 두 번째 값 선택");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_br_if'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("br_if")
        .appendField(new Blockly.FieldTextInput("$label"), "LABEL");
    this.appendValueInput("CONDITION")
        .setCheck("i32")
        .appendField("if");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#66BB6A");
    this.setTooltip("조건부 분기");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_br_table'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("br_table");
    this.appendDummyInput()
        .appendField("targets:")
        .appendField(new Blockly.FieldTextInput("$label1 $label2"), "TARGETS");
    this.appendDummyInput()
        .appendField("default:")
        .appendField(new Blockly.FieldTextInput("$default"), "DEFAULT");
    this.appendValueInput("INDEX")
        .setCheck("i32")
        .appendField("index:");
    this.setPreviousStatement(true, null);
    this.setColour("#66BB6A");
    this.setTooltip("테이블 점프 (switch문과 유사)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_unreachable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("unreachable");
    this.setPreviousStatement(true, null);
    this.setColour("#66BB6A");
    this.setTooltip("실행 불가능한 코드 (트랩 발생)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wasm_nop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("nop");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#66BB6A");
    this.setTooltip("아무 작업도 하지 않음 (no operation)");
    this.setHelpUrl("");
  }
};
