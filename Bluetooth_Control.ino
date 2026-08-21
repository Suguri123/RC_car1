#include <SoftwareSerial.h>

#define MOTOR1_IA 11
#define MOTOR1_IB 10
#define MOTOR2_IA 5
#define MOTOR2_IB 6

// Bluetooth 모듈 핀 설정
#define BT_TX 7
#define BT_RX 4

// Bluetooth 소프트웨어 시리얼 초기화
SoftwareSerial bluetooth(BT_RX, BT_TX);

void setup() {
  // 모터 제어 핀 설정
  pinMode(MOTOR1_IA, OUTPUT);
  pinMode(MOTOR1_IB, OUTPUT);
  pinMode(MOTOR2_IA, OUTPUT);
  pinMode(MOTOR2_IB, OUTPUT);

  // Bluetooth 초기화
  bluetooth.begin(9600);
  Serial.begin(9600);

  Serial.println("Bluetooth 제어 준비 완료. 스마트폰에서 명령을 전송하세요.");
}

void loop() {
  // Bluetooth 데이터가 들어왔는지 확인
  if (bluetooth.available()) {
    char command = bluetooth.read(); // 명령어 읽기
    Serial.print("수신된 명령: ");
    Serial.println(command); // 명령어를 시리얼 모니터에 출력 (디버깅용)

    // 명령어에 따른 동작 수행
    switch (command) {
      case 'F': // 전진
        moveForward();
        break;
      case 'R': // 우회전
        turnRight();
        break;
      case 'L': // 좌회전
        turnLeft();
        break;
      case 'B': // 후진
        moveBackward();
        break;
      default:
        stopMotors(); // 알 수 없는 명령어가 들어오면 정지
        break;
    }
  }
}

// 전진
void moveForward() {
  digitalWrite(MOTOR1_IA, HIGH);
  digitalWrite(MOTOR1_IB, LOW);
  digitalWrite(MOTOR2_IA, HIGH);
  digitalWrite(MOTOR2_IB, LOW);
  Serial.println("전진 중...");
}

// 후진
void moveBackward() {
  digitalWrite(MOTOR1_IA, LOW);
  digitalWrite(MOTOR1_IB, HIGH);
  digitalWrite(MOTOR2_IA, LOW);
  digitalWrite(MOTOR2_IB, HIGH);
  Serial.println("후진 중...");
}

// 우회전
void turnRight() {
  digitalWrite(MOTOR1_IA, LOW);
  digitalWrite(MOTOR1_IB, HIGH);
  digitalWrite(MOTOR2_IA, HIGH);
  digitalWrite(MOTOR2_IB, LOW);
  Serial.println("우회전 중...");
}

// 좌회전
void turnLeft() {
  digitalWrite(MOTOR1_IA, HIGH);
  digitalWrite(MOTOR1_IB, LOW);
  digitalWrite(MOTOR2_IA, LOW);
  digitalWrite(MOTOR2_IB, HIGH);
  Serial.println("좌회전 중...");
}

// 정지
void stopMotors() {
  digitalWrite(MOTOR1_IA, LOW);
  digitalWrite(MOTOR1_IB, LOW);
  digitalWrite(MOTOR2_IA, LOW);
  digitalWrite(MOTOR2_IB, LOW);
  Serial.println("정지 중...");
}
