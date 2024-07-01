#include <stdlib.h>
#include <stdio.h>
#include <errno.h>

typedef struct node
{
        int age;
        struct node *ptr_next;
}node;

node *memory_allocation()
{
        node *new_node;

        new_node = malloc(sizeof(node));
        if (new_node == NULL)
        {
                perror("memory allocation to node failed");
                exit(errno);
        }
        return (new_node);
}

void _free_memory(node *temp)
{
        free(temp);
}


int assign_value()
{
        int b;
        static int count = 0;
        
        count++;
        if (count > 2)
        {
                count = 0;
                count++;
        }
        
        printf("Enter the %d node age value: ", count);
        scanf("%d", &b);
        return (b); 
}

int main(void)
{
        node *nodeA = NULL, *nodeB = NULL, *head, *current, *temp;
        int a, b;
        
        while (1)
        {
                nodeA = memory_allocation();
                nodeB = memory_allocation();

                a = assign_value();

                nodeA->age = a;
                nodeA->ptr_next = nodeB;

                b = assign_value();

                nodeB->age = b;
                nodeB->ptr_next = NULL;

                head = nodeA;
        
                printf("\nThe age values for the linked list are: ");

                current = head;
                while (current != NULL)
                {
                        printf("%d--> ", current->age);
		        temp = current;
                        current = current->ptr_next;
                        _free_memory(temp);
                }
                printf("NULL\n\n");
        }
        return (0);
}
