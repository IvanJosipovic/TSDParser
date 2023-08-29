using System;
using System.Collections.Generic;
using System.Text;
using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class QuestionToken : Node
    {
        public SyntaxKind Kind => SyntaxKind.QuestionToken;
    }
}
