// دالة لتحضير مصفوفة 5x5 بناءً على كلمة المرور
function createMatrix(key) {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    key = Array.from(new Set(key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '')));
    let matrix = key;

    for (let letter of alphabet) {
        if (!matrix.includes(letter)) {
            matrix.push(letter);
        }
    }

    // تحويل المصفوفة إلى 5x5
    let matrix2D = [];
    for (let i = 0; i < 5; i++) {
        matrix2D.push(matrix.slice(i * 5, i * 5 + 5));
    }
    return matrix2D;
}

// دالة لتقسيم النص إلى أزواج
function preprocessText(text) {
    text = text.toUpperCase().replace(/J/g, "I").replace(/\s/g, "");
    let pairs = [];
    let i = 0;
    while (i < text.length) {
        let a = text[i];
        let b = (i + 1 < text.length) ? text[i + 1] : 'X';
        if (a === b) {
            pairs.push(a + 'X');
            i++;
        } else {
            pairs.push(a + b);
            i += 2;
        }
    }
    if (pairs[pairs.length - 1].length === 1) {
        pairs[pairs.length - 1] += 'X';
    }
    return pairs;
}

// دالة للتشفير باستخدام Playfair
function playfairEncrypt(key, text) {
    let matrix = createMatrix(key);
    let pairs = preprocessText(text);
    let encryptedText = "";

    pairs.forEach(pair => {
        let a = pair[0], b = pair[1];
        let row1, col1, row2, col2;

        // إيجاد مواقع الحروف في المصفوفة
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (matrix[i][j] === a) {
                    row1 = i; col1 = j;
                }
                if (matrix[i][j] === b) {
                    row2 = i; col2 = j;
                }
            }
        }

        // تطبيق قواعد التشفير
        if (row1 === row2) {
            encryptedText += matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
        } else if (col1 === col2) {
            encryptedText += matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
        } else {
            encryptedText += matrix[row1][col2] + matrix[row2][col1];
        }
    });

    return encryptedText;
}

// دالة يتم استدعاؤها عند الضغط على زر التشفير
document.querySelector('.cli').addEventListener('click', function() {
    console.log('hi')
    let key = document.getElementById("key").value;
    let text = document.getElementById("text").value;
    console.log(key)
    console.log(text)
    
    if (!key || !text) {
        alert("يرجى إدخال كلمة المرور والنص");
        return;
    }
    
    let encrypted = playfairEncrypt(key, text);
    document.getElementById("result").innerText = `Cipher text: ${encrypted}`;
});
