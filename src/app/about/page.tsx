import { Lightbulb } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            {/* Yêu cầu 2: Dùng Avatar cho trang About (chữ cái đầu tên). */}
            <Avatar size="lg">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">Giới thiệu bản thân</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Nguyễn Tiến Đạt • Sinh viên CNTT Đại học Đà Lạt
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Xin chào! Mình là{" "}
            <strong className="text-foreground">Nguyễn Tiến Đạt</strong>, sinh
            viên năm cuối ngành Công nghệ Thông tin tại Đại học Đà Lạt. Mình
            định hướng phát triển theo hướng Full-stack Developer kết hợp
            Machine Learning.
          </p>

          {/* Yêu cầu 4: Dùng component mới Alert. */}
          <Alert>
            <Lightbulb className="size-4" />
            <AlertTitle>Mục tiêu ngắn hạn</AlertTitle>
            <AlertDescription>
              Hoàn thành xuất sắc đồ án tốt nghiệp và chuẩn bị kỹ năng để bắt
              đầu công việc tại TP.HCM.
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">Node.js</Badge>
            <Badge variant="outline">Machine Learning</Badge>
            <Badge variant="outline">Docker</Badge>
          </div>

          {/* Yêu cầu 4: Dùng component mới Accordion. */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="education">
              <AccordionTrigger>Học vấn</AccordionTrigger>
              <AccordionContent>
                Đại học Đà Lạt (2022 - 2026) • Kỹ sư Công nghệ Thông tin.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="specialization">
              <AccordionTrigger>Chuyên môn nổi bật</AccordionTrigger>
              <AccordionContent>
                Full-stack: React, Angular, Node.js, Express, Firebase. AI/Data:
                Machine Learning, YOLO object detection, K-Means.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="orientation">
              <AccordionTrigger>Định hướng nghề nghiệp</AccordionTrigger>
              <AccordionContent>
                Bắt đầu sự nghiệp với vị trí Full-stack Developer hoặc Kỹ sư
                Machine Learning, đồng thời tiếp tục học sâu về kiến trúc hệ
                thống và MLOps.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
