# studywithme.ai

I have always struggled with reading – words take much time to form, deciphering symbols and patterns makes me feel like I&#39;m decoding the German Enigma messages with nothing more than a pen and paper. I am _Dyslexic_.

However, Dyslexia is _not me_. Fortunately (or unfortunately, if you ask my girlfriend), I am gifted with my father&#39;s stubbornness – I refuse to be defeated by my learning difficulty. I read slowly? I give myself more time. It&#39;s hard to read? I read it twice.

As you probably imagined, this is incredibly inefficient. But I stubbornly burn hours and hours a day reading, and re-reading, over and over again.

Until one fine day, I chanced upon two videos by Ali Abdaal which, as cliché as it may sound, _blew my mind_. He shared two evidence-based study strategies: [Active Recall](https://www.youtube.com/watch?v=ukLnPbIffxE&amp;t=), and [Spaced Repetition](https://www.youtube.com/watch?v=Z-zNHHpXoMM).

I religiously followed his advice; I immediately bought Anki and sought to create magical flashcards that were supposed to help me study better. But there was a problem, _Anki sucked._ It&#39;s user experience was terrible; I was spending more time figuring out how to use Anki than actually studying.

Frustrated, but still religiously devoted to the strategies, I sought out other solutions.
> AnkiApp: I didn&#39;t get past the login page, the app kept crashing out  
SuperMemo: No support for formatting mathematical equations  
Quizlet: Too focused on learning languages

I had enough! This exercise in futility made me resort to using an Excel spreadsheet to study for the past semester.

<img src="/mid-assignment%20submission/Images/Tedious%20Spreadsheet.png" alt="Tedious Spreadsheet" width="65%">

This simple spreadsheet was a paradigm shift in how I studied. I stopped re-reading the lecture notes. Instead, I read it once, made a list of questions, and constantly quizzed myself, recording how I performed for each question. If I found it challenging, I would test myself again the next day. If it was easy, I would test myself again in a longer duration in order to combat the forgetting curve.

But it was incredibly _tedious_. I had to manually calculate when was the next date to quiz myself, it was incredibly annoying to type my answer as I had to insert a new row and then delete it after. Inserting pictures ruined the spreadsheet&#39;s formatting, formatting code was unfeasible: I couldn&#39;t multi-color a single cell.

Enough! Nothing I tried has been satisfactory. If an adequate solution does not yet exist, I will create it myself!

## Execution Plan

To make studywithme.ai simple to use on any screen size, I am adopting a minimalistic theme and a mobile-first development approach.

I based the design on Apple&#39;s Reminders and drew a sketch.

<img src="/mid-assignment%20submission/Images/Sketch%20-%20Main%20%26%20Question.png" alt="Main & Question Sketch" width="65%">
<img src="/mid-assignment%20submission/Images/Sketch%20-%20Study%20Now.png" alt="Study Now Sketch" width="50%">
  
Then, I mocked up a wireframe using Sketch App.

<img src="/mid-assignment%20submission/Images/Mockup%20-%20Main%20%26%20Question.svg" alt="Main & Question Mockup" width="75%">
<img src="/mid-assignment%20submission/Images/Mockup%20-%20Study%20Now.svg" alt="Study Now Mockup" width="50%">
<img src="/mid-assignment%20submission/Images/Mockup%20-%20Right%20Click.svg" alt="Right Click Mockup" width="20%">

To focus on what really matters, I adopted [Li Hongyi&#39;s methodology](https://youtu.be/PcmO-5VPaOE?t=724).
> P1 – If not done we don&#39;t launch  
P2 – Important but can launch without if needed  
P3 – Nice to have

| Feature | Priority |
| --- | --- |
| Allow users to create an account | P1 |
| ~~Create, Read, Update &amp; Delete Subject, Subject&#39;s Topics, Topic&#39;s Questions &amp; Question&#39;s Answer~~ | P1 |
| Allow users to rearrange their Nav Bar | P1 |
| Allow users to rearrange Questions in a Topic | P1 
| ~~Begin quiz on a Subject / Topic~~ | P1 |
| Provide an optional answer pad~~ | P1 |
| ~~Format text e.g. bold, italics, code, tables, (un)ordered lists~~ | P1 |
| ~~Rate how difficult a Question is, and test the user again in x hours based on his rating~~ | P1 |
| Allow users to archive Subjects / Topics | P1 |
| Auto-backup Database | P2 |
| Add a Light Theme | P2 |
| Adjust the time before retesting a question by Topic / Subject | P2 |
| Inform user they have x questions that they need to revise daily via Push Notifications / Telegram / Email | P2 |
| Create a Landing Page | P2 |
| ~~Mobile-ready~~ | P2 |
| Tag topics to a color theme | P2 |
| Undo / Redo | P2 |
| Search for a Subject / Topic / Question | P2 |
| ~~Keyboard shortcuts~~ | P2 |
| Import decks from other apps like Anki / Excel | P3 |
| Support handwriting | P3 |
| Allow users to share their subjects with others on a Marketplace | P3 |
| Allow users to leave reviews on a Subject in a Marketplace | P3 |
| Help users to create good questions by detecting bad questions (NLP) and offering guides in a tooltip | P3 |
| Allow users to charge others for access to their subjects | P3 |
| Create a community forum to allow people to discuss decks | P3 |

Name: Koh Zheng Qiang Shawn  
Matriculation Number: A0185892L
