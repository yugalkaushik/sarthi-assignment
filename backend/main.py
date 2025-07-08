from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import re

app = FastAPI(title="Emotion Reflection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class TextInput(BaseModel):
    text: str

emotion_data = {
    "Happy": {
        "description": "You seem to be expressing joy or contentment",
        "color": "#FFD700",
        "keywords": ["happy", "joy", "delighted", "pleased", "cheerful", "glad", "content", "thrilled", "wonderful", "great", "amazing", "good", "positive", "excellent"]
    },
    "Sad": {
        "description": "There's a sense of sadness or disappointment in your words",
        "color": "#6495ED",
        "keywords": ["sad", "unhappy", "depressed", "down", "miserable", "disappointed", "upset", "blue", "heartbroken", "grief", "sorrow", "crying", "tears", "miss", "regret"]
    },
    "Angry": {
        "description": "Your text indicates frustration or anger",
        "color": "#FF6347",
        "keywords": ["angry", "mad", "furious", "outraged", "annoyed", "irritated", "frustrated", "infuriated", "rage", "hate", "dislike", "resent", "bitter", "hostile"]
    },
    "Anxious": {
        "description": "I detect worry or nervousness in your reflection",
        "color": "#9370DB",
        "keywords": ["anxious", "worried", "nervous", "tense", "uneasy", "concerned", "stressed", "panic", "fear", "dread", "apprehension", "restless", "jittery", "interview", "test", "exam"]
    },
    "Excited": {
        "description": "You appear to be enthusiastic or eager about something",
        "color": "#FF69B4",
        "keywords": ["excited", "thrilled", "eager", "enthusiastic", "looking forward", "can't wait", "anticipate", "pumped", "psyched", "stoked"]
    },
    "Fearful": {
        "description": "There's a sense of fear or apprehension in your words",
        "color": "#708090",
        "keywords": ["afraid", "scared", "frightened", "terrified", "alarmed", "horror", "dread", "panic", "phobia", "threat", "danger"]
    },
    "Surprised": {
        "description": "You seem astonished or taken aback",
        "color": "#00CED1",
        "keywords": ["surprised", "shocked", "astonished", "amazed", "stunned", "startled", "unexpected", "wow", "unbelievable", "incredible"]
    },
    "Confused": {
        "description": "I sense uncertainty or puzzlement in your text",
        "color": "#DDA0DD",
        "keywords": ["confused", "puzzled", "uncertain", "unsure", "perplexed", "don't understand", "lost", "bewildered", "unclear", "ambiguous", "complicated", "mixed"]
    },
    "Grateful": {
        "description": "You're expressing thankfulness or appreciation",
        "color": "#32CD32",
        "keywords": ["grateful", "thankful", "appreciate", "blessed", "fortunate", "lucky", "indebted", "thanks", "thank you"]
    },
    "Confident": {
        "description": "There's a tone of self-assurance in your reflection",
        "color": "#FFA500",
        "keywords": ["confident", "sure", "certain", "positive", "convinced", "believe", "faith", "trust", "assurance", "determined"]
    },
    "Sympathetic": {
        "description": "You're expressing concern or compassion for someone else",
        "color": "#BA55D3",
        "keywords": ["sorry", "sympathy", "empathy", "concerned", "care", "compassion", "feel bad", "condolences", "apologize", "hope", "get well", "accident", "hurt", "injured"]
    },
    "Disappointed": {
        "description": "You seem to be expressing disappointment or letdown",
        "color": "#778899",
        "keywords": ["disappointed", "letdown", "failed", "unmet", "expectations", "hoped for", "wished", "expected", "anticipated"]
    }
}

@app.get("/")
async def root():
    return {"message": "Welcome to the Emotion Reflection API"}

@app.post("/analyze")
async def analyze_emotion(input_data: TextInput):
    if not input_data.text.strip():
        raise HTTPException(status_code=400, detail="Text input cannot be empty")
    
    text = input_data.text.lower()
    
    if any(word in text for word in ["accident", "crash", "hospital", "injury", "injured", "hurt"]):
        if "friend" in text or "family" in text or "loved" in text:
            selected_emotion = "Sympathetic"
            confidence = round(random.uniform(0.85, 0.92), 2)
            emotion_info = emotion_data[selected_emotion]
            return {
                "emotion": selected_emotion,
                "description": emotion_info["description"],
                "confidence": confidence,
                "color": emotion_info["color"],
                "matched": True
            }
    
    emotion_scores = {}
    
    for emotion_name, data in emotion_data.items():
        score = 0
        for keyword in data["keywords"]:
            count = len(re.findall(r'\b' + re.escape(keyword) + r'\b', text))
            if count > 0:
                score += count
        
        emotion_scores[emotion_name] = score
    
    max_score = max(emotion_scores.values()) if emotion_scores else 0
    
    if max_score > 0:
        top_emotions = [emotion for emotion, score in emotion_scores.items() if score == max_score]
        selected_emotion = random.choice(top_emotions)
        
        base_confidence = min(0.7 + (max_score * 0.05), 0.95)
        confidence = round(random.uniform(base_confidence, base_confidence + 0.03), 2)
    else:
        selected_emotion = "Confused"
        confidence = round(random.uniform(0.6, 0.7), 2)
    
    emotion_info = emotion_data[selected_emotion]
    
    return {
        "emotion": selected_emotion,
        "description": emotion_info["description"],
        "confidence": confidence,
        "color": emotion_info["color"],
        "matched": max_score > 0
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
