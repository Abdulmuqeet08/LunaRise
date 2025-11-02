import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { insightsService } from './insights.service';
import { IdentityService } from 'app/services/identity.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { EducationComponent } from './Education/education.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})

export class insightsComponent {
  constructor(public dialog: MatDialog) {}
  educationTopics = [
    {
      "title": "Menstrual Cycle",
      "image": "assets/images/cards/cycle.webp",
      "points": [
        "What is a menstrual cycle?",
        "Phases of the cycle",
        "Common symptoms"
      ],
      "answers": [
        // 1. What is a menstrual cycle?
        "<p><strong>1. What is a Menstrual Cycle?</strong></p><p>A <strong>menstrual cycle</strong> is a natural, monthly process that a person’s body undergoes to prepare for a potential pregnancy. It involves a series of hormonal changes that regulate the growth and release of eggs from the ovaries, as well as the thickening of the uterine lining in preparation for a fertilized egg. If fertilization doesn't occur, the lining is shed through menstruation, commonly known as a period. The cycle typically lasts between 21 to 35 days, though it can vary from person to person. The average cycle is 28 days. The menstrual cycle is divided into four main phases, each with its own set of hormonal shifts and bodily changes.</p>",
    
        // 2. Phases of the cycle
        "<p><strong>2. Phases of the Menstrual Cycle</strong></p><ol><li><strong>1:- Menstrual Phase (Days 1–5)</strong><ul><li><strong>-> What Happens:</strong> This phase begins with the first day of menstruation (your period). The lining of the uterus, which had thickened in preparation for pregnancy, is shed as blood and tissue. Menstrual bleeding lasts anywhere from 3 to 7 days.</li><li><strong>-> Hormonal Changes:</strong> During this phase, both estrogen and progesterone levels are low.</li></ul></li><li><strong>2:- Follicular Phase (Days 1–13)</strong><ul><li><strong>-> What Happens:</strong> The follicular phase begins on the first day of your period and ends with ovulation. Follicles in the ovaries mature, and one becomes the dominant follicle that will release an egg.</li><li><strong>-> Hormonal Changes:</strong> Estrogen levels rise, stimulating the growth of the eggs and the thickening of the uterine lining to prepare for a possible pregnancy.</li></ul></li><li><strong>3:- Ovulation Phase (Day 14, around mid-cycle)</strong><ul><li><strong>-> What Happens:</strong> Ovulation is the release of a mature egg from the ovary into the fallopian tube. This is the most fertile period in the cycle, and pregnancy is most likely to occur if sperm is present during this time.</li><li><strong>-> Hormonal Changes:</strong> A surge in luteinizing hormone (LH) and follicle-stimulating hormone (FSH) triggers the release of the egg. Estrogen levels peak right before ovulation.</li></ul></li><li><strong>4:- Luteal Phase (Days 15–28)</strong><ul><li><strong>-> What Happens:</strong> After ovulation, the empty follicle turns into the corpus luteum, which secretes progesterone to maintain the uterine lining for potential pregnancy. If fertilization doesn't occur, the corpus luteum disintegrates, progesterone levels drop, and the uterine lining is eventually shed during menstruation.</li><li><strong>-> Hormonal Changes:</strong> Progesterone rises to prepare the body for pregnancy, and if pregnancy does not occur, both progesterone and estrogen decrease, leading to the start of a new cycle.</li></ul></li></ol>",
    
        // 3. Common symptoms
        "<p><strong>3. Common Symptoms During the Menstrual Cycle</strong></p><p>While each person’s experience may vary, common symptoms associated with the menstrual cycle include:</p><ul><li><strong>1:- Menstrual Phase (Period Symptoms):</strong><ul><li><strong>-> Cramps:</strong> Caused by the contraction of the uterine muscles as the lining is shed.</li><li><strong>-> Fatigue:</strong> Hormonal fluctuations can lead to tiredness or low energy.</li><li><strong>-> Bloating and Water Retention:</strong> Hormonal changes can cause the body to hold onto extra fluid.</li><li><strong>-> Mood Swings or Irritability:</strong> Changes in estrogen and progesterone levels can affect mood.</li></ul></li><li><strong>2:- Follicular Phase Symptoms:</strong><ul><li><strong>-> Increased Energy:</strong> As estrogen levels rise, some individuals feel more energetic.</li><li><strong>-> Improved Skin:</strong> Rising estrogen may contribute to clearer skin for some people.</li></ul></li><li><strong>3:- Ovulation Symptoms:</strong><ul><li><strong>-> Pain or Discomfort:</strong> Some people experience mild pelvic pain known as mittelschmerz, a sign of ovulation.</li><li><strong>-> Increased Libido:</strong> Due to hormonal changes, some people may feel an increase in sexual desire during this phase.</li></ul></li><li><strong>4:- Luteal Phase Symptoms:</strong><ul><li><strong>-> PMS (Premenstrual Syndrome):</strong> Symptoms include irritability, fatigue, bloating, breast tenderness, mood swings, and food cravings.</li><li><strong>-> Tender Breasts:</strong> Hormonal changes can cause swelling and tenderness in the breasts.</li><li><strong>-> Constipation or Diarrhea:</strong> Some individuals may experience gastrointestinal discomfort.</li></ul></li></ul>"
      ]
    },
    
    
    
    {
      title: 'Period Products',
      image: 'assets/images/cards/cups.jpeg',
      points: [
        'Pads, Tampons, Cups',
        'How to use them',
        'Eco-friendly options'
      ],
      answers: [
        `<h3>1. Pads, Tampons, Cups</h3>
        <ul>
          <li><strong>Pads:</strong> Pads are absorbent materials that are worn inside underwear to collect menstrual blood. They are typically made from cotton, bamboo, or synthetic fibers, and come in various sizes and absorbency levels. Pads are available in different forms such as:
            <ul>
              <li><strong>Regular pads:</strong> For light to medium flow.</li>
              <li><strong>Overnight pads:</strong> Designed for heavier flow, offering extra length and absorbency.</li>
              <li><strong>Pantyliners:</strong> Thinner and lighter, used for very light flow or daily protection.</li>
            </ul>
          </li>
          <li><strong>Tampons:</strong> Tampons are small cylindrical products made of absorbent material that are inserted into the vagina to absorb menstrual blood internally. They come with or without an applicator for easier insertion. Tampons typically have a string at the bottom, which helps remove them once they are full.</li>
          <li><strong>Menstrual Cups:</strong> Menstrual cups are small, flexible, bell-shaped devices made of medical-grade silicone or rubber. These cups are inserted into the vagina to collect menstrual blood rather than absorb it.</li>
        </ul>`,
    
        `<h3>2. How to Use Them</h3>
        <ul>
          <li><strong>Pads:</strong> Pads have an adhesive strip on the bottom that sticks to the inside of your underwear. They absorb menstrual blood as it exits the body, and you change them every 4–8 hours, depending on flow.</li>
          <li><strong>Tampons:</strong> When inserted into the vagina, the tampon absorbs menstrual blood before it leaves the body. They are available in various absorbency levels (light, regular, super, etc.), which correspond to the flow of your period. They need to be changed every 4–8 hours to prevent toxic shock syndrome (TSS), a rare but serious bacterial infection.</li>
          <li><strong>Menstrual Cups:</strong> The cup forms a seal inside the vagina and collects the menstrual blood. After 4–12 hours (depending on flow), you remove the cup, empty it, rinse it out, and reinsert it. Menstrual cups can be reused for several years with proper cleaning and care, making them an eco-friendly and cost-effective option.</li>
        </ul>`,
    
        `<h3>3. Eco-friendly Options</h3>
        <ul>
          <li><strong>Reusable Cloth Pads:</strong> Washable and soft on skin.</li>
          <li><strong>Menstrual Cups:</strong> Reusable for years, eco-friendly.</li>
          <li><strong>Period Underwear:</strong> Absorbs flow, reusable.</li>
          <li><strong>Biodegradable Products:</strong> Made from organic materials.</li>
        </ul>`
      ]
    },
    
    
    
    {
      title: 'PMS & Symptoms',
      image: 'assets/images/cards/pms.webp',
      points: [
        'Physical & emotional changes',
        'Tips for relief',
        'When to see a doctor'
      ],
      answers: [
        `<h3>1. Physical & Emotional Changes During Menstruation</h3>
        <ul>
          <li><strong>Hormonal Shifts:</strong> Fluctuations in estrogen and progesterone cause bloating, fatigue, and headaches.</li>
          <li><strong>Cramps:</strong> The uterus contracts to shed its lining, causing pain in the abdomen.</li>
          <li><strong>Breast Tenderness:</strong> Increased estrogen can cause swelling and soreness in the breasts.</li>
          <li><strong>Bloating:</strong> Hormonal changes lead to fluid retention, causing a feeling of heaviness.</li>
          <li><strong>Fatigue:</strong> Blood loss and hormonal changes can leave you feeling tired and low on energy.</li>
          <li><strong>Skin Changes:</strong> Acne may flare up due to hormonal shifts before menstruation.</li>
          <li><strong>Digestive Changes:</strong> Some experience diarrhea or constipation due to hormone effects on the digestive system.</li>
          <li><strong>Mood Swings:</strong> Estrogen levels drop before menstruation, causing irritability and emotional shifts.</li>
          <li><strong>PMDD:</strong> Some may experience severe anxiety or depression, a condition called premenstrual dysphoric disorder.</li>
          <li><strong>Cravings:</strong> Hormonal changes make salty, sweet, or comfort foods more appealing.</li>
        </ul>`,
    
        `<h3>2. Tips for Relief</h3>
        <ul>
          <li><strong>Heat Therapy:</strong> Use a heating pad for cramps or try a warm bath.</li>
          <li><strong>Exercise:</strong> Light activities like walking or yoga can ease cramps and improve mood.</li>
          <li><strong>Pain Relief:</strong> Over-the-counter medications like ibuprofen can help reduce pain.</li>
          <li><strong>Hydration and Diet:</strong> Drink water and eat nutrient-rich foods to combat bloating and low energy.</li>
          <li><strong>Rest:</strong> Make sure to get adequate sleep and take breaks to avoid fatigue.</li>
          <li><strong>Supplements:</strong> Magnesium or omega-3 can help reduce cramps and mood swings.</li>
          <li><strong>Stress Management:</strong> Practice deep breathing or meditation to manage mood swings.</li>
          <li><strong>Talk it Out:</strong> Discussing your feelings with someone or journaling can help process emotions.</li>
          <li><strong>Self-Care:</strong> Indulge in relaxing activities like reading, baths, or watching a favorite show.</li>
          <li><strong>Limit Caffeine/Sugar:</strong> Reduce intake to prevent irritability and anxiety.</li>
        </ul>`,
    
        `<h3>3. When to See a Doctor</h3>
        <ul>
          <li><strong>Severe Pain:</strong> Pain that doesn't respond to painkillers may indicate conditions like endometriosis or fibroids.</li>
          <li><strong>Heavy Bleeding:</strong> Soaking through a pad every hour or passing large clots could be a sign of concern.</li>
          <li><strong>Irregular Periods:</strong> Cycles longer than 35 days or completely missed periods may need evaluation.</li>
          <li><strong>Extreme Fatigue or Dizziness:</strong> Especially when combined with heavy bleeding, it could indicate anemia.</li>
          <li><strong>Severe Emotional Symptoms:</strong> If symptoms like PMDD interfere with daily life, medical support is important.</li>
          <li><strong>Unusual Symptoms:</strong> Fever or pain during sex could signal infections or other health issues.</li>
        </ul>`
      ]
    },
      {
        "title": "Menstruation Tips: Diet, Exercise & Mental Health",
        "image": "assets/images/cards/health.jpg",
        "points": [
          "Foods to Eat & Avoid",
          "Exercise and Periods",
          "Mental Health Tips"
        ],
        "answers": [
          `<h3>1. Foods to Eat & Avoid</h3>
          <h4>Foods to Eat:</h4>
          <ul>
            <li><strong>Iron-rich foods:</strong> Spinach, lean meats, and beans help replenish blood.</li>
            <li><strong>Complex carbs:</strong> Whole grains, sweet potatoes, and oats prevent bloating and stabilize energy.</li>
            <li><strong>Omega-3 fatty acids:</strong> Found in salmon, flax seeds, and walnuts, they reduce inflammation and cramps.</li>
            <li><strong>Water:</strong> Stay hydrated to reduce bloating and fatigue.</li>
          </ul>
          <h4>Foods to Avoid:</h4>
          <ul>
            <li><strong>Salty foods:</strong> Avoid chips and processed foods to reduce bloating.</li>
            <li><strong>Caffeine:</strong> It can worsen anxiety, irritability, and disrupt sleep.</li>
            <li><strong>Sugary foods:</strong> These cause energy crashes and worsen mood swings.</li>
            <li><strong>Alcohol:</strong> It dehydrates and can worsen cramps or fatigue.</li>
          </ul>`,
      
          `<h3>2. Exercise and Periods</h3>
          <h4>Benefits of Exercise:</h4>
          <ul>
            <li><strong>Reduces cramps:</strong> Light activities like walking or yoga reduce uterine contractions and improve circulation.</li>
            <li><strong>Improves mood:</strong> Exercise releases endorphins, which boost mood and reduce stress.</li>
            <li><strong>Boosts energy:</strong> Staying active prevents period-related fatigue.</li>
          </ul>
          <h4>What to Keep in Mind:</h4>
          <ul>
            <li><strong>Listen to your body:</strong> Take it easy if you’re feeling extra tired or in pain.</li>
            <li><strong>Avoid intense workouts:</strong> If experiencing heavy flow or intense cramps, opt for gentler activities like stretching.</li>
          </ul>`,
      
          `<h3>3. Mental Health Tips During Your Period</h3>
          <ul>
            <li><strong>Mindfulness:</strong> Practice meditation or deep breathing exercises to manage stress and anxiety.</li>
            <li><strong>Self-compassion:</strong> It’s okay to feel emotional or tired—be kind to yourself.</li>
            <li><strong>Social Support:</strong> Talk to friends or family for emotional support.</li>
            <li><strong>Rest and Recovery:</strong> Prioritize sleep to help balance mood swings and reduce stress.</li>
            <li><strong>Stay Active:</strong> Light exercise can boost mood and help manage stress.</li>
          </ul>`
        ]
      },
      {
        "title": "Menstrual Hygiene Tips",
        "image": "assets/images/cards/hygiene.webp",
        "points": [
          "Do's and Don'ts",
          "Cleanliness Tips",
          "Public Restroom Hygiene"
        ],
        "answers": [
          `<h3>1. Do's and Don'ts</h3>
          <h4>Do's:</h4>
          <ul>
            <li><strong>Change products regularly:</strong> Change pads or tampons every 4–8 hours to maintain hygiene.</li>
            <li><strong>Stay hydrated:</strong> Drink plenty of water to reduce bloating and improve overall health.</li>
            <li><strong>Use clean hands:</strong> Always wash your hands before and after handling menstrual products.</li>
            <li><strong>Wear breathable fabrics:</strong> Choose cotton underwear to allow air circulation and reduce irritation.</li>
          </ul>
          <h4>Don'ts:</h4>
          <ul>
            <li><strong>Don’t use scented products:</strong> Avoid scented pads or tampons, as they can irritate sensitive skin.</li>
            <li><strong>Don’t wear products for too long:</strong> Avoid wearing pads or tampons for over 8 hours to reduce risk of infection.</li>
            <li><strong>Don’t share products:</strong> Never share menstrual products to avoid cross-contamination.</li>
          </ul>`,
      
          `<h3>2. Cleanliness Tips</h3>
          <ul>
            <li><strong>Change frequently:</strong> Even if you don’t feel your product is full, change it regularly to prevent bacteria buildup.</li>
            <li><strong>Clean products properly:</strong> Wash reusable menstrual products like cups or cloth pads with warm water and mild soap.</li>
            <li><strong>Keep the area dry:</strong> After changing pads or tampons, wipe the genital area with unscented wipes or water to stay clean and dry.</li>
            <li><strong>Shower daily:</strong> Regular showers help maintain overall hygiene and reduce the risk of infections.</li>
          </ul>`,
      
          `<h3>3. Public Restroom Hygiene</h3>
          <ul>
            <li><strong>Bring supplies:</strong> Always carry extra pads, tampons, or menstrual cups in your bag.</li>
            <li><strong>Use toilet paper:</strong> Line the toilet seat with toilet paper if you prefer not to sit directly on it.</li>
            <li><strong>Dispose properly:</strong> Wrap used products in toilet paper or a disposal bag and place them in a bin (not the toilet).</li>
            <li><strong>Wash hands:</strong> Always wash your hands after using the restroom, especially after changing menstrual products.</li>
          </ul>`
        ]
      },
      
      {
        "title": "Period Myths & Facts",
        "image": "assets/images/cards/myths.webp",
        "points": [
          "Busting Period Taboos",
          "Cultural Perspectives",
          "Scientific Explanations"
        ],
        "answers": [
          `<h3>1. Busting Period Taboos</h3>
          <ul>
            <li><strong>Periods are not dirty:</strong> Menstruation is a natural biological process, not something to be ashamed of.</li>
            <li><strong>Menstruation doesn't stop life:</strong> People on their period can exercise, work, and live normally—no need for "resting" or hiding away.</li>
            <li><strong>Menstrual products are safe:</strong> Modern pads, tampons, and cups are designed to be hygienic and comfortable when used properly.</li>
            <li><strong>Not everyone has severe symptoms:</strong> Many people experience little to no discomfort, and every person’s period is different.</li>
          </ul>`,
      
          `<h3>2. Cultural Perspectives</h3>
          <ul>
            <li><strong>Varied beliefs:</strong> Different cultures have unique customs, from restrictions during menstruation to celebrations of menstruation as a rite of passage.</li>
            <li><strong>Stigma and silence:</strong> In many societies, menstruation is still a taboo topic, often leading to shame, isolation, and lack of education.</li>
            <li><strong>Empowerment and activism:</strong> In some cultures, menstruation is embraced and celebrated, with movements promoting period positivity and access to menstrual products.</li>
          </ul>`,
      
          `<h3>3. Scientific Explanations</h3>
          <ul>
            <li><strong>Hormonal cycle:</strong> The menstrual cycle is regulated by hormones like estrogen and progesterone, which control ovulation, menstruation, and other bodily changes.</li>
            <li><strong>Period symptoms:</strong> Cramps, bloating, mood swings, and fatigue are all linked to the body’s hormonal fluctuations during the menstrual cycle.</li>
            <li><strong>Why we menstruate:</strong> Menstruation occurs when the body sheds the lining of the uterus, a process that is essential for reproduction.</li>
          </ul>`
        ]
      },
      {
          "title": "PCOD & PCOS Myths & Facts",
          "image": "assets/images/cards/pcod.jpg",
          "points": [
            "Busting PCOD/PCOS Myths",
            "Symptoms & Diagnosis",
            "Treatment Options"
          ],
          "answers": [
            `<h3>1. Busting PCOD/PCOS Myths</h3>
            <ul>
              <li><strong>PCOD and PCOS are the same:</strong> While both involve cysts on ovaries, PCOS is a more complex hormonal disorder affecting metabolism and insulin levels.</li>
              <li><strong>Only overweight women get PCOS:</strong> PCOS can affect women of all body types, though it's more common in those with excess weight.</li>
              <li><strong>PCOS makes you infertile:</strong> Many women with PCOS can conceive with medical help, and infertility is not guaranteed.</li>
              <li><strong>PCOS symptoms are the same for everyone:</strong> Symptoms vary widely, including irregular periods, acne, excessive hair growth, and weight gain.</li>
            </ul>`,
            `<h3>2. Symptoms & Diagnosis</h3>
            <ul>
              <li><strong>Irregular periods:</strong> Most common sign of PCOS/PCOD, often leading to fewer or missed periods.</li>
              <li><strong>Excessive hair growth (hirsutism):</strong> Due to elevated levels of androgens, some women experience increased facial and body hair.</li>
              <li><strong>Acne and oily skin:</strong> Hormonal imbalances contribute to acne, especially around the chin and jawline.</li>
              <li><strong>Ultrasound diagnosis:</strong> Doctors often use an ultrasound to check for cysts on the ovaries and other symptoms of PCOS.</li>
            </ul>`,
            `<h3>3. Treatment Options</h3>
            <ul>
              <li><strong>Medications:</strong> Birth control pills can regulate periods, while anti-androgens help with hair growth and acne.</li>
              <li><strong>Insulin-sensitizers:</strong> Metformin is often used to address insulin resistance in women with PCOS.</li>
              <li><strong>Lifestyle changes:</strong> Diet and exercise are essential for managing weight and improving insulin sensitivity.</li>
              <li><strong>Fertility treatments:</strong> Clomiphene and other fertility drugs can help women with PCOS conceive.</li>
            </ul>`
          ]
        },
        {
          "title": "PCOS: Lifestyle & Management",
          "image": "assets/images/cards/pcos.jpg",
          "points": [
            "Diet Tips for PCOS",
            "Exercise & PCOS",
            "Emotional Well-being"
          ],
          "answers": [
            `<h3>1. Diet Tips for PCOS</h3>
            <ul>
              <li><strong>Low GI foods:</strong> Focus on foods that don't spike blood sugar, like whole grains, legumes, and vegetables.</li>
              <li><strong>Protein-rich foods:</strong> Include lean meats, eggs, beans, and nuts to regulate hormones and improve metabolism.</li>
              <li><strong>Avoid refined carbs and sugar:</strong> They can increase insulin resistance, worsening PCOS symptoms.</li>
              <li><strong>Anti-inflammatory foods:</strong> Omega-3-rich foods like salmon and flax seeds can help reduce inflammation.</li>
            </ul>`,
            `<h3>2. Exercise & PCOS</h3>
            <ul>
              <li><strong>Regular physical activity:</strong> Aim for at least 30 minutes of moderate exercise like walking or cycling to help regulate weight and blood sugar.</li>
              <li><strong>Strength training:</strong> Building muscle mass helps improve insulin sensitivity and boosts metabolism.</li>
              <li><strong>Yoga & stress reduction:</strong> Yoga can reduce stress and balance hormones, especially for women with PCOS.</li>
            </ul>`,
            `<h3>3. Emotional Well-being</h3>
            <ul>
              <li><strong>Manage stress:</strong> Practices like mindfulness, meditation, and deep breathing can help reduce emotional stress related to PCOS.</li>
              <li><strong>Seek support:</strong> Talking to others who have PCOS can help reduce feelings of isolation.</li>
              <li><strong>Therapy and counseling:</strong> Consider professional help to address emotional and psychological challenges that often accompany PCOS.</li>
            </ul>`
          ]
        }
      ];      

  openDialog(topic: any) {
    this.dialog.open(EducationComponent, {
      data: topic,
      width: '900px'
    });
  }
}
