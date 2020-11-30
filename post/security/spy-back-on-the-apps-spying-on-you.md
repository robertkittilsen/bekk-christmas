---
post_year: 2020
post_day: 14
title: Spy back on the apps spying on you
image: https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2896&q=80
ingress: >-
  Social media applications spy on you, and probably send home some data about
  you every second you use the app. But what about the applications that have
  another business model? Do you trust that your bus pass app, developed by your
  municipal, or your smart vacuum cleaner is not sending your data back to the
  developers?

  Often, we have no idea, and until recently iOS-users had no good way of inspecting the traffic that was sent from their devices. 
links:
  - url: https://www.charlesproxy.com/documentation/ios/
    title: Charles Proxy Documentation iOS
  - url: https://www.vox.com/recode/2020/7/8/21311533/sdks-tracking-data-location
    title: The hidden trackers in your phone, explained
authors:
  - Didrik Sæther
---
The problem with owning an iOS-devices is that the information going between the device and a server has been hard to inspect. Prior to me discovering Charles, there were no good way to check what and how often data was transmitted from apps. Previous rigs for inspecting the traffic included doing MiTM-attacks from my router, and still then it was hard to inspect HTTPS traffic. Just watch how tedious [this guide](https://docs.telerik.com/fiddler/Configure-Fiddler/Tasks/ConfigureForiOS) from Fiddler is.
Another option for inspecting the traffic was to jailbreak the device. From a security standpoint you should not jailbreak or root your device, as [SANS and NorSIS](https://www.sans.org/sites/default/files/newsletters/ouch/issues/OUCH-201501_no.pdf) states. While jailbreaking the phone exposes you to a new world of cool applications, and tweaks, the security problems that follow are not worth it in my opinion. Most Norwegian banks will not allow the use of their apps, so you will in most cases lose functionality with jailbreak.

## There is a better way! 

Charles should be a familiar name when we talk about packet analyzers and proxy tools for debugging. What you might not know is that Charles also has a client for iOS. Proxyman as well as some smaller apps like Stream and Thor HTTP Sniffer has also been allowed in on the AppStore. 

How to get started spying on your applications.

1. Force close the app you want to spy on.
2. First time you open the Charles Proxy App, you will be prompted for permission to install VPN Configurations, press “allow”.
3. The app will start the proxy and should show that it is active.
4. Tap the gear icon in the top left. Then tap “SSL Proxying”.
5. At the bottom of the screen you will find instruction for or installing and trusting the Charles Proxy CA Certificate. Follow the instructions, install the Certificate and make sure that the Certificate Status shows “Trusted” when you come back in the Charles Proxy app.
6. Now toggle the “Enabled” switch in the SSL Proxying screen to on and go back (close the settings menu) to the main screen of the app.
7. Open the app you want to spy on, and let it load completely.
8. Switch back to the Charles Proxy app and tap on the Current Session.
9. You should see a lot of request, pick the endpoint you want to inspect, and tap on it.
10. Tap “Enable SSL Proxying”.
11. Go back to the main screen of the Charles and clear the Current Session by swiping to the left and tap “Clear”.
12. Force close the app we are spying on and open it again. Let it fully load.
13. Go back to Charles Proxy and tap on the new Current Session.
14. Look for the endpoint from step 9, and tap it.
15. You can now see the Response Body for all paths.

Some considerations when using this. 

* Many applications use multiple endpoints, and send your data all over the place, so finding the correct endpoint may be tricky.
* You will find endpoints, and access-tokens for many applications where developers thought that information was private because it is obfuscated/hidden. Use it with care, as some restrictions may apply. Some companies state that you need explicit consent for using their API’s even though they provide no security.