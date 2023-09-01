﻿namespace TSDParser.Class
{
    public class PropertySignature : Node
    {
        public SyntaxKind Kind => SyntaxKind.PropertySignature;

        public Identifier Name { get; set; }

        public Node Type { get; set; }

        public QuestionToken? QuestionToken { get; set; }

        public List<Node> Modifiers { get; set; }
    }
}
