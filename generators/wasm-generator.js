// WebAssembly 코드 생성기

// WAT (WebAssembly Text format) 언어 정의  
if (typeof Blockly.CodeGenerator !== 'undefined') {
    Blockly.WAT = new Blockly.CodeGenerator('WAT');
} else if (typeof Blockly.Generator !== 'undefined') {
    Blockly.WAT = new Blockly.Generator('WAT');
} else {
    console.error('Blockly Generator 클래스를 찾을 수 없음');
}

if (Blockly.WAT && typeof Blockly.WAT === 'object') {
    // forBlock 프로퍼티가 없으면 초기화
    if (!Blockly.WAT.forBlock) {
        Blockly.WAT.forBlock = {};
    }
    // 연산자 우선순위 정의
    Blockly.WAT.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.WAT.ORDER_NEW = 1.1;            // new
Blockly.WAT.ORDER_MEMBER = 1.2;         // . []
Blockly.WAT.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.WAT.ORDER_INCREMENT = 3;        // ++
Blockly.WAT.ORDER_DECREMENT = 3;        // --
Blockly.WAT.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.WAT.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.WAT.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.WAT.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.WAT.ORDER_TYPEOF = 4.5;         // typeof
Blockly.WAT.ORDER_VOID = 4.6;           // void
Blockly.WAT.ORDER_DELETE = 4.7;         // delete
Blockly.WAT.ORDER_AWAIT = 4.8;          // await
Blockly.WAT.ORDER_EXPONENTIATION = 5.0; // **
Blockly.WAT.ORDER_MULTIPLICATION = 5.1; // *
Blockly.WAT.ORDER_DIVISION = 5.2;       // /
Blockly.WAT.ORDER_MODULUS = 5.3;        // %
Blockly.WAT.ORDER_SUBTRACTION = 6.1;    // -
Blockly.WAT.ORDER_ADDITION = 6.2;       // +
Blockly.WAT.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.WAT.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.WAT.ORDER_IN = 8;               // in
Blockly.WAT.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.WAT.ORDER_EQUALITY = 9;         // == != === !==
Blockly.WAT.ORDER_BITWISE_AND = 10;     // &
Blockly.WAT.ORDER_BITWISE_XOR = 11;     // ^
Blockly.WAT.ORDER_BITWISE_OR = 12;      // |
Blockly.WAT.ORDER_LOGICAL_AND = 13;     // &&
Blockly.WAT.ORDER_LOGICAL_OR = 14;      // ||
Blockly.WAT.ORDER_CONDITIONAL = 15;     // ?:
Blockly.WAT.ORDER_ASSIGNMENT = 16;      // = += -= **= *= /= %= <<= >>= ...
Blockly.WAT.ORDER_YIELD = 17;           // yield
Blockly.WAT.ORDER_COMMA = 18;           // ,
Blockly.WAT.ORDER_NONE = 99;            // (...)

// 문자열을 안전하게 처리하는 함수
Blockly.WAT.quote_ = function(string) {
  return JSON.stringify(string);
};

// 변수명을 안전하게 처리하는 함수
Blockly.WAT.variableDB_ = new Blockly.Names('$');

// 들여쓰기 레벨
Blockly.WAT.INDENT = '  ';

// 기본 타입 블록 생성기들 (새로운 forBlock 방식)
Blockly.WAT.forBlock['wasm_i32'] = function(block, generator) {
  const value = block.getFieldValue('VALUE');
  return ['i32.const ' + value, Blockly.WAT.ORDER_ATOMIC];
};

Blockly.WAT.forBlock['wasm_i64'] = function(block, generator) {
  const value = block.getFieldValue('VALUE');
  return ['i64.const ' + value, Blockly.WAT.ORDER_ATOMIC];
};

Blockly.WAT.forBlock['wasm_f32'] = function(block, generator) {
  const value = block.getFieldValue('VALUE');
  return ['f32.const ' + value, Blockly.WAT.ORDER_ATOMIC];
};

Blockly.WAT.forBlock['wasm_f64'] = function(block, generator) {
  const value = block.getFieldValue('VALUE');
  return ['f64.const ' + value, Blockly.WAT.ORDER_ATOMIC];
};

// 산술 연산 블록 생성기들
Blockly.WAT.forBlock['wasm_add'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  
  // 타입 추론을 위한 간단한 로직
  let type = 'i32'; // 기본값
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  else if (left.includes('f64') || right.includes('f64')) type = 'f64';
  else if (left.includes('f32') || right.includes('f32')) type = 'f32';
  
  // 스택 기반 형태로 생성
  const code = `${left}\n${right}\n${type}.add`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_sub'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  else if (left.includes('f64') || right.includes('f64')) type = 'f64';
  else if (left.includes('f32') || right.includes('f32')) type = 'f32';
  
  const code = `${left}\n${right}\n${type}.sub`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_mul'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 1';
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 1';
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  else if (left.includes('f64') || right.includes('f64')) type = 'f64';
  else if (left.includes('f32') || right.includes('f32')) type = 'f32';
  
  const code = `${left}\n${right}\n${type}.mul`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_div'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 1';
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 1';
  
  let type = 'i32';
  let op = 'div_s'; // signed division for integers
  if (left.includes('i64') || right.includes('i64')) {
    type = 'i64';
    op = 'div_s';
  } else if (left.includes('f64') || right.includes('f64')) {
    type = 'f64';
    op = 'div';
  } else if (left.includes('f32') || right.includes('f32')) {
    type = 'f32';
    op = 'div';
  }
  
  const code = `${left}\n${right}\n${type}.${op}`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 제어문 블록 생성기들
Blockly.WAT.forBlock['wasm_if'] = function(block, generator) {
  const condition = generator.valueToCode(block, 'CONDITION', Blockly.WAT.ORDER_NONE) || '(i32.const 0)';
  const thenBranch = generator.statementToCode(block, 'THEN');
  const elseBranch = generator.statementToCode(block, 'ELSE');
  
  let code = `(if ${condition}\n`;
  code += `${Blockly.WAT.INDENT}(then\n`;
  code += Blockly.WAT.prefixLines(thenBranch, Blockly.WAT.INDENT + Blockly.WAT.INDENT);
  code += `${Blockly.WAT.INDENT})\n`;
  
  if (elseBranch) {
    code += `${Blockly.WAT.INDENT}(else\n`;
    code += Blockly.WAT.prefixLines(elseBranch, Blockly.WAT.INDENT + Blockly.WAT.INDENT);
    code += `${Blockly.WAT.INDENT})\n`;
  }
  
  code += ')';
  return code;
};

Blockly.WAT.forBlock['wasm_loop'] = function(block, generator) {
  const label = block.getFieldValue('LABEL') || '$loop';
  const body = generator.statementToCode(block, 'BODY');
  
  let code = `(loop ${label}\n`;
  code += Blockly.WAT.prefixLines(body, Blockly.WAT.INDENT);
  code += ')';
  return code;
};

Blockly.WAT.forBlock['wasm_block'] = function(block, generator) {
  const label = block.getFieldValue('LABEL') || '$block';
  const body = generator.statementToCode(block, 'BODY');
  
  let code = `(block ${label}\n`;
  code += Blockly.WAT.prefixLines(body, Blockly.WAT.INDENT);
  code += ')';
  return code;
};

Blockly.WAT.forBlock['wasm_br'] = function(block, generator) {
  const label = block.getFieldValue('LABEL') || '$label';
  return `(br ${label})`;
};

// 함수 블록 생성기들 - 표준 WAT 형태 (next 블록 처리 포함)
Blockly.WAT.forBlock['wasm_function'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || '$func';
  const params = block.getFieldValue('PARAMS') || '';
  const result = block.getFieldValue('RESULT');
  const body = generator.statementToCode(block, 'BODY');
  
  let code = `(func ${name}`;
  
  if (params) {
    const paramList = params.split(',').map(p => p.trim()).filter(p => p);
    paramList.forEach(param => {
      const parts = param.split(' ');
      if (parts.length === 2) {
        code += ` (param ${parts[0]} ${parts[1]})`;
      } else {
        code += ` (param ${param})`;
      }
    });
  }
  
  if (result && result !== 'none') {
    code += ` (result ${result})`;
  }
  
  code += '\n';
  // 함수 본문을 더 깔끔하게 들여쓰기
  if (body.trim()) {
    const cleanBody = body.trim().split('\n').map(line => `  ${line}`).join('\n');
    code += cleanBody + '\n';
  }
  code += ')';
  
  // 다음 연결된 모든 블록들을 처리
  let nextBlock = block.getNextBlock();
  while (nextBlock) {
    const nextCode = generator.blockToCode(nextBlock);
    if (nextCode) {
      code += '\n' + nextCode;
    }
    nextBlock = nextBlock.getNextBlock();
  }
  
  return code;
};

Blockly.WAT.forBlock['wasm_call'] = function(block, generator) {
  const functionName = block.getFieldValue('FUNCTION') || '$func';
  const args = generator.valueToCode(block, 'ARGS', Blockly.WAT.ORDER_NONE);
  
  if (args) {
    const code = `${args}\ncall ${functionName}`;
    return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
  } else {
    const code = `call ${functionName}`;
    return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
  }
};

Blockly.WAT.forBlock['wasm_return'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_NONE);
  
  if (value) {
    return `${value}\nreturn`;
  } else {
    return 'return';
  }
};

// 메모리 블록 생성기들
Blockly.WAT.forBlock['wasm_memory'] = function(block, generator) {
  const pages = block.getFieldValue('PAGES') || '1';
  return `(memory ${pages})`;
};

Blockly.WAT.forBlock['wasm_load'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const type = block.getFieldValue('TYPE') || 'i32';
  
  const code = `${address}\n${type}.load`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_store'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  
  // 타입 추론
  let type = 'i32';
  if (value.includes('i64')) type = 'i64';
  else if (value.includes('f64')) type = 'f64';
  else if (value.includes('f32')) type = 'f32';
  
  return `${address}\n${value}\n${type}.store`;
};

// 🔥 고급 메모리 생성기들 추가
Blockly.WAT.forBlock['wasm_load8_s'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\ni32.load8_s`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_load8_u'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\ni32.load8_u`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_load16_s'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\ni32.load16_s`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_load16_u'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\ni32.load16_u`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_store8'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\n${value}\ni32.store8`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return code;
};

Blockly.WAT.forBlock['wasm_store16'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\n${value}\ni32.store16`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return code;
};

Blockly.WAT.forBlock['wasm_memory_size'] = function(block, generator) {
  const code = 'memory.size';
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_memory_grow'] = function(block, generator) {
  const pages = generator.valueToCode(block, 'PAGES', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 1';
  const code = `${pages}\nmemory.grow`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 🔥 테이블 생성기들 추가
Blockly.WAT.forBlock['wasm_table'] = function(block, generator) {
  const size = block.getFieldValue('SIZE') || '10';
  return `(table ${size} funcref)`;
};

Blockly.WAT.forBlock['wasm_table_get'] = function(block, generator) {
  const index = generator.valueToCode(block, 'INDEX', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const code = `${index}\ntable.get`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_table_set'] = function(block, generator) {
  const index = generator.valueToCode(block, 'INDEX', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'ref.null funcref';
  return `${index}\n${value}\ntable.set`;
};

Blockly.WAT.forBlock['wasm_call_indirect'] = function(block, generator) {
  const index = generator.valueToCode(block, 'INDEX', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const type = block.getFieldValue('TYPE') || '(param i32) (result i32)';
  const code = `${index}\ncall_indirect ${type}`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_table_size'] = function(block, generator) {
  const code = 'table.size';
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_table_grow'] = function(block, generator) {
  const size = generator.valueToCode(block, 'SIZE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 1';
  const init = generator.valueToCode(block, 'INIT', Blockly.WAT.ORDER_ATOMIC) || 'ref.null funcref';
  const code = `${size}\n${init}\ntable.grow`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 🔥 i64 메모리 생성기들 추가
Blockly.WAT.forBlock['wasm_i64_load32_s'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\ni64.load32_s`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_i64_load32_u'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\ni64.load32_u`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_i64_load8_s'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\ni64.load8_s`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_i64_load8_u'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\ni64.load8_u`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_i64_load16_s'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\ni64.load16_s`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_i64_load16_u'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\ni64.load16_u`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_i64_store32'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i64.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\n${value}\ni64.store32`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return code;
};

Blockly.WAT.forBlock['wasm_i64_store8'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i64.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\n${value}\ni64.store8`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return code;
};

Blockly.WAT.forBlock['wasm_i64_store16'] = function(block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i64.const 0';
  const offset = block.getFieldValue('OFFSET') || 0;
  
  let code = `${address}\n${value}\ni64.store16`;
  if (offset > 0) code += ` offset=${offset}`;
  
  return code;
};

// 🔥 데이터/엘리먼트 세그먼트 생성기들
Blockly.WAT.forBlock['wasm_data'] = function(block, generator) {
  const offset = block.getFieldValue('OFFSET') || 0;
  const data = block.getFieldValue('DATA') || '"Hello"';
  return `(data (i32.const ${offset}) ${data})`;
};

Blockly.WAT.forBlock['wasm_data_drop'] = function(block, generator) {
  const index = block.getFieldValue('INDEX') || 0;
  return `(data.drop ${index})`;
};

Blockly.WAT.forBlock['wasm_elem'] = function(block, generator) {
  const offset = block.getFieldValue('OFFSET') || 0;
  const funcs = block.getFieldValue('FUNCS') || '$func1';
  return `(elem (i32.const ${offset}) ${funcs})`;
};

Blockly.WAT.forBlock['wasm_elem_drop'] = function(block, generator) {
  const index = block.getFieldValue('INDEX') || 0;
  return `(elem.drop ${index})`;
};

// 🔥 기타 고급 생성기들
Blockly.WAT.forBlock['wasm_start'] = function(block, generator) {
  const functionName = block.getFieldValue('FUNCTION') || '$main';
  return `(start ${functionName})`;
};

Blockly.WAT.forBlock['wasm_type'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || '$sig';
  const signature = block.getFieldValue('SIG') || '(func (param i32) (result i32))';
  return `(type ${name} ${signature})`;
};

Blockly.WAT.forBlock['wasm_funcref'] = function(block, generator) {
  const functionName = block.getFieldValue('FUNCTION') || '$func';
  const code = `ref.func ${functionName}`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_ref_null'] = function(block, generator) {
  const type = block.getFieldValue('TYPE') || 'funcref';
  const code = `ref.null ${type}`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 🔥 진짜 기본적인 명령어 생성기들!
Blockly.WAT.forBlock['wasm_drop'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  return `${value}\ndrop`;
};

Blockly.WAT.forBlock['wasm_i32_eqz'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const code = `${value}\ni32.eqz`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_i64_eqz'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i64.const 0';
  const code = `${value}\ni64.eqz`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 부호 구분 나눗셈 생성기
Blockly.WAT.forBlock['wasm_div_s'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 1';
  const type = block.getFieldValue('TYPE') || 'i32';
  const code = `${left}\n${right}\n${type}.div_s`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_div_u'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 1';
  const type = block.getFieldValue('TYPE') || 'i32';
  const code = `${left}\n${right}\n${type}.div_u`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 나머지 연산 생성기
Blockly.WAT.forBlock['wasm_rem_s'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 1';
  const type = block.getFieldValue('TYPE') || 'i32';
  const code = `${left}\n${right}\n${type}.rem_s`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_rem_u'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 1';
  const type = block.getFieldValue('TYPE') || 'i32';
  const code = `${left}\n${right}\n${type}.rem_u`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 비트 카운트 연산 생성기
Blockly.WAT.forBlock['wasm_clz'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const type = block.getFieldValue('TYPE') || 'i32';
  const code = `${value}\n${type}.clz`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_ctz'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const type = block.getFieldValue('TYPE') || 'i32';
  const code = `${value}\n${type}.ctz`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_popcnt'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const type = block.getFieldValue('TYPE') || 'i32';
  const code = `${value}\n${type}.popcnt`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// reinterpret 생성기들
Blockly.WAT.forBlock['wasm_reinterpret_i32'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'f32.const 0';
  const code = `${value}\ni32.reinterpret_f32`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_reinterpret_i64'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'f64.const 0';
  const code = `${value}\ni64.reinterpret_f64`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_reinterpret_f32'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  const code = `${value}\nf32.reinterpret_i32`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_reinterpret_f64'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i64.const 0';
  const code = `${value}\nf64.reinterpret_i64`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 모듈 블록 생성기들 - 표준 WAT 형태  
Blockly.WAT.forBlock['wasm_module'] = function(block, generator) {
  const content = generator.statementToCode(block, 'CONTENT');
  
  let code = '(module';
  if (content.trim()) {
    code += '\n';
    // 내용을 깔끔하게 들여쓰기
    const cleanContent = content.trim().split('\n').map(line => `  ${line}`).join('\n');
    code += cleanContent + '\n';
  }
  code += ')';
  
  return code;
};

Blockly.WAT.forBlock['wasm_export'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || '"main"';
  const functionName = block.getFieldValue('FUNCTION') || '$main';
  
  return `(export ${name} (func ${functionName}))`;
};

Blockly.WAT.forBlock['wasm_import'] = function(block, generator) {
  const module = block.getFieldValue('MODULE') || '"env"';
  const name = block.getFieldValue('NAME') || '"func"';
  const functionName = block.getFieldValue('FUNCTION') || '$imported';
  
  return `(import ${module} ${name} (func ${functionName}))`;
};

// 로컬 변수 블록 생성기들
Blockly.WAT.forBlock['wasm_local_get'] = function(block, generator) {
  const variable = block.getFieldValue('VARIABLE') || '$var';
  return [`local.get ${variable}`, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_local_set'] = function(block, generator) {
  const variable = block.getFieldValue('VARIABLE') || '$var';
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  return `${value}\nlocal.set ${variable}`;
};

// 글로벌 변수 블록 생성기들
Blockly.WAT.forBlock['wasm_global'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || '$g';
  const type = block.getFieldValue('TYPE') || 'i32';
  const init = generator.valueToCode(block, 'INIT', Blockly.WAT.ORDER_ATOMIC) || '(i32.const 0)';
  return `(global ${name} ${type} ${init})`;
};

Blockly.WAT.forBlock['wasm_global_get'] = function(block, generator) {
  const variable = block.getFieldValue('VARIABLE') || '$g';
  return [`global.get ${variable}`, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_global_set'] = function(block, generator) {
  const variable = block.getFieldValue('VARIABLE') || '$g';
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  return `${value}\nglobal.set ${variable}`;
};

// 🔥 새로 추가한 로컬 변수 생성기들
Blockly.WAT.forBlock['wasm_local_tee'] = function(block, generator) {
  const variable = block.getFieldValue('VARIABLE') || '$var';
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC) || 'i32.const 0';
  
  const code = `${value}\nlocal.tee ${variable}`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_local_declare'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || '$var';
  const type = block.getFieldValue('TYPE') || 'i32';
  
  return `(local ${name} ${type})`;
};

Blockly.WAT.forBlock['wasm_param_get'] = function(block, generator) {
  const param = block.getFieldValue('PARAM') || '$a';
  
  const code = `local.get ${param}`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_local_init'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || '$var';
  const type = block.getFieldValue('TYPE') || 'i32';
  
  // 타입별 기본값으로 초기화
  const defaultValues = {
    'i32': 'i32.const 0',
    'i64': 'i64.const 0', 
    'f32': 'f32.const 0.0',
    'f64': 'f64.const 0.0'
  };
  
  return `(local ${name} ${type})\n${defaultValues[type]}\nlocal.set ${name}`;
};

// 비교 연산 블록 생성기들
Blockly.WAT.forBlock['wasm_eq'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  else if (left.includes('f64') || right.includes('f64')) type = 'f64';
  else if (left.includes('f32') || right.includes('f32')) type = 'f32';
  
  const code = `(${type}.eq ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_lt'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  let op = 'lt_s'; // signed less than for integers
  if (left.includes('i64') || right.includes('i64')) {
    type = 'i64';
    op = 'lt_s';
  } else if (left.includes('f64') || right.includes('f64')) {
    type = 'f64';
    op = 'lt';
  } else if (left.includes('f32') || right.includes('f32')) {
    type = 'f32';
    op = 'lt';
  }
  
  const code = `(${type}.${op} ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 확장된 비교 연산 생성기들
Blockly.WAT.forBlock['wasm_gt'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  let op = 'gt_s';
  if (left.includes('i64') || right.includes('i64')) {
    type = 'i64';
    op = 'gt_s';
  } else if (left.includes('f64') || right.includes('f64')) {
    type = 'f64';
    op = 'gt';
  } else if (left.includes('f32') || right.includes('f32')) {
    type = 'f32';
    op = 'gt';
  }
  
  const code = `(${type}.${op} ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_le'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  let op = 'le_s';
  if (left.includes('i64') || right.includes('i64')) {
    type = 'i64';
    op = 'le_s';
  } else if (left.includes('f64') || right.includes('f64')) {
    type = 'f64';
    op = 'le';
  } else if (left.includes('f32') || right.includes('f32')) {
    type = 'f32';
    op = 'le';
  }
  
  const code = `(${type}.${op} ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_ge'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  let op = 'ge_s';
  if (left.includes('i64') || right.includes('i64')) {
    type = 'i64';
    op = 'ge_s';
  } else if (left.includes('f64') || right.includes('f64')) {
    type = 'f64';
    op = 'ge';
  } else if (left.includes('f32') || right.includes('f32')) {
    type = 'f32';
    op = 'ge';
  }
  
  const code = `(${type}.${op} ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_ne'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  else if (left.includes('f64') || right.includes('f64')) type = 'f64';
  else if (left.includes('f32') || right.includes('f32')) type = 'f32';
  
  const code = `(${type}.ne ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 비트 연산 생성기들
Blockly.WAT.forBlock['wasm_and'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  
  const code = `(${type}.and ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_or'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  
  const code = `(${type}.or ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_xor'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  
  const code = `(${type}.xor ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_shl'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  
  const code = `(${type}.shl ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_shr_s'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  
  const code = `(${type}.shr_s ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_shr_u'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  
  const code = `(${type}.shr_u ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_rotl'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  
  const code = `(${type}.rotl ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_rotr'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'i32';
  if (left.includes('i64') || right.includes('i64')) type = 'i64';
  
  const code = `(${type}.rotr ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 수학 함수 생성기들
Blockly.WAT.forBlock['wasm_min'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'f32';
  if (left.includes('f64') || right.includes('f64')) type = 'f64';
  
  const code = `(${type}.min ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_max'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'f32';
  if (left.includes('f64') || right.includes('f64')) type = 'f64';
  
  const code = `(${type}.max ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_abs'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'f32';
  if (value.includes('f64')) type = 'f64';
  
  const code = `(${type}.abs ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_sqrt'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'f32';
  if (value.includes('f64')) type = 'f64';
  
  const code = `(${type}.sqrt ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_ceil'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'f32';
  if (value.includes('f64')) type = 'f64';
  
  const code = `(${type}.ceil ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_floor'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'f32';
  if (value.includes('f64')) type = 'f64';
  
  const code = `(${type}.floor ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_trunc'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'f32';
  if (value.includes('f64')) type = 'f64';
  
  const code = `(${type}.trunc ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_nearest'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'f32';
  if (value.includes('f64')) type = 'f64';
  
  const code = `(${type}.nearest ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_copysign'] = function(block, generator) {
  const left = generator.valueToCode(block, 'LEFT', Blockly.WAT.ORDER_ATOMIC);
  const right = generator.valueToCode(block, 'RIGHT', Blockly.WAT.ORDER_ATOMIC);
  
  let type = 'f32';
  if (left.includes('f64') || right.includes('f64')) type = 'f64';
  
  const code = `(${type}.copysign ${left} ${right})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 타입 변환 생성기들
Blockly.WAT.forBlock['wasm_wrap'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  const code = `(i32.wrap_i64 ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_extend_s'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  const code = `(i64.extend_i32_s ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_extend_u'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  const code = `(i64.extend_i32_u ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_trunc_f32_s'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  const code = `(i32.trunc_f32_s ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_trunc_f32_u'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  const code = `(i32.trunc_f32_u ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_trunc_f64_s'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  const code = `(i32.trunc_f64_s ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_trunc_f64_u'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  const code = `(i32.trunc_f64_u ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_convert_i32_s'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  const code = `(f32.convert_i32_s ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_convert_i32_u'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  const code = `(f32.convert_i32_u ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_demote'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  const code = `(f32.demote_f64 ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_promote'] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.WAT.ORDER_ATOMIC);
  const code = `(f64.promote_f32 ${value})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

// 고급 제어 흐름 생성기들
Blockly.WAT.forBlock['wasm_select'] = function(block, generator) {
  const value1 = generator.valueToCode(block, 'VALUE1', Blockly.WAT.ORDER_ATOMIC);
  const value2 = generator.valueToCode(block, 'VALUE2', Blockly.WAT.ORDER_ATOMIC);
  const condition = generator.valueToCode(block, 'CONDITION', Blockly.WAT.ORDER_ATOMIC);
  
  const code = `(select ${value1} ${value2} ${condition})`;
  return [code, Blockly.WAT.ORDER_FUNCTION_CALL];
};

Blockly.WAT.forBlock['wasm_br_if'] = function(block, generator) {
  const label = block.getFieldValue('LABEL') || '$label';
  const condition = generator.valueToCode(block, 'CONDITION', Blockly.WAT.ORDER_ATOMIC);
  
  return `(br_if ${label} ${condition})`;
};

Blockly.WAT.forBlock['wasm_br_table'] = function(block, generator) {
  const targets = block.getFieldValue('TARGETS') || '$label1 $label2';
  const defaultLabel = block.getFieldValue('DEFAULT') || '$default';
  const index = generator.valueToCode(block, 'INDEX', Blockly.WAT.ORDER_ATOMIC);
  
  return `(br_table ${targets} ${defaultLabel} ${index})`;
};

Blockly.WAT.forBlock['wasm_unreachable'] = function(block, generator) {
  return '(unreachable)';
};

Blockly.WAT.forBlock['wasm_nop'] = function(block, generator) {
  return '(nop)';
};

// 문자열에 접두사를 추가하는 유틸리티 함수
Blockly.WAT.prefixLines = function(text, prefix) {
  return prefix + text.replace(/\n/g, '\n' + prefix);
};

// WAT Generator 로딩 완료

} else {
    console.error('Blockly WAT Generator 초기화 실패');
}
