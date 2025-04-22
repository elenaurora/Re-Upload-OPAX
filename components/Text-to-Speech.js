import React from 'react'
import { Button } from 'react-native'
import Tts from 'react-native-tts'
 
Tts.setDefaultLanguage('it-GB')
Tts.setDefaultVoice('com.apple.ttsbundle.Daniel-compact')
 
const NativeSpeech = () => (
 <Button
   title="Audio"
   onPress={() => Tts.speak('Introduzione, Visita la Piazza')}
 />
)
 
export default NativeSpeech