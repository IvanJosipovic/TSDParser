﻿namespace TSDParser.Class
{
    public class Parameter : Node
    {
        public SyntaxKind Kind => SyntaxKind.Parameter;

        public Identifier Name { get; set; }

        public Node Type { get; set; }

        public QuestionToken? QuestionToken { get; set; }
    }
}
