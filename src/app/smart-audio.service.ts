import { Injectable } from "@angular/core";
import { NativeAudio } from "@ionic-native/native-audio";

@Injectable({
  providedIn: "root"
})
export class SmartAudioService {
  sounds: any = [];

  preload(key, asset) {
    let audio = {
      key: key,
      asset: asset
    };

    this.sounds.push(audio);
  }

  play(key) {
    let audio = this.sounds.find(sound => {
      return sound.key === key;
    });
    let audioAsset = new Audio(audio.asset);
    audioAsset.play();
  }
}
