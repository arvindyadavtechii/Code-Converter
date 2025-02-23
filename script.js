const SAMPLE_CONVERSIONS = {
    'JavaScript': {
        'Python': `# Python equivalent
def greet(name):
    return f"Hello, {name}!"
    
result = greet("World")
print(result)`,
        'Java': `// Java equivalent
public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    public static void main(String[] args) {
        String result = greet("World");
        System.out.println(result);
    }
}`
    },
    'Python': {
        'JavaScript': `// JavaScript equivalent
function greet(name) {
    return \`Hello, \${name}!\`;
}

const result = greet("World");
console.log(result);`,
        'Java': `// Java equivalent
public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    public static void main(String[] args) {
        String result = greet("World");
        System.out.println(result);
    }
}`
    }
};

const sourceLang = document.getElementById('sourceLang');
const targetLang = document.getElementById('targetLang');
const sourceCode = document.getElementById('sourceCode');
const convertedCode = document.getElementById('convertedCode');
const convertButton = document.getElementById('convertButton');
const swapButton = document.getElementById('swapButton');
const copyButton = document.getElementById('copyButton');
const copyIcon = document.querySelector('.copy-icon');
const checkIcon = document.querySelector('.check-icon');

function convertCode() {
    const source = sourceLang.value;
    const target = targetLang.value;
    
    convertButton.textContent = 'Converting...';
    convertButton.classList.add('converting');
    convertButton.disabled = true;

    setTimeout(() => {
        if (SAMPLE_CONVERSIONS[source]?.[target]) {
            convertedCode.value = SAMPLE_CONVERSIONS[source][target];
            copyButton.style.display = 'block';
        } else {
            convertedCode.value = '// Conversion not available for this language pair';
            copyButton.style.display = 'none';
        }

        convertButton.textContent = 'Convert Code';
        convertButton.classList.remove('converting');
        convertButton.disabled = false;
    }, 1000);
}

function swapLanguages() {
    const tempLang = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;

    const tempCode = sourceCode.value;
    sourceCode.value = convertedCode.value;
    convertedCode.value = tempCode;
}

function copyToClipboard() {
    navigator.clipboard.writeText(convertedCode.value);
    copyIcon.style.display = 'none';
    checkIcon.style.display = 'block';
    
    setTimeout(() => {
        copyIcon.style.display = 'block';
        checkIcon.style.display = 'none';
    }, 2000);
}

convertButton.addEventListener('click', convertCode);
swapButton.addEventListener('click', swapLanguages);
copyButton.addEventListener('click', copyToClipboard);

convertedCode.addEventListener('input', () => {
    copyButton.style.display = convertedCode.value ? 'block' : 'none';
});