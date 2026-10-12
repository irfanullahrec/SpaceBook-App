// Class 3 Khyber Pakhtunkhwa Textbook Board Mathematics, Curriculum 2020.
// Chapter lessons and question banks are paired with the supplied Word transcription.
function math3Section(id, title, theory, theoryUrdu, diagram, rules, rulesUrdu) {
  return { id, title, theory, theoryUrdu, diagram, rules: rules || [], rulesUrdu: rulesUrdu || [] };
}
function math3Problem(num, question, solution, answer) {
  return { num, qNo: num, question, solution, answer, steps: [solution] };
}
function math3Chapter(number, title, titleUrdu, pageRange, sections, examples, exercises, slos, formulaSheet) {
  return {
    number, id: 'u' + number, title, titleUrdu, pageRange, status: 'ready', badge: 'KPTBB Class 3 Textbook',
    description: 'Workbook-matched lessons, vector diagrams, solved practice, and the supplied textbook transcription.',
    sections, workedExamples: examples, exercises, slos, formulaSheet,
    textbookText: (MATH_3_BOOK_TEXT.units[number - 1] || {}).paragraphs || [],
    textbookFrontMatter: number === 1 ? MATH_3_BOOK_TEXT.frontMatter : [],
    textbookBackMatter: number === 7 ? MATH_3_BOOK_TEXT.backMatter : []
  };
}

