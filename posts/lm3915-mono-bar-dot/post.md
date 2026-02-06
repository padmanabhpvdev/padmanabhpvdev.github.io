Adding a VU Meter (Volume Unit Meter) to your custom amplifier is like giving it a heartbeat. It provides that classic visual feedback that makes a DIY audio project look truly professional.

The **LM3915 (or LM3914/3916)** is a specialized **"Dot/Bar Display Driver"** that senses analog voltage levels and drives 10 LEDs. While the LM3914 is linear, the LM3915 is logarithmic (3dB per step), making it perfect for audio signals.

#### **Circuit Diagram**
![LM3915 Circuit Diagram](https://raw.githubusercontent.com/padmanabhpvdev/my-blog-contents/main/lm3915-mono-bar-dot/LM3915.jpg)

##### **Components Required**

| Parts | Label | Quantity |
| --- | --------------- | :---: |
| LM3914/3915/3916 | U1 | 1 |
| LED (3mm/5mm) | LED1-LED10 | 10 |
| 1.2K 1/4W Resistor | R1 | 1 |
| 10K Trimpot | R2 | 1 |
| 3 Pin Slide Switch | S1 | 1 |
| 1*2 Header Pins | P1, P2 | 2 |\\\

## ​

#### **How the circuit works ?**
- **The Brain**: The LM3915 contains an adjustable voltage reference and an accurate ten-step divider.
- **Signal Input**: The audio signal enters through P1 at pin 5 (SIG). As the music gets louder, the voltage rises, and the IC illuminates more LEDs in the chain.
- **Sensitivity Calibration**: The 10k pot (R2) is crucial. It allows you to adjust the "input floor" so the LEDs dance perfectly to your specific music source without being stuck at the bottom or hitting the top too easily.
- **Bar vs. Dot**: Pin 9 (MODE) is the magic pin. When connected to the supply voltage (via S1), you get a solid bar of light. When left open or grounded, you get a single moving dot, which consumes less power and looks very sleek.

#### **PCB Layout**
![PCB Front View](https://raw.githubusercontent.com/padmanabhpvdev/my-blog-contents/main/lm3915-mono-bar-dot/LM3915(front).jpg)

*Front View of the PCB*

![PCB Back View](https://raw.githubusercontent.com/padmanabhpvdev/my-blog-contents/main/lm3915-mono-bar-dot/LM3915(back).jpg)

*Back View of the PCB*