var MATH_3_DATA = [
math3Chapter(1, 'Whole Numbers', 'کامل اعداد', 'Pages 1–40', [
  math3Section('1.1', 'Roman Numbers up to 20', 'Roman numerals use I, V and X. Read and write the Roman numbers from 1 to 20, including IV (4), IX (9), XIV (14) and XX (20).', 'رومن اعداد I، V اور X سے لکھے جاتے ہیں۔ ۱ سے ۲۰ تک پڑھیں، مثلاً IV چار، IX نو، XIV چودہ اور XX بیس۔', 'roman20', ['I = 1, V = 5, X = 10.','Place I before V or X to subtract: IV = 4 and IX = 9.']),
  math3Section('1.2', 'Even and Odd Numbers', 'An even number can be grouped in pairs with none left over. An odd number leaves one item without a partner. Look at the ones digit to decide whether a whole number is even or odd.', 'جفت عدد کو جوڑوں میں بانٹنے پر کچھ باقی نہیں رہتا۔ طاق عدد میں ایک چیز بغیر جوڑے کے رہ جاتی ہے۔ اکائی کا ہندسہ دیکھ کر عدد کی پہچان کریں۔', 'oddEven', ['Even numbers end in 0, 2, 4, 6 or 8.','Odd numbers end in 1, 3, 5, 7 or 9.']),
  math3Section('1.3', 'Place Value and Expanded Form', 'The position of a digit tells its place value. In 4,372, the digits show 4 thousands, 3 hundreds, 7 tens and 2 ones: 4,372 = 4,000 + 300 + 70 + 2.', 'ہندسے کی جگہ اس کی مقامی قیمت بتاتی ہے۔ ۴۳۷۲ میں ۴ ہزار، ۳ سیکڑے، ۷ دہائیاں اور ۲ اکائیاں ہیں۔', 'placeValue4', ['Read digits from the greatest place to ones.','Write each digit multiplied by its place value.']),
  math3Section('1.4', 'Number Line and Comparing', 'A number line places numbers in order at equal intervals. Numbers farther to the right are greater. Compare digits from left to right and use <, > or =.', 'خطِ اعداد پر عدد برابر وقفوں سے ترتیب میں ہوتے ہیں۔ دائیں طرف کا عدد بڑا ہوتا ہے۔ ہندسوں کا بائیں سے موازنہ کرکے <، > یا = لکھیں۔', 'numberLine100', ['Compare thousands or hundreds first, then tens, then ones.','A number line moves from smaller values to larger values.']),
  math3Section('1.5', 'Ascending, Descending and Rounding', 'Ascending order goes from smallest to greatest; descending order goes from greatest to smallest. To round to the nearest ten or hundred, look at the digit immediately to the right of the place being rounded.', 'بڑھتی ترتیب چھوٹے سے بڑے اور گھٹتی ترتیب بڑے سے چھوٹے عدد تک جاتی ہے۔ قریب ترین دہائی یا سیکڑے کے لیے اگلا ہندسہ دیکھیں۔', 'rounding', ['0–4: keep the rounding digit; 5–9: increase it by one.','Replace digits to its right with zero.'])
], [
  { id:'m3e1', title:'Place Value', problem:'Write 6,284 in expanded form. What is the value of 2?', given:'6,284', method:'Read each digit by its place.', steps:['6 is in the thousands place: 6,000.','2 is in the hundreds place: 200.','8 tens = 80 and 4 ones = 4.'], answer:'6,284 = 6,000 + 200 + 80 + 4; value of 2 is 200.' },
  { id:'m3e2', title:'Rounding to the Nearest Hundred', problem:'Round 3,647 to the nearest hundred.', given:'3,647', method:'Look at the tens digit.', steps:['The hundreds digit is 6.','The tens digit is 4, so keep the hundreds digit.','Change tens and ones to zero.'], answer:'3,600' }
], [{ exercise:'1.1', title:'Unit 1 — Whole Numbers Practice', problems:[
  math3Problem('Q1','Write 19 in Roman numerals.','10 is X and 9 is IX, so 19 = X + IX.','XIX'),
  math3Problem('Q2','Is 4,508 even or odd?','The ones digit is 8. Numbers ending in 0, 2, 4, 6 or 8 are even.','Even'),
  math3Problem('Q3','Arrange 305, 350 and 503 in ascending order.','Compare hundreds, then tens: 305 < 350 < 503.','305, 350, 503'),
  math3Problem('Q4','Round 2,768 to the nearest ten.','The ones digit is 8, so increase the tens digit by one.','2,770')
]}], {
  mcqs:[
    {q:'Which is the Roman numeral for 14?',options:['XIV','XVI','IX','XX'],correct:0,exp:'X is 10 and IV is 4, so XIV is 14.'},
    {q:'Which number is odd?',options:['42','68','75','100'],correct:2,exp:'75 ends in 5, so it is odd.'},
    {q:'What is the value of 7 in 3,742?',options:['7','70','700','7,000'],correct:2,exp:'7 is in the hundreds place.'},
    {q:'Round 846 to the nearest ten.',options:['840','850','800','900'],correct:1,exp:'The ones digit is 6, so round up to 850.'}
  ],
  shortQuestions:[
    {q:'Write 18 in Roman numerals.',sol:'18 = 10 + 5 + 3 = XVIII.'},
    {q:'Write 5,306 in expanded form.',sol:'5,306 = 5,000 + 300 + 6.'},
    {q:'Round 2,451 to the nearest hundred.',sol:'The tens digit is 5, so round up: 2,500.'}
  ],
  longQuestions:[
    {q:'Explain how to compare and order 4,208, 4,280 and 4,082.',marks:4,rubric:'Compare place values from left to right and state the ordered list.',sol:'All have 4 thousands. Compare hundreds: 4,082 has 0 hundreds, while 4,208 and 4,280 have 2 hundreds. Compare tens in those two: 4,208 has 0 tens and 4,280 has 8 tens. Ascending order: 4,082, 4,208, 4,280.'},
    {q:'Write 17 in Roman numerals and round 3,746 to the nearest ten and hundred.',marks:4,rubric:'Correct Roman numeral and both rounding results.',sol:'17 = 10 + 5 + 2 = XVII. To the nearest ten, the ones digit 6 rounds 3,746 to 3,750. To the nearest hundred, the tens digit 4 rounds it to 3,700.'}
  ]
}, [
  {name:'Place value expansion',formula:'Number = thousands + hundreds + tens + ones',note:'Split a number by the value of each digit.'},
  {name:'Rounding rule',formula:'0–4: round down · 5–9: round up',note:'Check the first digit to the right of the target place.'},
  {name:'Even / odd',formula:'Even: ones digit 0, 2, 4, 6, 8',note:'Odd numbers end in 1, 3, 5, 7 or 9.'}
]),

math3Chapter(2, 'Number Operations', 'اعداد کے عمل', 'Pages 41–75', [
  math3Section('2.1','Addition with Regrouping','Add by place value, beginning with ones. Regroup ten ones as one ten and ten tens as one hundred. Follow the same method for numbers with thousands.','مقامی قیمت کے مطابق اکائیوں سے جمع شروع کریں۔ دس اکائیوں کو ایک دہائی اور دس دہائیوں کو ایک سیکڑا بنائیں۔', 'add4', ['Keep digits in matching place-value columns.','Carry each complete group of ten to the next column.']),
  math3Section('2.2','Subtraction with Borrowing','Subtract by place value from right to left. When the top digit is smaller, regroup one from the next place; one ten becomes ten ones and one hundred becomes ten tens.','دائیں سے بائیں مقامی قیمت کے مطابق تفریق کریں۔ ضرورت پر اگلی جگہ سے ادھار لیں؛ ایک دہائی دس اکائیاں بنتی ہے۔','subtract4', ['Check a subtraction by adding the difference and the number subtracted.']),
  math3Section('2.3','Multiplication and Tables','Multiplication is equal groups added repeatedly. Use multiplication tables and place-value columns to multiply larger numbers.', 'ضرب برابر گروہوں کو بار بار جمع کرنے کا مختصر طریقہ ہے۔ پہاڑوں اور مقامی قیمت کے خانوں سے ضرب کریں۔','multiplicationArray', ['The order of equal factors can be changed without changing the product.','Use the multiplication table to check a product.']),
  math3Section('2.4','Division by Sharing and Grouping','Division shares a quantity equally or counts equal groups. Multiplication can check division: divisor × quotient = dividend when there is no remainder.', 'تقسیم چیزوں کو برابر بانٹتی یا برابر گروہ گنتی ہے۔ ضرب سے جواب کی پڑتال کی جا سکتی ہے۔','divisionGroups', ['Share one at a time to keep groups equal.','Check with multiplication.'])
], [
  {id:'m3e1',title:'Addition with Carrying',problem:'Add 2,468 + 1,357.',given:'2,468 + 1,357',method:'Add each column from right to left.',steps:['Ones: 8 + 7 = 15; write 5 and carry 1 ten.','Tens: 6 + 5 + 1 = 12; write 2 and carry 1 hundred.','Hundreds: 4 + 3 + 1 = 8.','Thousands: 2 + 1 = 3.'],answer:'3,825'},
  {id:'m3e2',title:'Sharing Equally',problem:'Share 36 pencils equally among 4 children.',given:'36 pencils; 4 children',method:'Find how many pencils are in each equal group.',steps:['36 ÷ 4 = 9.','Check: 4 × 9 = 36.'],answer:'9 pencils each'}
], [{exercise:'2.1',title:'Unit 2 — Number Operations Practice',problems:[
  math3Problem('Q1','Add 3,785 + 2,649.','5 + 9 = 14; 8 + 4 + 1 = 13; 7 + 6 + 1 = 14; 3 + 2 + 1 = 6.','6,434'),
  math3Problem('Q2','Subtract 6,203 − 2,847.','Regroup 6,203 as 5 thousands, 11 hundreds, 9 tens and 13 ones; subtract each place.','3,356'),
  math3Problem('Q3','There are 8 boxes with 7 books in each. How many books?','8 × 7 = 56.','56 books'),
  math3Problem('Q4','Share 72 sweets equally among 9 children.','72 ÷ 9 = 8 because 9 × 8 = 72.','8 sweets each')
]}], {
  mcqs:[
    {q:'What is 3,475 + 2,318?',options:['5,793','5,783','5,893','6,793'],correct:0,exp:'3,475 + 2,318 = 5,793.'},
    {q:'What is 5,000 − 2,685?',options:['2,315','2,415','3,315','2,325'],correct:0,exp:'Regroup and subtract: 5,000 − 2,685 = 2,315.'},
    {q:'6 × 8 = ?',options:['42','48','54','56'],correct:1,exp:'Six groups of eight make 48.'},
    {q:'45 ÷ 5 = ?',options:['8','9','10','5'],correct:1,exp:'5 × 9 = 45, so 45 ÷ 5 = 9.'}
  ],
  shortQuestions:[
    {q:'Write 5 groups of 6 as repeated addition.',sol:'6 + 6 + 6 + 6 + 6 = 30.'},
    {q:'How can you check 83 − 27 = 56?',sol:'Add 56 + 27. The sum is 83, so the subtraction checks.'},
    {q:'Divide 63 marbles equally into 7 bags.',sol:'63 ÷ 7 = 9 marbles in each bag.'}
  ],
  longQuestions:[
    {q:'Solve 4,286 + 3,759. Show the regrouping.',marks:4,rubric:'Correct column addition and carrying.',sol:'Ones: 6 + 9 = 15; write 5 and carry 1. Tens: 8 + 5 + 1 = 14; write 4 and carry 1. Hundreds: 2 + 7 + 1 = 10; write 0 and carry 1. Thousands: 4 + 3 + 1 = 8. Answer: 8,045.'},
    {q:'A school packs 96 pencils equally into 8 boxes. How many pencils go in each box? Check your answer.',marks:3,rubric:'Correct division and multiplication check.',sol:'96 ÷ 8 = 12 pencils per box. Check: 8 × 12 = 96.'}
  ]
}, [
  {name:'Addition check',formula:'Addends → Sum',note:'Align the place-value columns and regroup as needed.'},
  {name:'Subtraction check',formula:'Difference + subtracted number = starting number',note:'Use addition to check subtraction.'},
  {name:'Multiplication',formula:'Equal groups → repeated addition',note:'Use known multiplication facts.'},
  {name:'Division check',formula:'Divisor × Quotient = Dividend',note:'This check applies when there is no remainder.'}
]),

math3Chapter(3,'Fractions','کسر','Pages 76–95',[
  math3Section('3.1','Fractions of a Whole','A fraction names equal parts of one whole. The denominator tells how many equal parts make the whole; the numerator tells how many parts are selected.','کسر مکمل چیز کے برابر حصوں کو بتاتا ہے۔ مخرج کل برابر حصے اور شمار کنندہ لیے گئے حصے بتاتا ہے۔','fractionParts', ['Parts must be equal in size.','Write the numerator above and the denominator below the fraction bar.']),
  math3Section('3.2','Numerator, Denominator and Fraction Pictures','Read a fraction by counting the shaded parts and the total equal parts. Show the same fraction by shading equal parts of shapes or groups.','رنگے ہوئے حصے شمار کنندہ اور تمام برابر حصے مخرج ہوتے ہیں۔ شکل کے برابر حصوں میں رنگ بھر کر کسر دکھائیں۔','fractionStrip', ['Count all equal parts for the denominator.','Count selected parts for the numerator.']),
  math3Section('3.3','Equivalent Fractions','Equivalent fractions name the same amount using differently sized equal parts. Make equivalent fractions by multiplying or dividing both numerator and denominator by the same non-zero number.','ہم قدر کسریں مختلف حصوں سے ایک ہی مقدار دکھاتی ہیں۔ شمار کنندہ اور مخرج دونوں کو ایک ہی عدد سے ضرب یا تقسیم کریں۔','equivalentFractions', ['Always compare equal-sized wholes.','Multiply or divide the top and bottom numbers by the same number.']),
  math3Section('3.4','Compare and Simplify Fractions','Compare fractions using their pictures or equivalent parts. Simplify a fraction by dividing its numerator and denominator by a common factor.','کسروں کا موازنہ شکلوں یا ہم قدر حصوں سے کریں۔ مشترک عامل سے اوپر اور نیچے دونوں اعداد تقسیم کرکے کسر سادہ کریں۔','fractionCompare', ['Do not compare shaded counts unless the whole shapes are equal.','Keep the fraction value unchanged when simplifying.'])
], [
  {id:'m3e1',title:'Name the Shaded Fraction',problem:'A shape is divided into 8 equal parts and 3 are shaded. Write the shaded fraction.',given:'8 equal parts; 3 shaded',method:'Shaded parts over total equal parts.',steps:['Count 3 shaded parts for the numerator.','Count 8 equal parts altogether for the denominator.'],answer:'3/8'},
  {id:'m3e2',title:'Equivalent Fractions',problem:'Write two fractions equivalent to 2/3.',given:'2/3',method:'Multiply numerator and denominator by the same number.',steps:['Multiply by 2: (2 × 2)/(3 × 2) = 4/6.','Multiply by 3: (2 × 3)/(3 × 3) = 6/9.'],answer:'4/6 and 6/9'}
], [{exercise:'3.1',title:'Unit 3 — Fractions Practice',problems:[
  math3Problem('Q1','Write the fraction for 5 shaded parts out of 9 equal parts.','Numerator = 5 and denominator = 9.','5/9'),
  math3Problem('Q2','Write two fractions equivalent to 3/4.','Multiply both terms by 2 and by 3.','6/8 and 9/12'),
  math3Problem('Q3','Simplify 6/8.','Divide numerator and denominator by their common factor 2.','3/4'),
  math3Problem('Q4','Which is greater: 1/2 or 1/4?','Two equal halves are larger than one of four equal quarters of the same whole.','1/2')
]}], {
  mcqs:[
    {q:'In 3/7, what is the denominator?',options:['3','7','10','4'],correct:1,exp:'The denominator is the bottom number, 7.'},
    {q:'Which fraction is equivalent to 1/2?',options:['1/4','2/4','3/4','2/3'],correct:1,exp:'2/4 simplifies to 1/2.'},
    {q:'A shape has 5 equal parts and 2 are shaded. What fraction is shaded?',options:['5/2','2/5','2/3','3/5'],correct:1,exp:'Two of the five equal parts are shaded: 2/5.'},
    {q:'Simplify 4/8.',options:['1/2','2/3','4/4','1/4'],correct:0,exp:'Divide top and bottom by 4: 4/8 = 1/2.'}
  ],
  shortQuestions:[
    {q:'What does the numerator tell us?',sol:'It tells how many equal parts are selected.'},
    {q:'Write 3/5 as an equivalent fraction with denominator 10.',sol:'Multiply numerator and denominator by 2: 3/5 = 6/10.'},
    {q:'Why must the parts in a fraction picture be equal?',sol:'Fractions describe equal shares of the same whole.'}
  ],
  longQuestions:[
    {q:'Explain how to show 3/4 using a rectangle and how to find an equivalent fraction.',marks:4,rubric:'Divide a whole into four equal parts, shade three, and show equivalent multiplication.',sol:'Draw one rectangle and divide it into 4 equal parts. Shade 3 parts to show 3/4. Divide each fourth into 2 equal pieces: there are 8 parts in all and 6 are shaded, so 3/4 = 6/8.'},
    {q:'Simplify 8/12 and explain why the value does not change.',marks:3,rubric:'Use the same common factor on the numerator and denominator.',sol:'The greatest common factor of 8 and 12 is 4. Divide both by 4: 8/12 = 2/3. The same number of equal groups is used in the numerator and denominator, so the fraction value stays the same.'}
  ]
}, [
  {name:'Fraction',formula:'Numerator / Denominator',note:'The whole must be divided into equal parts.'},
  {name:'Equivalent fractions',formula:'a/b = (a × n)/(b × n)',note:'Multiply or divide both terms by the same non-zero number.'},
  {name:'Simplifying',formula:'Divide numerator and denominator by a common factor',note:'The fraction value remains unchanged.'}
]),

math3Chapter(4,'Measurement: Length, Mass and Capacity','پیمائش: لمبائی، کمیت اور گنجائش','Pages 96–125',[
  math3Section('4.1','Length: Kilometres, Metres and Centimetres','Length tells how long or far something is. Use centimetres for small objects, metres for everyday lengths, and kilometres for long distances.','لمبائی یا فاصلہ ناپنے کے لیے چھوٹی چیزوں پر سینٹی میٹر، عام لمبائی پر میٹر اور بڑے فاصلے پر کلومیٹر استعمال کریں۔','metricRuler', ['1 m = 100 cm.','1 km = 1,000 m.','Measure from the zero mark.']),
  math3Section('4.2','Add and Subtract Lengths','Add or subtract lengths by keeping like units together. Regroup or exchange between metres and centimetres when needed.','لمبائی جمع یا منہا کرتے وقت ایک جیسی اکائیاں ساتھ رکھیں۔ ضرورت پر میٹر اور سینٹی میٹر کا تبادلہ کریں۔','lengthColumns', ['Write the unit with the answer.','Convert to the same unit before comparing.']),
  math3Section('4.3','Mass: Kilograms and Grams','Mass tells how heavy an object is. Use grams for lighter objects and kilograms for heavier objects. A balance scale compares mass.','کمیت بتاتی ہے کہ کوئی چیز کتنی بھاری ہے۔ ہلکی چیزوں کے لیے گرام اور بھاری چیزوں کے لیے کلوگرام استعمال کریں۔','massBalance', ['1 kg = 1,000 g.','Use the same unit when comparing masses.']),
  math3Section('4.4','Capacity: Litres and Millilitres','Capacity is the amount of liquid a container can hold. Use millilitres for small quantities and litres for larger quantities.','گنجائش بتاتی ہے کہ برتن میں کتنا مائع آ سکتا ہے۔ کم مقدار کے لیے ملی لیٹر اور زیادہ مقدار کے لیے لیٹر استعمال کریں۔','capacityVessels', ['1 L = 1,000 mL.','Add and subtract like units.'])
], [
  {id:'m3e1',title:'Convert Length',problem:'Convert 4 m 35 cm into centimetres.',given:'4 m 35 cm',method:'Change metres to centimetres and add the extra centimetres.',steps:['4 m = 4 × 100 = 400 cm.','400 cm + 35 cm = 435 cm.'],answer:'435 cm'},
  {id:'m3e2',title:'Subtract Mass',problem:'Subtract 7 kg 550 g from 8 kg 200 g.',given:'8 kg 200 g − 7 kg 550 g',method:'Regroup 1 kg as 1,000 g.',steps:['8 kg 200 g = 7 kg 1,200 g.','1,200 g − 550 g = 650 g.','7 kg − 7 kg = 0 kg.'],answer:'650 g'}
], [{exercise:'4.1',title:'Unit 4 — Measurement Practice',problems:[
  math3Problem('Q1','Change 3 km 250 m into metres.','3 km = 3,000 m; 3,000 m + 250 m = 3,250 m.','3,250 m'),
  math3Problem('Q2','Add 5 kg 350 g + 2 kg 475 g.','350 g + 475 g = 825 g; 5 kg + 2 kg = 7 kg.','7 kg 825 g'),
  math3Problem('Q3','Change 2 L 450 mL into millilitres.','2 L = 2,000 mL; add 450 mL.','2,450 mL'),
  math3Problem('Q4','A ribbon is 350 m long. A shopkeeper sells 120 m. How much is left?','350 m − 120 m = 230 m.','230 m')
]}], {
  mcqs:[
    {q:'1 kilometre is equal to:',options:['100 m','1,000 m','10 m','10,000 m'],correct:1,exp:'1 km = 1,000 m.'},
    {q:'Which unit is best for the mass of a school bag?',options:['millilitre','kilogram','centimetre','litre'],correct:1,exp:'Kilograms are suitable for the mass of a school bag.'},
    {q:'1 litre is equal to:',options:['100 mL','1,000 mL','10 mL','10,000 mL'],correct:1,exp:'1 L = 1,000 mL.'},
    {q:'Which tool measures length?',options:['clock','ruler','balance','calendar'],correct:1,exp:'A ruler measures length.'}
  ],
  shortQuestions:[
    {q:'Write the relationship between metres and centimetres.',sol:'1 m = 100 cm.'},
    {q:'Name a suitable unit for the mass of a watermelon.',sol:'Kilograms (kg).'},
    {q:'Convert 2 L into millilitres.',sol:'2 L = 2 × 1,000 = 2,000 mL.'}
  ],
  longQuestions:[
    {q:'A cloth piece is 12 m 45 cm long. A tailor uses 5 m 80 cm. How much cloth remains?',marks:4,rubric:'Regroup 1 metre as 100 cm and subtract both units.',sol:'12 m 45 cm = 11 m 145 cm. Subtract: 145 cm − 80 cm = 65 cm and 11 m − 5 m = 6 m. Remaining cloth = 6 m 65 cm.'},
    {q:'A water container holds 5 L 250 mL. It is filled with another 2 L 500 mL. Find the total capacity used in millilitres.',marks:4,rubric:'Convert both measures to millilitres and add.',sol:'5 L 250 mL = 5,250 mL. 2 L 500 mL = 2,500 mL. Total = 5,250 + 2,500 = 7,750 mL.'}
  ]
}, [
  {name:'Length',formula:'1 km = 1,000 m · 1 m = 100 cm',note:'Change both lengths to the same unit before adding.'},
  {name:'Mass',formula:'1 kg = 1,000 g',note:'Regroup 1 kg as 1,000 g when subtracting.'},
  {name:'Capacity',formula:'1 L = 1,000 mL',note:'Use litres for larger amounts and millilitres for smaller amounts.'}
]),

math3Chapter(5,'Measurement: Time','پیمائش: وقت','Pages 126–140',[
  math3Section('5.1','Reading Clocks and a.m. / p.m.','Read the short hour hand and long minute hand on an analogue clock. A digital clock shows the time with digits. Use a.m. for times before noon and p.m. for times after noon.','گھڑی کی چھوٹی سوئی گھنٹے اور لمبی سوئی منٹ بتاتی ہے۔ دوپہر سے پہلے a.m. اور دوپہر کے بعد p.m. لکھیں۔','clockFace', ['1 hour = 60 minutes.','12:00 noon is midday; 12:00 midnight begins a new day.']),
  math3Section('5.2','Days, Dates and Calendar','A calendar organizes days into weeks and months. Use the weekday headings and date boxes to read and write dates.', 'کیلنڈر دنوں کو ہفتوں اور مہینوں میں ترتیب دیتا ہے۔ دن کے عنوان اور تاریخ کے خانے دیکھیں۔','calendarGrid', ['1 week = 7 days.','Read across a calendar row to follow the week.']),
  math3Section('5.3','Add and Subtract Time','Add or subtract hours and minutes by keeping each unit in its own column. Regroup 60 minutes as 1 hour when needed.','گھنٹے اور منٹ الگ الگ جمع یا منہا کریں۔ ضرورت پر ۶۰ منٹ کو ایک گھنٹہ بنائیں۔','timeLine', ['60 minutes = 1 hour.','Write the unit with each time measure.'])
], [
  {id:'m3e1',title:'Add Hours and Minutes',problem:'Add 2 hours 35 minutes and 1 hour 40 minutes.',given:'2 h 35 min + 1 h 40 min',method:'Add minutes, regroup 60 minutes, then add hours.',steps:['35 + 40 = 75 minutes = 1 hour 15 minutes.','2 + 1 + 1 carried hour = 4 hours.'],answer:'4 h 15 min'},
  {id:'m3e2',title:'Read a Digital Time',problem:'A clock shows 7:30 p.m. Is it morning or evening?',given:'7:30 p.m.',method:'Use the p.m. label.',steps:['p.m. means after noon.','7:30 p.m. is in the evening.'],answer:'Evening'}
], [{exercise:'5.1',title:'Unit 5 — Time Practice',problems:[
  math3Problem('Q1','How many minutes are in 3 hours?','3 × 60 = 180 minutes.','180 minutes'),
  math3Problem('Q2','Add 4 h 25 min + 2 h 50 min.','25 + 50 = 75 min = 1 h 15 min; 4 + 2 + 1 = 7 h.','7 h 15 min'),
  math3Problem('Q3','A train travels 12 hours and then 9 more hours. Find the total time.','12 h + 9 h = 21 h.','21 hours'),
  math3Problem('Q4','How many days are in 4 weeks?','4 × 7 = 28.','28 days')
]}], {
  mcqs:[
    {q:'How many minutes are in one hour?',options:['30','60','100','24'],correct:1,exp:'One hour has 60 minutes.'},
    {q:'Which time is in the evening?',options:['8:00 a.m.','10:00 a.m.','8:00 p.m.','11:00 a.m.'],correct:2,exp:'p.m. indicates a time after noon.'},
    {q:'How many days are in one week?',options:['5','6','7','12'],correct:2,exp:'A week has 7 days.'},
    {q:'What is 2 h 45 min + 1 h 30 min?',options:['3 h 75 min','4 h 15 min','4 h 5 min','3 h 15 min'],correct:1,exp:'75 minutes regroup as 1 hour 15 minutes; total is 4 h 15 min.'}
  ],
  shortQuestions:[
    {q:'What do the hands on an analogue clock show?',sol:'The short hand shows hours and the long hand shows minutes.'},
    {q:'What do a.m. and p.m. mean for clock time?',sol:'a.m. is before noon and p.m. is after noon.'},
    {q:'How many hours are in two days?',sol:'2 × 24 = 48 hours.'}
  ],
  longQuestions:[
    {q:'A bus leaves at 8:15 a.m. and travels for 3 hours 50 minutes. At what time does it arrive?',marks:4,rubric:'Add minutes and hours with correct regrouping and a.m./p.m.',sol:'8:15 a.m. + 3 h = 11:15 a.m. Add 50 min: 11:15 + 45 min = 12:00 noon, then 5 min more = 12:05 p.m. The bus arrives at 12:05 p.m.'},
    {q:'A family trip takes 2 hours 35 minutes in the morning and 1 hour 45 minutes in the afternoon. Find the total travel time.',marks:4,rubric:'Add minutes, regroup one hour, and add hours.',sol:'35 min + 45 min = 80 min = 1 h 20 min. Add hours: 2 + 1 + 1 = 4 h. Total travel time = 4 h 20 min.'}
  ]
}, [
  {name:'Hour and minute',formula:'1 hour = 60 minutes',note:'Regroup every complete 60 minutes as an hour.'},
  {name:'Days',formula:'1 week = 7 days · 1 day = 24 hours',note:'Read dates from the correct weekday column.'}
]),

math3Chapter(6,'Geometry','ہندسہ','Pages 141–166',[
  math3Section('6.1','Points, Lines, Rays and Line Segments','A point marks a position. A line continues in both directions, a ray has one fixed endpoint and continues in one direction, and a line segment has two endpoints.', 'نقطہ جگہ بتاتا ہے۔ خط دونوں سمتوں میں، شعاع ایک سمت میں چلتی ہے اور قطعہ خط کے دو سرے ہوتے ہیں۔','lineRaySegment', ['Name a segment by its two endpoints.','A line has no endpoints; a ray has one endpoint.']),
  math3Section('6.2','Measure and Draw Line Segments','Place the ruler’s zero mark at one endpoint and read the number at the other endpoint. Draw straight segments to the requested centimetre length.','اسکیل کا صفر ایک سرے پر رکھیں اور دوسرے سرے پر عدد پڑھیں۔ مطلوبہ سینٹی میٹر لمبائی کا سیدھا قطعہ بنائیں۔','segmentRuler', ['Begin measuring at zero, not at the ruler edge.','Write the unit cm with the length.']),
  math3Section('6.3','2-D Shapes and Their Properties','A triangle has 3 sides. A quadrilateral has 4 sides and 4 vertices. A rectangle has equal opposite sides; a square has 4 equal sides. A circle has no straight sides or vertices.', 'مثلث کے ۳ ضلع اور چارضلعی کے ۴ ضلع اور ۴ کونے ہوتے ہیں۔ مربع کے چار برابر ضلع، مستطیل کے مقابل ضلع برابر ہوتے ہیں۔','shapeGallery', ['Count sides and vertices.','A circle has no vertex.']),
  math3Section('6.4','Perimeter and Symmetry','The perimeter is the total length around a closed shape. A line of symmetry divides a shape into matching halves.', 'محیط بند شکل کے اردگرد کی کل لمبائی ہے۔ خطِ تقارن شکل کو دو ایک جیسے حصوں میں تقسیم کرتا ہے۔','perimeterSymmetry', ['Add every outside side to find perimeter.','The two sides of a line of symmetry match.']),
  math3Section('6.5','Solid Shapes','Solid shapes are three-dimensional. A cube and cuboid have flat faces, edges and vertices; a cylinder, cone and sphere have curved surfaces.', 'ٹھوس شکلیں تین جہتی ہوتی ہیں۔ مکعب اور مستطیل منشور کے رخ، کنارے اور راس ہوتے ہیں؛ سلنڈر، مخروط اور کرہ میں خم دار سطحیں بھی ہیں۔','solidShapes', ['A face is a flat surface.','An edge is where faces meet; a vertex is a corner.'])
], [
  {id:'m3e1',title:'Perimeter of a Rectangle',problem:'Find the perimeter of a rectangle with length 8 cm and width 5 cm.',given:'Length = 8 cm; width = 5 cm',method:'Add the lengths of all four sides.',steps:['Opposite sides are equal: 8 cm, 5 cm, 8 cm, 5 cm.','8 + 5 + 8 + 5 = 26.'],answer:'26 cm'},
  {id:'m3e2',title:'Recognize a Solid',problem:'Name a solid with 6 equal square faces.',given:'6 square faces, all equal',method:'Match the face description to a solid shape.',steps:['A cube has 6 equal square faces.','It also has 12 equal edges and 8 vertices.'],answer:'Cube'}
], [{exercise:'6.1',title:'Unit 6 — Geometry Practice',problems:[
  math3Problem('Q1','How many endpoints does a line segment have?','A line segment is bounded by two endpoints.','2'),
  math3Problem('Q2','Find the perimeter of a square with side 6 cm.','Add its four equal sides: 6 + 6 + 6 + 6 = 24.','24 cm'),
  math3Problem('Q3','How many faces, edges and vertices does a cube have?','A cube has 6 faces, 12 edges and 8 vertices.','6 faces, 12 edges, 8 vertices'),
  math3Problem('Q4','What is a line of symmetry?','It divides a shape into two matching halves.','A line that divides a shape into equal matching halves')
]}], {
  mcqs:[
    {q:'A line segment has:',options:['no endpoints','one endpoint','two endpoints','three endpoints'],correct:2,exp:'A segment has two endpoints.'},
    {q:'A square has how many equal sides?',options:['2','3','4','5'],correct:2,exp:'All four sides of a square are equal.'},
    {q:'How many vertices does a cube have?',options:['6','8','10','12'],correct:1,exp:'A cube has 8 vertices.'},
    {q:'The distance around a shape is its:',options:['area','perimeter','vertex','face'],correct:1,exp:'Perimeter is the total distance around a closed shape.'}
  ],
  shortQuestions:[
    {q:'What is the difference between a line and a ray?',sol:'A line continues in both directions; a ray has one fixed endpoint and continues in one direction.'},
    {q:'How do you find the perimeter of a triangle?',sol:'Add the lengths of its three sides.'},
    {q:'Name a solid shape that has a curved surface and no vertices.',sol:'A sphere.'}
  ],
  longQuestions:[
    {q:'A rectangle is 9 cm long and 4 cm wide. Draw and label it, then find its perimeter.',marks:4,rubric:'Show opposite sides equal and add all four side lengths.',sol:'Draw a rectangle and label the long sides 9 cm and the short sides 4 cm. Perimeter = 9 + 4 + 9 + 4 = 26 cm.'},
    {q:'Describe the faces, edges and vertices of a cube and compare it with a cuboid.',marks:4,rubric:'State the counts for a cube and describe the cuboid’s rectangular faces.',sol:'A cube has 6 equal square faces, 12 equal edges and 8 vertices. A cuboid also has 6 faces, 12 edges and 8 vertices, but its faces are rectangles and its edge lengths need not all be equal.'}
  ]
}, [
  {name:'Perimeter',formula:'Perimeter = sum of all outside side lengths',note:'Use the same unit for every side.'},
  {name:'Rectangle',formula:'P = length + width + length + width',note:'Opposite sides of a rectangle are equal.'},
  {name:'Square',formula:'P = 4 × side length',note:'A square has four equal sides.'}
]),

math3Chapter(7,'Data Handling','اعداد و شمار','Pages 167–179',[
  math3Section('7.1','Sort Data with a Carroll Diagram','A Carroll diagram sorts objects using two yes/no properties. Put each item in the box whose row and column describe it.', 'کیرول خاکہ چیزوں کو دو ہاں/نہیں خصوصیات سے بانٹتا ہے۔ ہر چیز کو درست قطار اور ستون میں رکھیں۔','carrollDiagram', ['Read the row and column labels first.','Place each item in one matching box.']),
  math3Section('7.2','Tally Charts and Frequency','A tally chart records how often each answer occurs. Make one tally mark for each item; group every fifth mark across the previous four.', 'ٹَیلی چارٹ ہر جواب کی تعداد درج کرتا ہے۔ ہر چیز کے لیے ایک لکیر لگائیں؛ پانچویں لکیر پہلی چار کو کاٹتی ہے۔','tallyChart', ['Count each data item once.','Check the tally total against the number of items.']),
  math3Section('7.3','Picture Graphs','A picture graph uses symbols to show quantities. Its key tells how many objects each picture represents.', 'تصویری گراف مقدار دکھانے کے لیے نشان استعمال کرتا ہے۔ کنجی بتاتی ہے کہ ایک تصویر کتنی چیزوں کے برابر ہے۔','pictureGraph', ['Read the key before counting pictures.','Combine picture values to find a total.']),
  math3Section('7.4','Read and Compare Graphs','Read labels and keys carefully to answer questions about most, least, totals, and differences. Represent each category consistently.', 'زیادہ، کم، کل اور فرق معلوم کرنے کے لیے عنوانات اور کنجی غور سے پڑھیں۔ ہر قسم کو ایک ہی طریقے سے ظاہر کریں۔','barGraph', ['Compare bars or pictures using a common scale.','Add category counts to find the total.'])
], [
  {id:'m3e1',title:'Read a Picture Graph',problem:'A picture graph shows 1 picture = 2 students. Four pictures represent how many students?',given:'1 picture = 2 students; 4 pictures',method:'Multiply the picture count by the key value.',steps:['Each picture stands for 2 students.','4 × 2 = 8.'],answer:'8 students'},
  {id:'m3e2',title:'Find a Total',problem:'A tally chart records 7 red pencils and 5 blue pencils. How many pencils are recorded?',given:'7 red; 5 blue',method:'Add the category frequencies.',steps:['7 + 5 = 12.'],answer:'12 pencils'}
], [{exercise:'7.1',title:'Unit 7 — Data Handling Practice',problems:[
  math3Problem('Q1','A picture graph key says 1 picture = 3 cars. What do 5 pictures represent?','5 × 3 = 15.','15 cars'),
  math3Problem('Q2','A tally chart has 8 votes for apples and 6 for bananas. How many votes altogether?','8 + 6 = 14.','14 votes'),
  math3Problem('Q3','What information does a graph key provide?','It tells the value represented by each picture or symbol.','The value of each symbol'),
  math3Problem('Q4','There are 12 boys and 9 girls in a class. How many students are there?','12 + 9 = 21.','21 students')
]}], {
  mcqs:[
    {q:'A tally chart is used to:',options:['measure length','record counts','show time','draw a line'],correct:1,exp:'Tally marks record how often each item occurs.'},
    {q:'If 1 picture = 2 students, 6 pictures represent:',options:['8 students','10 students','12 students','14 students'],correct:2,exp:'6 × 2 = 12 students.'},
    {q:'A graph key tells us:',options:['the title only','what each symbol means','the date only','the biggest bar only'],correct:1,exp:'The key explains what each graph symbol stands for.'},
    {q:'Which is the least number?',options:['15','9','12','18'],correct:1,exp:'9 is the smallest value.'}
  ],
  shortQuestions:[
    {q:'What is a Carroll diagram used for?',sol:'It sorts items using two properties, commonly yes/no categories.'},
    {q:'How is the fifth tally mark usually drawn?',sol:'It is drawn across the first four tally marks.'},
    {q:'What should you read before counting symbols in a picture graph?',sol:'Read the key to find the value of one symbol.'}
  ],
  longQuestions:[
    {q:'A picture graph uses 1 picture = 2 students. Red group has 5 pictures and blue group has 3. Find the number in each group and the total.',marks:4,rubric:'Use the key for both groups and add the counts.',sol:'Red group: 5 × 2 = 10 students. Blue group: 3 × 2 = 6 students. Total: 10 + 6 = 16 students.'},
    {q:'Describe how to make a tally chart for favourite fruits and use it to find the most popular fruit.',marks:4,rubric:'Explain recording, grouping tallies in fives, and comparing totals.',sol:'Write each fruit as a category. Ask each student and add one tally mark beside the chosen fruit. Cross each fifth tally across the previous four. Count the marks in each category; the fruit with the greatest total is most popular.'}
  ]
}, [
  {name:'Picture graph total',formula:'Number of objects = number of pictures × key value',note:'Use the picture graph key to interpret each symbol.'},
  {name:'Data total',formula:'Total = sum of all category frequencies',note:'Check that each item has been counted once.'}
])
];
